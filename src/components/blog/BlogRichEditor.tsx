import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { X, Plus, Eye, Save, PenLine } from 'lucide-react';
import { Blog } from '@/hooks/useBlogs';
import DOMPurify from 'dompurify';
import RichTextEditor, { normalizeLegacyContent } from './RichTextEditor';
import FeaturedImageUploader from './FeaturedImageUploader';

interface BlogRichEditorProps {
  onSubmit: (blogData: any) => Promise<void>;
  isSubmitting: boolean;
  initialData?: Partial<Blog>;
  onCancel?: () => void;
}

const stripHtml = (html: string) =>
  html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();

const isEmptyHtml = (html: string) => stripHtml(html).length === 0;

const BlogRichEditor: React.FC<BlogRichEditorProps> = ({
  onSubmit,
  isSubmitting,
  initialData,
  onCancel
}) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    content: normalizeLegacyContent(initialData?.content || ''),
    excerpt: initialData?.excerpt || '',
    category: initialData?.category || 'wellness',
    tags: (initialData?.tags as string[]) || [],
    image_url: initialData?.image_url || initialData?.featured_image_url || '',
    meta_description: initialData?.meta_description || ''
  });

  const [currentTag, setCurrentTag] = useState('');
  const [showPreview, setShowPreview] = useState(false);

  const categories = [
    { value: 'wellness', label: 'Wellness' },
    { value: 'fitness', label: 'Fitness' },
    { value: 'yoga', label: 'Yoga' },
    { value: 'spa', label: 'Spa' },
    { value: 'nutrition', label: 'Nutrition' },
    { value: 'mindfulness', label: 'Mindfulness' }
  ];

  const plainContent = stripHtml(formData.content);
  const wordCount = plainContent ? plainContent.split(' ').length : 0;
  const readTime = Math.max(1, Math.round(wordCount / 200));
  const canSubmit = formData.title.trim().length > 0 && !isEmptyHtml(formData.content);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAddTag = () => {
    const tag = currentTag.trim().replace(/^#/, '');
    if (tag && !formData.tags.includes(tag)) {
      setFormData(prev => ({ ...prev, tags: [...prev.tags, tag] }));
    }
    setCurrentTag('');
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({ ...prev, tags: prev.tags.filter(tag => tag !== tagToRemove) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    const excerpt = formData.excerpt.trim() || `${plainContent.slice(0, 200)}${plainContent.length > 200 ? '…' : ''}`;

    await onSubmit({
      ...formData,
      excerpt,
      meta_description: formData.meta_description.trim() || excerpt.slice(0, 160),
      read_time_minutes: readTime
    });
  };

  return (
    <div className="mx-auto max-w-7xl rounded-3xl border border-border bg-card p-6 shadow-lg md:p-8">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="flex items-center gap-2 text-2xl font-bold text-foreground md:text-3xl">
            <PenLine className="h-6 w-6 text-primary" />
            {initialData?.id ? 'Edit blog post' : 'Create new blog post'}
          </h2>
          <p className="mt-1 text-muted-foreground">Share your knowledge with the wellness community</p>
        </div>
        <div className="flex gap-3">
          <Button type="button" variant="outline" onClick={() => setShowPreview(!showPreview)}>
            <Eye className="mr-2 h-4 w-4" />
            {showPreview ? 'Edit mode' : 'Preview'}
          </Button>
          {onCancel && (
            <Button type="button" variant="ghost" onClick={onCancel}>Cancel</Button>
          )}
        </div>
      </div>

      {showPreview ? (
        <Card className="border-border bg-background">
          <CardHeader className="pb-6">
            <CardTitle className="text-3xl font-bold leading-tight text-foreground md:text-4xl">
              {formData.title || 'Your blog title'}
            </CardTitle>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Badge className="bg-primary/10 text-primary hover:bg-primary/15">
                {categories.find(c => c.value === formData.category)?.label}
              </Badge>
              <span>{readTime} min read</span>
            </div>
          </CardHeader>
          <CardContent>
            {formData.image_url && (
              <img src={formData.image_url} alt={formData.title} className="mb-6 h-64 w-full rounded-xl object-cover" />
            )}
            {formData.excerpt && (
              <p className="mb-6 text-lg font-medium text-muted-foreground">{formData.excerpt}</p>
            )}
            <div
              className="prose prose-neutral dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(formData.content) }}
            />
            {formData.tags.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2 border-t border-border pt-6">
                {formData.tags.map(tag => (
                  <Badge key={tag} variant="outline">#{tag}</Badge>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="space-y-6 lg:col-span-2">
              <div>
                <Label htmlFor="title" className="text-sm font-semibold text-foreground">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="Enter an engaging blog title…"
                  required
                  className="mt-2 h-12 text-lg"
                />
              </div>

              <div>
                <Label className="text-sm font-semibold text-foreground">Content *</Label>
                <div className="mt-2">
                  <RichTextEditor
                    value={formData.content}
                    onChange={(html) => handleInputChange('content', html)}
                    placeholder="Share your expertise, insights and tips with the wellness community…"
                  />
                </div>
                <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
                  <span>Use the toolbar for headings, lists, quotes and links.</span>
                  <span>{wordCount.toLocaleString()} words · {readTime} min read</span>
                </div>
              </div>

              <div>
                <Label htmlFor="excerpt" className="text-sm font-semibold text-foreground">Excerpt</Label>
                <Textarea
                  id="excerpt"
                  value={formData.excerpt}
                  onChange={(e) => handleInputChange('excerpt', e.target.value)}
                  placeholder="Brief description that appears in blog listings…"
                  className="mt-2 min-h-[100px]"
                />
              </div>
            </div>

            <div className="space-y-6">
              <FeaturedImageUploader
                value={formData.image_url}
                onChange={(url) => handleInputChange('image_url', url)}
              />

              <div>
                <Label htmlFor="category" className="text-sm font-semibold text-foreground">Category *</Label>
                <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                  <SelectTrigger id="category" className="mt-2">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(cat => (
                      <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-semibold text-foreground">Tags</Label>
                <div className="mt-2 flex gap-2">
                  <Input
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    placeholder="Add a tag…"
                    aria-label="Add a tag"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ',') {
                        e.preventDefault();
                        handleAddTag();
                      }
                    }}
                  />
                  <Button type="button" onClick={handleAddTag} size="icon" aria-label="Add tag">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {formData.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="flex items-center gap-1 pr-1">
                      #{tag}
                      <button
                        type="button"
                        aria-label={`Remove tag ${tag}`}
                        onClick={() => handleRemoveTag(tag)}
                        className="rounded-full p-1 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="meta_description" className="text-sm font-semibold text-foreground">Meta description</Label>
                <Textarea
                  id="meta_description"
                  value={formData.meta_description}
                  onChange={(e) => handleInputChange('meta_description', e.target.value)}
                  placeholder="SEO description (recommended: 150–160 characters)"
                  className="mt-2 min-h-[80px]"
                  maxLength={160}
                />
                <p className="mt-1 text-xs text-muted-foreground">{formData.meta_description.length}/160 characters</p>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 border-t border-border pt-6">
            <Button type="submit" size="lg" disabled={isSubmitting || !canSubmit}>
              {isSubmitting ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-b-2 border-current" />
                  Publishing…
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  {initialData?.id ? 'Update blog' : 'Publish blog'}
                </>
              )}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default BlogRichEditor;
