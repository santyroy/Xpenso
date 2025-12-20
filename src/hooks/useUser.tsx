import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be within a UserProvider');
  }
  return context;
};
