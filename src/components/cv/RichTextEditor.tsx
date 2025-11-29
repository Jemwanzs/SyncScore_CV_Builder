import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Bold, Italic, List, FileText } from 'lucide-react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
}

export const RichTextEditor = ({ value, onChange, placeholder, rows = 4 }: RichTextEditorProps) => {
  const insertFormatting = (format: string) => {
    const textarea = document.activeElement as HTMLTextAreaElement;
    if (textarea && textarea.tagName === 'TEXTAREA') {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const selectedText = value.substring(start, end);
      
      let newText = '';
      let cursorOffset = 0;
      
      switch (format) {
        case 'bold':
          newText = `**${selectedText}**`;
          cursorOffset = selectedText ? 0 : 2;
          break;
        case 'italic':
          newText = `*${selectedText}*`;
          cursorOffset = selectedText ? 0 : 1;
          break;
        case 'bullet':
          newText = `\n• `;
          cursorOffset = 0;
          break;
        case 'pagebreak':
          newText = `\n[PAGE_BREAK]\n`;
          cursorOffset = 0;
          break;
      }
      
      const newValue = value.substring(0, start) + newText + value.substring(end);
      onChange(newValue);
      
      // Set cursor position after formatting
      setTimeout(() => {
        textarea.focus();
        const newPosition = start + newText.length - cursorOffset;
        textarea.setSelectionRange(newPosition, newPosition);
      }, 0);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex gap-1">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => insertFormatting('bold')}
          className="h-8 w-8 p-0"
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => insertFormatting('italic')}
          className="h-8 w-8 p-0"
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => insertFormatting('bullet')}
          className="h-8 w-8 p-0"
        >
          <List className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => insertFormatting('pagebreak')}
          className="h-8 w-8 p-0"
        >
          <FileText className="h-4 w-4" />
        </Button>
      </div>
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="font-mono text-sm"
      />
      <p className="text-xs text-muted-foreground">
        Use **bold**, *italic*, • for bullets, [PAGE_BREAK] for page breaks
      </p>
    </div>
  );
};
