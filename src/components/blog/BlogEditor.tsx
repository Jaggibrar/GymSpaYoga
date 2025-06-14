
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { X, Upload, Eye } from 'lucide-react';
import { Blog } from '@/hooks/useBlogs';

interface BlogEditorProps {
  onSubmit: (blogData: Partial<Blog>) => Promise<void>;
  isSubmitting?: boolean;
  initialData?: Partial<Blog>;
}

const BlogEditor = ({ onSubmit, isSubmitting = false, initialData }: BlogEditorProps) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [excerpt, setExcerpt] = useState(initialData?.excerpt || '');
  const [content, setContent] = useState(initialData?.content || '');
  const [category, setCategory] = useState(initialData?.category || 'wellness');
  const [imageUrl, setImageUrl] = useState(initialData?.image_url || '');
  const [tags, setTags] = useState<string[]>(initialData?.tags || []);
  const [newTag, setNewTag] = useState('');
  const [isPreview, setIsPreview] = useState(false);

  const categories = [
    { value: 'wellness', label: 'Wellness', color: 'bg-blue-100 text-blue-700' },
    { value: 'fitness', label: 'Fitness', color: 'bg-orange-100 text-orange-700' },
    { value: 'yoga', label: 'Yoga', color: 'bg-purple-100 text-purple-700' },
    { value: 'spa', label: 'Spa', color: 'bg-pink-100 text-pink-700' },
    { value: 'nutrition', label: 'Nutrition', color: 'bg-green-100 text-green-700' },
    { value: 'mindfulness', label: 'Mindfulness', color: 'bg-indigo-100 text-indigo-700' },
    { value: 'lifestyle', label: 'Lifestyle', color: 'bg-teal-100 text-teal-700' }
  ];

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim()) && tags.length < 10) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim()) {
      return;
    }

    const blogData: Partial<Blog> = {
      title: title.trim(),
      excerpt: excerpt.trim() || undefined,
      content: content.trim(),
      category,
      image_url: imageUrl.trim() || undefined,
      tags
    };

    await onSubmit(blogData);
  };

  const selectedCategory = categories.find(cat => cat.value === category);

  return (
    <div className="space-y-6">
      {/* Header with Preview Toggle */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-800">
          {isPreview ? 'Preview' : 'Create Blog Post'}
        </h2>
        <Button
          type="button"
          variant="outline"
          onClick={() => setIsPreview(!isPreview)}
          className="flex items-center gap-2"
        >
          <Eye className="h-4 w-4" />
          {isPreview ? 'Edit' : 'Preview'}
        </Button>
      </div>

      {isPreview ? (
        /* Preview Mode */
        <div className="space-y-6 p-6 bg-gray-50 rounded-lg">
          {imageUrl && (
            <img src={imageUrl} alt={title} className="w-full h-48 object-cover rounded-lg" />
          )}
          <div className="space-y-4">
            {selectedCategory && (
              <Badge className={`${selectedCategory.color} border font-semibold`}>
                {selectedCategory.label}
              </Badge>
            )}
            <h1 className="text-2xl font-bold text-gray-800">{title || 'Blog Title'}</h1>
            {excerpt && (
              <p className="text-gray-600 font-medium">{excerpt}</p>
            )}
            <div className="prose max-w-none">
              <div className="text-gray-700 whitespace-pre-wrap">
                {content || 'Blog content will appear here...'}
              </div>
            </div>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tags.map(tag => (
                  <Badge key={tag} variant="outline">#{tag}</Badge>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Edit Mode */
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-sm font-semibold text-gray-700">
                Title *
              </Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter an engaging blog title"
                required
                className="border-gray-300 focus:border-emerald-400 focus:ring-emerald-400"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category" className="text-sm font-semibold text-gray-700">
                Category
              </Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="border-gray-300 focus:border-emerald-400 focus:ring-emerald-400">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${cat.color.split(' ')[0]}`}></div>
                        {cat.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="excerpt" className="text-sm font-semibold text-gray-700">
              Excerpt
            </Label>
            <Textarea
              id="excerpt"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Write a compelling excerpt that summarizes your blog post"
              rows={3}
              className="border-gray-300 focus:border-emerald-400 focus:ring-emerald-400"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="imageUrl" className="text-sm font-semibold text-gray-700">
              Featured Image URL
            </Label>
            <div className="flex gap-2">
              <Input
                id="imageUrl"
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://example.com/your-image.jpg"
                className="border-gray-300 focus:border-emerald-400 focus:ring-emerald-400"
              />
              <Button type="button" variant="outline" size="sm">
                <Upload className="h-4 w-4" />
              </Button>
            </div>
            {imageUrl && (
              <div className="mt-2">
                <img src={imageUrl} alt="Preview" className="w-32 h-20 object-cover rounded border" />
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags" className="text-sm font-semibold text-gray-700">
              Tags ({tags.length}/10)
            </Label>
            <div className="flex gap-2">
              <Input
                id="tags"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Add a tag"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                className="border-gray-300 focus:border-emerald-400 focus:ring-emerald-400"
              />
              <Button 
                type="button" 
                onClick={handleAddTag} 
                variant="outline"
                disabled={tags.length >= 10}
              >
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                  #{tag}
                  <X
                    className="h-3 w-3 cursor-pointer hover:text-red-500"
                    onClick={() => handleRemoveTag(tag)}
                  />
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="content" className="text-sm font-semibold text-gray-700">
              Content *
            </Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your blog content here. Use line breaks to separate paragraphs..."
              rows={20}
              required
              className="border-gray-300 focus:border-emerald-400 focus:ring-emerald-400 font-mono text-sm"
            />
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button 
              type="button"
              variant="outline"
              onClick={() => setIsPreview(true)}
              className="flex items-center gap-2"
            >
              <Eye className="h-4 w-4" />
              Preview
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting || !title.trim() || !content.trim()}
              className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white min-w-[120px]"
            >
              {isSubmitting ? 'Publishing...' : 'Publish Blog'}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default BlogEditor;
