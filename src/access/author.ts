import type { Access } from 'payload';
import { checkRole } from '../collections/Users/hooks/checkRole';

/**
 * Access control for creating posts - any admin or author can create
 */
export const authorCreate: Access = ({ req: { user } }) => {
  if (user) {
    if (checkRole(['admin', 'author'], user)) {
      return true;
    }
  }
  return false;
};

/**
 * Access control for updating/deleting posts
 * - Admins can update any post
 * - Authors can only update posts where they are listed in the authors field
 */
export const authorUpdate: Access = ({ req: { user } }) => {
  if (!user) return false;

  // Admins can edit any post
  if (checkRole(['admin'], user)) {
    return true;
  }

  // Authors can only edit their own posts
  if (checkRole(['author'], user)) {
    return {
      authors: {
        contains: user.id,
      },
    };
  }

  return false;
};

// Default export for backwards compatibility (used for create access)
const author: Access = authorCreate;

export default author;
