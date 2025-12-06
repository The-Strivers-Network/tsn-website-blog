'use client';

import React, { useCallback, useEffect } from 'react';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';

import {
  $getSelection,
  $isRangeSelection,
  FORMAT_TEXT_COMMAND,
  type EditorState,
  type LexicalEditor,
  $createParagraphNode,
  $getRoot,
} from 'lexical';
import { Bold, Italic, Underline } from 'lucide-react';
import { cn } from '@/utilities/ui';

interface CommentEditorProps {
  onChange: (editorState: EditorState) => void;
  placeholder?: string;
  className?: string;
  resetKey?: number;
}

const theme = {
  paragraph: 'mb-2 last:mb-0',
  text: {
    bold: 'font-bold',
    italic: 'italic',
    underline: 'underline',
  },
};

function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  const [isBold, setIsBold] = React.useState(false);
  const [isItalic, setIsItalic] = React.useState(false);
  const [isUnderline, setIsUnderline] = React.useState(false);

  const updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      setIsBold(selection.hasFormat('bold'));
      setIsItalic(selection.hasFormat('italic'));
      setIsUnderline(selection.hasFormat('underline'));
    }
  }, []);

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        updateToolbar();
      });
    });
  }, [editor, updateToolbar]);

  const formatBold = () => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold');
  };

  const formatItalic = () => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic');
  };

  const formatUnderline = () => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline');
  };

  return (
    <div className="flex gap-1 p-2 border-b border-border bg-muted/30">
      <button
        type="button"
        onClick={formatBold}
        className={cn(
          'p-2 rounded hover:bg-accent transition-colors',
          isBold && 'bg-accent text-accent-foreground'
        )}
        aria-label="Bold"
      >
        <Bold className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={formatItalic}
        className={cn(
          'p-2 rounded hover:bg-accent transition-colors',
          isItalic && 'bg-accent text-accent-foreground'
        )}
        aria-label="Italic"
      >
        <Italic className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={formatUnderline}
        className={cn(
          'p-2 rounded hover:bg-accent transition-colors',
          isUnderline && 'bg-accent text-accent-foreground'
        )}
        aria-label="Underline"
      >
        <Underline className="w-4 h-4" />
      </button>
    </div>
  );
}

function ClearEditorPlugin({ resetKey }: { resetKey?: number }) {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (resetKey !== undefined && resetKey > 0) {
      editor.update(() => {
        const root = $getRoot();
        root.clear();
        const paragraph = $createParagraphNode();
        root.append(paragraph);
      });
    }
  }, [resetKey, editor]);

  return null;
}

export function CommentEditor({ onChange, className, resetKey }: CommentEditorProps) {
  const initialConfig = {
    namespace: 'CommentEditor',
    theme,
    nodes: [],
    onError: (error: Error) => {
      console.error('Lexical error:', error);
    },
  };

  const handleChange = (editorState: EditorState, editor: LexicalEditor) => {
    onChange(editorState);
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div
        className={cn('border border-input rounded-lg overflow-hidden bg-background', className)}
      >
        <ToolbarPlugin />
        <div className="relative min-h-[120px]">
          <RichTextPlugin
            contentEditable={
              <ContentEditable className="min-h-[120px] p-3 outline-none text-sm resize-none" />
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin />

          <OnChangePlugin onChange={handleChange} />
          <ClearEditorPlugin resetKey={resetKey} />
        </div>
      </div>
    </LexicalComposer>
  );
}
