'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CommentEditor } from './CommentEditor';
import type { EditorState } from 'lexical';

interface ReplyFormProps {
  postId: number;
  parentId: number;
  parentAuthorName: string;
  onCancel: () => void;
  onSuccess: () => void;
}

export const ReplyForm: React.FC<ReplyFormProps> = ({
  postId,
  parentId,
  parentAuthorName,
  onCancel,
  onSuccess,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [editorState, setEditorState] = useState<EditorState | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleEditorChange = (state: EditorState) => {
    setEditorState(state);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    if (!editorState) {
      setError('Please write a reply');
      setIsSubmitting(false);
      return;
    }

    // Convert editor state to the format Payload expects
    const editorJSON = editorState.toJSON();

    // Check if content is empty (recursively check for text content in all node types)
    const hasTextContent = (node: any): boolean => {
      if (node.text && node.text.trim().length > 0) {
        return true;
      }
      if (node.children && Array.isArray(node.children)) {
        return node.children.some((child: any) => hasTextContent(child));
      }
      return false;
    };

    const hasContent = editorJSON.root.children.some((child: any) => hasTextContent(child));

    if (!hasContent) {
      setError('Please write a reply');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          author: {
            name,
            email,
          },
          content: editorJSON,
          post: postId,
          parent: parentId,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.errors?.[0]?.message || 'Failed to post reply');
      }

      onSuccess();
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to post reply. Please try again.');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded bg-muted/30">
      <div className="text-sm text-muted-foreground">
        Replying to <span className="font-semibold">{parentAuthorName}</span>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor={`reply-name-${parentId}`}>Name</Label>
          <Input
            id={`reply-name-${parentId}`}
            type="text"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor={`reply-email-${parentId}`}>Email</Label>
          <Input
            id={`reply-email-${parentId}`}
            type="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor={`reply-content-${parentId}`}>Reply</Label>
        <CommentEditor onChange={handleEditorChange} placeholder="Write your reply..." />
      </div>
      {error && (
        <div className="border border-error bg-error/30 text-foreground py-3 px-4 rounded flex items-center gap-2">
          <span>{error}</span>
        </div>
      )}
      <div className="flex gap-2">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Posting...' : 'Post Reply'}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
};
