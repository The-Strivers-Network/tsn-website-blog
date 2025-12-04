import type { Access } from 'payload';
import { checkRole } from '../collections/Users/hooks/checkRole';

const editor: Access = ({ req: { user } }) => {
  if (user) {
    if (checkRole(['admin', 'author'], user)) {
      return true;
    }
  }
  return false;
};

export default editor;
