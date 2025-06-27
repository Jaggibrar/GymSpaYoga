
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { X, Plus, Eye, Save } from 'lucide-react';
import { Blog } from '@/hooks/useBlogs';

interface BlogRichEditorProps {
  onSubmit: (blogData: any) => Promise<void>;
  isSubmitting: boolean;
  initialData?: Partial<Blog>;
  onCancel?: () => void;
}

const BlogRichEditor: React.FC<BlogRichEditorProps> = ({ 
  onSubmit, 
  isSubmitting, 
  initialData,
  onCancel 
}) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    content: initialData?.content || '',
    excerpt: initialData?.excerpt || '',
    category: initialData?.category || 'wellness',
    tags: initialData?.tags || [],
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

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAddTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()]
      }));
      setCurrentTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.content.trim()) {
      return;
    }

    const blogData = {
      ...formData,
      excerpt: formData.excerpt || formData.content.substring(0, 200) + '...',
      meta_description: formData.meta_description || formData.excerpt || formData.content.substring(0, 160)
    };

    await onSubmit(blogData);
  };

  const formatContentForPreview = (content: string) => {
    return content
      .replace(/\n\n/g, '</p><p>')
      .replace(/\n/g, '<br/>')
      .replace(/^/, '<p>')
      .replace(/$/, '</p>');
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">
          {initialData?.id ? 'Edit Blog Post' : 'Create New Blog Post'}
        </h2>
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => setShowPreview(!showPreview)}
          >
            <Eye className="h-4 w-4 mr-2" />
            {showPreview ? 'Edit' : 'Preview'}
          </Button>
          {onCancel && (
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          )}
        </div>
      </div>

      {showPreview ? (
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">{formData.title}</CardTitle>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <Badge className="bg-blue-100 text-blue-700">
                {categories.find(c => c.value === formData.category)?.label}
              </Badge>
              <span>5 min read</span>
            </div>
          </CardHeader>
          <CardContent>
            {formData.image_url && (
              <img
                src={formData.image_url}
                alt={formData.title}
                className="w-full h-64 object-cover rounded-lg mb-6"
              />
            )}
            {formData.excerpt && (
              <p className="text-lg text-gray-600 mb-6 font-medium">
                {formData.excerpt}
              </p>
            )}
            <div 
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ 
                __html: formatContentForPreview(formData.content) 
              }}
            />
            {formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t">
                {formData.tags.map(tag => (
                  <Badge key={tag} variant="outline">#{tag}</Badge>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {/* Title */}
              <div>
                <Label htmlFor="title" className="text-base font-medium">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="Enter an engaging blog title..."
                  required
                  className="mt-1 text-lg"
                />
              </div>

              {/* Content */}
              <div>
                <Label htmlFor="content" className="text-base font-medium">Content *</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => handleInputChange('content', e.target.value)}
                  placeholder="Write your blog content here... Use double line breaks for paragraphs."
                  required
                  className="mt-1 min-h-[400px] font-mono text-sm"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Tip: Use double line breaks for new paragraphs. Single line breaks become line breaks.
                </p>
              </div>

              {/* Excerpt */}
              <div>
                <Label htmlFor="excerpt" className="text-base font-medium">Excerpt</Label>
                <Textarea
                  id="excerpt"
                  value={formData.excerpt}
                  onChange={(e) => handleInputChange('excerpt', e.target.value)}
                  placeholder="Brief description that appears in blog listings..."
                  className="mt-1 min-h-[100px]"
                />
              </div>
            </div>

            <div className="space-y-6">
              {/* Featured Image */}
              <div>
                <Label htmlFor="image_url" className="text-base font-medium">Featured Image URL</Label>
                <Input
                  id="image_url"
                  value={formData.image_url}
                  onChange={(e) => handleInputChange('image_url', e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  className="mt-1"
                />
                {formData.image_url && (
                  <div className="mt-2">
                    <img
                      src={formData.image_url}
                      alt="Preview"
                      className="w-full h-32 object-cover rounded"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Category */}
              <div>
                <Label htmlFor="category" className="text-base font-medium">Category *</Label>
                <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(cat => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Tags */}
              <div>
                <Label className="text-base font-medium">Tags</Label>
                <div className="flex gap-2 mt-1">
                  <Input
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    placeholder="Add a tag..."
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddTag();
                      }
                    }}
                  />
                  <Button type="button" onClick={handleAddTag} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="ml-1 hover:bg-red-100 rounded-full p-1"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Meta Description */}
              <div>
                <Label htmlFor="meta_description" className="text-base font-medium">Meta Description</Label>
                <Textarea
                  id="meta_description"
                  value={formData.meta_description}
                  onChange={(e) => handleInputChange('meta_description', e.target.value)}
                  placeholder="SEO description (recommended: 150-160 characters)"
                  className="mt-1 min-h-[80px]"
                  maxLength={160}
                />
                <p className="text-xs text-gray-500 mt-1">
                  {formData.meta_description.length}/160 characters
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t">
            <Button
              type="submit"
              disabled={isSubmitting || !formData.title.trim() || !formData.content.trim()}
              className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Publishing...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  {initialData?.id ? 'Update Blog' : 'Publish Blog'}
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
