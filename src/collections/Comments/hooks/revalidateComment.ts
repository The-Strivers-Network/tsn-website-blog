import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload';

import { revalidatePath } from 'next/cache';

import type { Comment } from '../../../payload-types';

export const revalidateComment: CollectionAfterChangeHook<Comment> = async ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    // Get the post slug to revalidate the correct path
    let postSlug: string | null = null;

    if (typeof doc.post === 'number') {
      // If post is just an ID, fetch the post to get the slug
      const post = await payload.findByID({
        collection: 'posts',
        id: doc.post,
        depth: 0,
      });
      postSlug = post?.slug || null;
    } else if (doc.post && typeof doc.post === 'object') {
      postSlug = doc.post.slug || null;
    }

    if (postSlug) {
      const path = `/posts/${postSlug}`;
      payload.logger.info(`Revalidating post for comment at path: ${path}`);
      revalidatePath(path);
    }
  }
  return doc;
};

export const revalidateCommentDelete: CollectionAfterDeleteHook<Comment> = async ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    // Get the post slug to revalidate the correct path
    let postSlug: string | null = null;

    if (typeof doc?.post === 'number') {
      // If post is just an ID, fetch the post to get the slug
      const post = await payload.findByID({
        collection: 'posts',
        id: doc.post,
        depth: 0,
      });
      postSlug = post?.slug || null;
    } else if (doc?.post && typeof doc.post === 'object') {
      postSlug = doc.post.slug || null;
    }

    if (postSlug) {
      const path = `/posts/${postSlug}`;
      payload.logger.info(`Revalidating post after comment delete at path: ${path}`);
      revalidatePath(path);
    }
  }
  return doc;
};
