import type { Access } from 'payload';

export const authenticatedOrApproved: Access = ({ req: { user } }) => {
  if (user) {
    return true;
  }

  return {
    isApproved: {
      equals: true,
    },
  };
};
