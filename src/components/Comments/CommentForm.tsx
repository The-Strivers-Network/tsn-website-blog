'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CommentEditor } from './CommentEditor';
import type { EditorState } from 'lexical';

export const CommentForm = ({ postId }: { postId: string }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [editorState, setEditorState] = useState<EditorState | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [resetKey, setResetKey] = useState(0);

  const handleEditorChange = (state: EditorState) => {
    setEditorState(state);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setSuccess(false);

    if (!editorState) {
      setError('Please write a comment');
      setIsSubmitting(false);
      return;
    }

    // Convert editor state to the format Payload expects
    const editorJSON = editorState.toJSON();

    // Check if content is empty
    const hasContent = editorJSON.root.children.some((child: any) => {
      if (child.type === 'paragraph' && child.children) {
        return child.children.some(
          (textNode: any) => textNode.text && textNode.text.trim().length > 0
        );
      }
      return false;
    });

    if (!hasContent) {
      setError('Please write a comment');
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
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.errors?.[0]?.message || 'Failed to post comment');
      }

      setName('');
      setEmail('');
      setEditorState(null);
      setResetKey((prev) => prev + 1);
      setSuccess(true);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : 'Failed to post comment. Please try again.'
      );
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-xl font-bold">Leave a Comment</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            type="text"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="content">Comment</Label>
        <CommentEditor onChange={handleEditorChange} resetKey={resetKey} />
      </div>
      {error && (
        <div className="border border-error bg-error/30 text-foreground py-3 px-4 rounded flex items-center gap-2">
          <span>{error}</span>
        </div>
      )}
      {success && (
        <div className="border border-success bg-success/30 text-foreground py-3 px-4 rounded flex items-center gap-2">
          <span>Comment posted successfully!</span>
        </div>
      )}
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Posting...' : 'Post Comment'}
      </Button>
    </form>
  );
};
