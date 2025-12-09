'use client';

import React, { useState } from 'react';
import type { Comment } from '@/payload-types';
import RichText from '@/components/RichText';
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical';
import { Button } from '@/components/ui/button';

import { MessageSquare, ChevronDown, ChevronUp } from 'lucide-react';
import { ReplyForm } from './ReplyForm';

interface CommentItemProps {
  comment: Comment;
  replies: Comment[];
  postId: number;
  isReply?: boolean;
}

export const CommentItem: React.FC<CommentItemProps> = ({
  comment,
  replies,
  postId,
  isReply = false,
}) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [showReplies, setShowReplies] = useState(true);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className={`${isReply ? 'ml-8 border-l-2 border-border pl-4' : ''}`}>
      <div className="p-4 border rounded bg-card">
        {comment.content && (
          <RichText
            data={comment.content as DefaultTypedEditorState}
            enableGutter={false}
            enableProse={true}
            className="prose-sm"
          />
        )}
        <div className="flex items-center justify-between mt-4">
          <div>
            <div className="font-bold">{comment.author?.name}</div>
            <div className="text-sm text-muted-foreground">{formatDate(comment.createdAt)}</div>
          </div>
          {!isReply && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowReplyForm(!showReplyForm)}
              className="flex items-center gap-1"
            >
              <MessageSquare className="h-4 w-4" />
              Reply
            </Button>
          )}
        </div>
      </div>

      {/* Reply Form */}
      {showReplyForm && !isReply && (
        <div className="mt-4 ml-8">
          <ReplyForm
            postId={postId}
            parentId={comment.id}
            parentAuthorName={comment.author?.name || 'Anonymous'}
            onCancel={() => setShowReplyForm(false)}
            onSuccess={() => {
              setShowReplyForm(false);
              // Trigger a page refresh to show the new reply
              window.location.reload();
            }}
          />
        </div>
      )}

      {/* Replies */}
      {replies.length > 0 && (
        <div className="mt-4">
          <button
            onClick={() => setShowReplies(!showReplies)}
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-2"
          >
            {showReplies ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            {replies.length} {replies.length === 1 ? 'reply' : 'replies'}
          </button>
          {showReplies && (
            <div className="space-y-4">
              {replies.map((reply) => (
                <CommentItem
                  key={reply.id}
                  comment={reply}
                  replies={[]}
                  postId={postId}
                  isReply={true}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
