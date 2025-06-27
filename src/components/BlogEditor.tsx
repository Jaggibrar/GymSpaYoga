
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { X, Plus } from 'lucide-react';

interface BlogEditorProps {
  onSubmit: (blogData: any) => void;
  isSubmitting: boolean;
  initialData?: any;
}

const BlogEditor: React.FC<BlogEditorProps> = ({ onSubmit, isSubmitting, initialData }) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    content: initialData?.content || '',
    excerpt: initialData?.excerpt || '',
    category: initialData?.category || 'wellness',
    tags: initialData?.tags || [],
    image_url: initialData?.image_url || ''
  });
  
  const [currentTag, setCurrentTag] = useState('');

  const categories = [
    { value: 'wellness', label: 'Wellness' },
    { value: 'fitness', label: 'Fitness' },
    { value: 'yoga', label: 'Yoga' },
    { value: 'spa', label: 'Spa' },
    { value: 'nutrition', label: 'Nutrition' },
    { value: 'mindfulness', label: 'Mindfulness' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <Label htmlFor="title" className="text-base font-medium">Title *</Label>
          <Input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Enter blog title..."
            required
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="category" className="text-base font-medium">Category *</Label>
          <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
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

        <div>
          <Label htmlFor="image_url" className="text-base font-medium">Featured Image URL</Label>
          <Input
            id="image_url"
            name="image_url"
            value={formData.image_url}
            onChange={handleInputChange}
            placeholder="https://example.com/image.jpg"
            className="mt-1"
          />
        </div>

        <div className="md:col-span-2">
          <Label htmlFor="excerpt" className="text-base font-medium">Excerpt</Label>
          <Textarea
            id="excerpt"
            name="excerpt"
            value={formData.excerpt}
            onChange={handleInputChange}
            placeholder="Brief description of the blog post..."
            className="mt-1 min-h-[80px]"
          />
        </div>

        <div className="md:col-span-2">
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

        <div className="md:col-span-2">
          <Label htmlFor="content" className="text-base font-medium">Content *</Label>
          <Textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            placeholder="Write your blog content here..."
            required
            className="mt-1 min-h-[300px]"
          />
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600"
        >
          {isSubmitting ? 'Publishing...' : 'Publish Blog'}
        </Button>
      </div>
    </form>
  );
};

export default BlogEditor;
