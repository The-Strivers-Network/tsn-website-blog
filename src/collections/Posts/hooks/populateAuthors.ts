import type { CollectionAfterReadHook } from 'payload';
import type { User } from '@/payload-types';

// The `user` collection has access control locked so that users are not publicly accessible
// This means that we need to populate the authors manually here to protect user privacy
// GraphQL will not return mutated user data that differs from the underlying schema
// So we use an alternative `populatedAuthors` field to populate the user data, hidden from the admin UI
export const populateAuthors: CollectionAfterReadHook = async ({ doc, req: { payload } }) => {
  // Early return if no authors to process
  if (!doc?.authors || !Array.isArray(doc.authors) || doc.authors.length === 0) {
    return doc;
  }

  const authorDocs: User[] = [];

  // Process all authors in parallel for better performance
  const authorPromises = doc.authors.map(async (author: string | number | User | null | undefined) => {
    // Skip null/undefined authors
    if (!author) return null;

    // Extract ID whether author is an object or string/number
    const authorId = typeof author === 'object' ? author?.id : author;

    // Skip if no valid ID
    if (!authorId) return null;

    try {
      const authorDoc = await payload.findByID({
        id: authorId,
        collection: 'users',
        depth: 0,
      });

      return authorDoc || null;
    } catch (error) {
      // Log error for debugging but don't break the request
      console.warn(`[populateAuthors] Failed to fetch author with ID ${authorId}:`, error);
      return null;
    }
  });

  // Wait for all author fetches to complete
  const results = await Promise.all(authorPromises);

  // Filter out null results and add to authorDocs
  for (const result of results) {
    if (result) {
      authorDocs.push(result);
    }
  }

  // Populate the authors array only if we have valid authors
  if (authorDocs.length > 0) {
    doc.populatedAuthors = authorDocs.map((authorDoc) => ({
      id: authorDoc.id,
      name: authorDoc.name,
    }));
  } else {
    // Ensure populatedAuthors is an empty array if no valid authors found
    doc.populatedAuthors = [];
  }

  return doc;
};
