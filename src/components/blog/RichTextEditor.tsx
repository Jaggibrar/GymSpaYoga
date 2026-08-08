import React, { useCallback } from 'react';
import { useEditor, EditorContent, type Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Underline from '@tiptap/extension-underline';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import { Button } from '@/components/ui/button';
import {
  Bold, Italic, Underline as UnderlineIcon, Heading1, Heading2, Heading3,
  List, ListOrdered, Quote, Link2, Undo2, Redo2, Minus,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

const ToolbarButton = ({
  active, onClick, label, children,
}: { active?: boolean; onClick: () => void; label: string; children: React.ReactNode }) => (
  <Button
    type="button"
    variant="ghost"
    size="sm"
    aria-label={label}
    title={label}
    onMouseDown={(e) => e.preventDefault()}
    onClick={onClick}
    className={cn(
      'h-9 w-9 p-0 rounded-lg text-foreground/70 hover:text-foreground hover:bg-muted',
      active && 'bg-primary/10 text-primary hover:bg-primary/15'
    )}
  >
    {children}
  </Button>
);

const Toolbar = ({ editor }: { editor: Editor }) => {
  const setLink = useCallback(() => {
    const previous = editor.getAttributes('link').href as string | undefined;
    const url = window.prompt('Link URL', previous ?? 'https://');
    if (url === null) return;
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }, [editor]);

  return (
    <div className="flex flex-wrap items-center gap-1 border-b border-border bg-muted/40 px-2 py-1.5 rounded-t-xl">
      <ToolbarButton label="Bold" active={editor.isActive('bold')} onClick={() => editor.chain().focus().toggleBold().run()}><Bold className="h-4 w-4" /></ToolbarButton>
      <ToolbarButton label="Italic" active={editor.isActive('italic')} onClick={() => editor.chain().focus().toggleItalic().run()}><Italic className="h-4 w-4" /></ToolbarButton>
      <ToolbarButton label="Underline" active={editor.isActive('underline')} onClick={() => editor.chain().focus().toggleUnderline().run()}><UnderlineIcon className="h-4 w-4" /></ToolbarButton>
      <span className="mx-1 h-5 w-px bg-border" />
      <ToolbarButton label="Heading 1" active={editor.isActive('heading', { level: 1 })} onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}><Heading1 className="h-4 w-4" /></ToolbarButton>
      <ToolbarButton label="Heading 2" active={editor.isActive('heading', { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}><Heading2 className="h-4 w-4" /></ToolbarButton>
      <ToolbarButton label="Heading 3" active={editor.isActive('heading', { level: 3 })} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}><Heading3 className="h-4 w-4" /></ToolbarButton>
      <span className="mx-1 h-5 w-px bg-border" />
      <ToolbarButton label="Bullet list" active={editor.isActive('bulletList')} onClick={() => editor.chain().focus().toggleBulletList().run()}><List className="h-4 w-4" /></ToolbarButton>
      <ToolbarButton label="Numbered list" active={editor.isActive('orderedList')} onClick={() => editor.chain().focus().toggleOrderedList().run()}><ListOrdered className="h-4 w-4" /></ToolbarButton>
      <ToolbarButton label="Quote" active={editor.isActive('blockquote')} onClick={() => editor.chain().focus().toggleBlockquote().run()}><Quote className="h-4 w-4" /></ToolbarButton>
      <ToolbarButton label="Divider" onClick={() => editor.chain().focus().setHorizontalRule().run()}><Minus className="h-4 w-4" /></ToolbarButton>
      <span className="mx-1 h-5 w-px bg-border" />
      <ToolbarButton label="Link" active={editor.isActive('link')} onClick={setLink}><Link2 className="h-4 w-4" /></ToolbarButton>
      <span className="mx-1 h-5 w-px bg-border" />
      <ToolbarButton label="Undo" onClick={() => editor.chain().focus().undo().run()}><Undo2 className="h-4 w-4" /></ToolbarButton>
      <ToolbarButton label="Redo" onClick={() => editor.chain().focus().redo().run()}><Redo2 className="h-4 w-4" /></ToolbarButton>
    </div>
  );
};

/** Legacy posts were stored as plain text with double line breaks. Convert on load. */
export const normalizeLegacyContent = (content: string): string => {
  if (!content) return '';
  const looksLikeHtml = /<\/?(p|h[1-6]|ul|ol|li|blockquote|br|img|strong|em|a)\b/i.test(content);
  if (looksLikeHtml) return content;
  return content
    .split(/\n{2,}/)
    .map((block) => `<p>${block.replace(/\n/g, '<br/>').trim()}</p>`)
    .join('');
};

const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, onChange, placeholder }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ link: false, underline: false }),
      Underline,
      Link.configure({ openOnClick: false, autolink: true, HTMLAttributes: { rel: 'noopener noreferrer', target: '_blank' } }),
      Image.configure({ HTMLAttributes: { class: 'rounded-xl my-4' } }),
      Placeholder.configure({ placeholder: placeholder || 'Write your article…' }),
    ],
    content: normalizeLegacyContent(value),
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: {
        class:
          'prose prose-neutral dark:prose-invert max-w-none min-h-[420px] px-5 py-4 focus:outline-none',
      },
    },
  });

  if (!editor) return null;

  return (
    <div className="rounded-xl border border-border bg-background shadow-sm focus-within:border-primary/60 transition-colors">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default RichTextEditor;
