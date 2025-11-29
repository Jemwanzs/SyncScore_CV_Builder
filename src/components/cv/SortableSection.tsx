import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { GripVertical, ChevronUp, ChevronDown } from 'lucide-react';
import { ReactNode } from 'react';

interface SortableSectionProps {
  id: string;
  title: string;
  onTitleChange: (value: string) => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  canMoveUp: boolean;
  canMoveDown: boolean;
  children: ReactNode;
}

export const SortableSection = ({
  id,
  title,
  onTitleChange,
  onMoveUp,
  onMoveDown,
  canMoveUp,
  canMoveDown,
  children
}: SortableSectionProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <Card 
      ref={setNodeRef} 
      style={style} 
      className="p-6 relative"
    >
      <div className="flex items-center gap-2 mb-4">
        <button
          className="cursor-grab active:cursor-grabbing touch-none p-1 hover:bg-muted rounded"
          {...attributes}
          {...listeners}
        >
          <GripVertical className="h-5 w-5 text-muted-foreground" />
        </button>
        
        <Input
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          className="text-lg font-semibold flex-1 max-w-md"
          placeholder="Section Title"
        />

        <div className="flex gap-1 ml-auto">
          <Button
            variant="ghost"
            size="icon"
            onClick={onMoveUp}
            disabled={!canMoveUp}
            title="Move Up"
          >
            <ChevronUp className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onMoveDown}
            disabled={!canMoveDown}
            title="Move Down"
          >
            <ChevronDown className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {children}
    </Card>
  );
};