import React from 'react';
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import type { Comment } from '@/payload-types';
import { CommentForm } from './CommentForm';

export const Comments = async ({ postId }: { postId: string }) => {
  const payload = await getPayload({ config: configPromise });
  const { docs: comments } = await payload.find({
    collection: 'comments',
    where: {
      post: { equals: postId },
      isApproved: { equals: true },
    },
  });

  return (
    <div className="py-8 mx-auto items-center max-w-3xl">
      <h1 className="text-2xl font-bold mb-4">Comments</h1>
      <div className="space-y-4 mb-24">
        {(comments as Comment[]).map((comment) => (
          <div key={comment.id} className="p-4 border rounded">
            <p>{comment.content}</p>
            <div className="font-bold mt-4">{comment.author?.name}</div>
            <div className="text-sm text-gray-500">{comment.createdAt}</div>
          </div>
        ))}
      </div>
      <CommentForm postId={postId} />
    </div>
  );
};
