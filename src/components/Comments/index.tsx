import React from 'react';
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import type { Comment } from '@/payload-types';
import { CommentForm } from './CommentForm';
import { CommentItem } from './CommentItem';

export const Comments = async ({ postId }: { postId: number }) => {
  const payload = await getPayload({ config: configPromise });
  const { docs: allComments } = await payload.find({
    collection: 'comments',
    where: {
      post: { equals: postId },
      isApproved: { equals: true },
    },
    depth: 1, // Populate parent relationship
    sort: 'createdAt',
  });

  // Separate top-level comments and replies
  const topLevelComments = (allComments as Comment[]).filter((comment) => !comment.parent);
  const replies = (allComments as Comment[]).filter((comment) => comment.parent);

  // Group replies by parent comment id
  const repliesByParent = replies.reduce(
    (acc, reply) => {
      const parentId = typeof reply.parent === 'number' ? reply.parent : reply.parent?.id;
      if (parentId) {
        if (!acc[parentId]) {
          acc[parentId] = [];
        }
        acc[parentId].push(reply);
      }
      return acc;
    },
    {} as Record<number, Comment[]>
  );

  return (
    <div className="py-8 mx-auto items-center max-w-3xl">
      <h1 className="text-2xl font-bold mb-4">Comments</h1>
      <div className="space-y-4 mb-24">
        {topLevelComments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            replies={repliesByParent[comment.id] || []}
            postId={postId}
          />
        ))}
      </div>
      <CommentForm postId={postId} />
    </div>
  );
};
