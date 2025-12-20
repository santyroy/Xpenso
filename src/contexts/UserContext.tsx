import { createContext, ReactNode, useEffect, useState } from 'react';
import { storage } from '../mmkv/storage';
import { STORAGE_KEYS } from '../mmkv/keys';

type UserContextType = {
  name: string;
  updateName: (name: string) => void;
  hasOnboarded: boolean;
  completeOnboarding: (name: string) => void;
  isLoading: boolean;
};

export const UserContext = createContext<UserContextType | undefined>(
  undefined,
);

export function UserProvider({ children }: { children: ReactNode }) {
  const [name, setName] = useState('');
  const [hasOnboarded, setHasOnboarded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedName = storage.getString(STORAGE_KEYS.USER_NAME);
    const storedOnboarded = storage.getBoolean(STORAGE_KEYS.HAS_ONBOARDED);

    if (storedName) setName(storedName);
    if (storedOnboarded) setHasOnboarded(storedOnboarded);

    setIsLoading(false);
  }, []);

  const updateName = (newName: string) => {
    if (!newName) return;
    setName(newName);
    storage.set(STORAGE_KEYS.USER_NAME, newName);
  };

  const completeOnboarding = (userName: string) => {
    if (!userName) return;

    setName(userName);
    setHasOnboarded(true);
    storage.set(STORAGE_KEYS.USER_NAME, userName);
    storage.set(STORAGE_KEYS.HAS_ONBOARDED, true);
  };

  return (
    <UserContext
      value={{ name, updateName, hasOnboarded, completeOnboarding, isLoading }}
    >
      {children}
    </UserContext>
  );
}
