'use client';

import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import React, { useCallback, useEffect } from 'react';

import { cn } from '@/utilities/ui';
import {
  $isListNode,
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  ListItemNode,
  ListNode,
  REMOVE_LIST_COMMAND,
} from '@lexical/list';
import { $createHeadingNode, $createQuoteNode, HeadingNode, QuoteNode } from '@lexical/rich-text';
import { $setBlocksType } from '@lexical/selection';
import { $getNearestNodeOfType } from '@lexical/utils';
import {
  $createParagraphNode,
  $getRoot,
  $getSelection,
  $isRangeSelection,
  FORMAT_TEXT_COMMAND,
  INDENT_CONTENT_COMMAND,
  OUTDENT_CONTENT_COMMAND,
  type EditorState,
  type LexicalEditor,
} from 'lexical';
import {
  Bold,
  Heading3,
  Heading4,
  Indent,
  Italic,
  List,
  ListOrdered,
  Outdent,
  Pilcrow,
  Quote,
  Strikethrough,
  Underline,
} from 'lucide-react';

interface CommentEditorProps {
  onChange: (editorState: EditorState) => void;
  placeholder?: string;
  className?: string;
  resetKey?: number;
}

const theme = {
  paragraph: 'mb-2 last:mb-0',
  heading: {
    h3: 'text-xl font-bold mb-2',
    h4: 'text-lg font-semibold mb-2',
  },
  text: {
    bold: 'font-bold',
    italic: 'italic',
    underline: 'underline',
    strikethrough: 'line-through',
  },
  list: {
    ul: 'list-disc ml-4 mb-2',
    ol: 'list-decimal ml-4 mb-2',
    listitem: 'mb-1',
    nested: {
      listitem: 'list-none',
    },
  },
  quote: 'border-l-4 border-border pl-4 italic my-2',
};

function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  const [isBold, setIsBold] = React.useState(false);
  const [isItalic, setIsItalic] = React.useState(false);
  const [isUnderline, setIsUnderline] = React.useState(false);
  const [isStrikethrough, setIsStrikethrough] = React.useState(false);
  const [blockType, setBlockType] = React.useState<string>('paragraph');

  const updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      setIsBold(selection.hasFormat('bold'));
      setIsItalic(selection.hasFormat('italic'));
      setIsUnderline(selection.hasFormat('underline'));
      setIsStrikethrough(selection.hasFormat('strikethrough'));

      const anchorNode = selection.anchor.getNode();
      const element =
        anchorNode.getKey() === 'root' ? anchorNode : anchorNode.getTopLevelElementOrThrow();
      const elementKey = element.getKey();
      const elementDOM = editor.getElementByKey(elementKey);

      if (elementDOM !== null) {
        const type = element.getType();
        if ($isListNode(element)) {
          const parentList = $getNearestNodeOfType(anchorNode, ListNode);
          const listType = parentList ? parentList.getListType() : element.getListType();
          setBlockType(listType === 'bullet' ? 'ul' : 'ol');
        } else if (type === 'heading') {
          const headingTag = (element as any).getTag();
          setBlockType(headingTag);
        } else if (type === 'quote') {
          setBlockType('quote');
        } else {
          setBlockType('paragraph');
        }
      }
    }
  }, [editor]);

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

  const formatStrikethrough = () => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough');
  };

  const formatHeading = (headingSize: 'h3' | 'h4') => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        if (blockType === headingSize) {
          $setBlocksType(selection, () => $createParagraphNode());
        } else {
          $setBlocksType(selection, () => $createHeadingNode(headingSize));
        }
      }
    });
  };

  const formatParagraph = () => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createParagraphNode());
      }
    });
  };

  const formatBulletList = () => {
    if (blockType === 'ul') {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
    } else {
      editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
    }
  };

  const formatNumberedList = () => {
    if (blockType === 'ol') {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
    } else {
      editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
    }
  };

  const formatQuote = () => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        if (blockType === 'quote') {
          $setBlocksType(selection, () => $createParagraphNode());
        } else {
          $setBlocksType(selection, () => $createQuoteNode());
        }
      }
    });
  };

  const formatIndent = () => {
    editor.dispatchCommand(INDENT_CONTENT_COMMAND, undefined);
  };

  const formatOutdent = () => {
    editor.dispatchCommand(OUTDENT_CONTENT_COMMAND, undefined);
  };

  return (
    <div className="flex flex-wrap gap-1 p-2 border-b border-border bg-muted/30">
      {/* Block type buttons */}
      <button
        type="button"
        onClick={formatParagraph}
        className={cn(
          'p-2 rounded hover:bg-accent transition-colors',
          blockType === 'paragraph' && 'bg-accent text-accent-foreground'
        )}
        aria-label="Paragraph"
        title="Paragraph"
      >
        <Pilcrow className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={() => formatHeading('h3')}
        className={cn(
          'p-2 rounded hover:bg-accent transition-colors',
          blockType === 'h3' && 'bg-accent text-accent-foreground'
        )}
        aria-label="Heading 3"
        title="Heading 3"
      >
        <Heading3 className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={() => formatHeading('h4')}
        className={cn(
          'p-2 rounded hover:bg-accent transition-colors',
          blockType === 'h4' && 'bg-accent text-accent-foreground'
        )}
        aria-label="Heading 4"
        title="Heading 4"
      >
        <Heading4 className="w-4 h-4" />
      </button>

      <div className="w-px h-6 bg-border mx-1 self-center" />

      {/* Text format buttons */}
      <button
        type="button"
        onClick={formatBold}
        className={cn(
          'p-2 rounded hover:bg-accent transition-colors',
          isBold && 'bg-accent text-accent-foreground'
        )}
        aria-label="Bold"
        title="Bold"
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
        title="Italic"
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
        title="Underline"
      >
        <Underline className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={formatStrikethrough}
        className={cn(
          'p-2 rounded hover:bg-accent transition-colors',
          isStrikethrough && 'bg-accent text-accent-foreground'
        )}
        aria-label="Strikethrough"
        title="Strikethrough"
      >
        <Strikethrough className="w-4 h-4" />
      </button>

      <div className="w-px h-6 bg-border mx-1 self-center" />

      {/* List buttons */}
      <button
        type="button"
        onClick={formatBulletList}
        className={cn(
          'p-2 rounded hover:bg-accent transition-colors',
          blockType === 'ul' && 'bg-accent text-accent-foreground'
        )}
        aria-label="Bullet List"
        title="Bullet List"
      >
        <List className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={formatNumberedList}
        className={cn(
          'p-2 rounded hover:bg-accent transition-colors',
          blockType === 'ol' && 'bg-accent text-accent-foreground'
        )}
        aria-label="Numbered List"
        title="Numbered List"
      >
        <ListOrdered className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={formatQuote}
        className={cn(
          'p-2 rounded hover:bg-accent transition-colors',
          blockType === 'quote' && 'bg-accent text-accent-foreground'
        )}
        aria-label="Quote"
        title="Quote"
      >
        <Quote className="w-4 h-4" />
      </button>

      <div className="w-px h-6 bg-border mx-1 self-center" />

      {/* Indent buttons */}
      <button
        type="button"
        onClick={formatOutdent}
        className="p-2 rounded hover:bg-accent transition-colors"
        aria-label="Outdent"
        title="Decrease Indent"
      >
        <Outdent className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={formatIndent}
        className="p-2 rounded hover:bg-accent transition-colors"
        aria-label="Indent"
        title="Increase Indent"
      >
        <Indent className="w-4 h-4" />
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
    nodes: [HeadingNode, QuoteNode, ListNode, ListItemNode],
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
          <ListPlugin />
          <OnChangePlugin onChange={handleChange} />
          <ClearEditorPlugin resetKey={resetKey} />
        </div>
      </div>
    </LexicalComposer>
  );
}
