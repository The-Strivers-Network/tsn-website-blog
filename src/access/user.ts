import type { Access } from 'payload';
import { checkRole } from '../collections/Users/hooks/checkRole';

const user: Access = ({ req: { user } }) => {
  if (user) {
    if (checkRole(['admin', 'author'], user)) {
      return true;
    }
    return { id: { equals: user.id } };
  }
  return false;
};

export default user;
