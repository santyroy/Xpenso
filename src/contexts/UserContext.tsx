import { createContext, ReactNode, useEffect, useState } from 'react';
import { storage } from '../mmkv/storage';
import { STORAGE_KEYS } from '../mmkv/keys';
import { getCountryCurrency } from '../utils/text-utils';

type UserContextType = {
  name: string;
  updateName: (name: string) => void;
  hasOnboarded: boolean;
  completeOnboarding: (name: string, country: string) => void;
  currency: string;
  country: string;
  updateCountry: (name: string) => void;
  isLoading: boolean;
};

export const UserContext = createContext<UserContextType | undefined>(
  undefined,
);

export function UserProvider({ children }: { children: ReactNode }) {
  const [name, setName] = useState('');
  const [country, setCountry] = useState('');
  const [currency, setCurrency] = useState('INR');
  const [hasOnboarded, setHasOnboarded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedName = storage.getString(STORAGE_KEYS.USER_NAME);
    const storedCurrency = storage.getString(STORAGE_KEYS.USER_CURRENCY);
    const storedCountry = storage.getString(STORAGE_KEYS.USER_COUNTRY);
    const storedOnboarded = storage.getBoolean(STORAGE_KEYS.HAS_ONBOARDED);

    if (storedName) setName(storedName);
    if (storedCurrency) setCurrency(storedCurrency);
    if (storedCountry) setCountry(storedCountry);
    if (storedOnboarded) setHasOnboarded(storedOnboarded);

    setIsLoading(false);
  }, []);

  const updateName = (newName: string) => {
    if (!newName) return;
    setName(newName);
    storage.set(STORAGE_KEYS.USER_NAME, newName);
  };

  const updateCountry = (newCountry: string) => {
    if (!newCountry) return;
    setCountry(newCountry);
    storage.set(STORAGE_KEYS.USER_COUNTRY, newCountry);
    const currencyCode = getCountryCurrency(newCountry) ?? 'INR';
    setCurrency(currencyCode);
    storage.set(STORAGE_KEYS.USER_CURRENCY, currencyCode);
  };

  const completeOnboarding = (userName: string, userCountry: string) => {
    if (!userName || !userCountry) return;

    const currencyCode = getCountryCurrency(userCountry) ?? 'INR';
    setName(userName);
    setCountry(userCountry);
    setCurrency(currencyCode);
    setHasOnboarded(true);
    storage.set(STORAGE_KEYS.USER_NAME, userName);
    storage.set(STORAGE_KEYS.USER_COUNTRY, userCountry);
    storage.set(STORAGE_KEYS.USER_CURRENCY, currencyCode);
    storage.set(STORAGE_KEYS.HAS_ONBOARDED, true);
  };

  return (
    <UserContext
      value={{
        name,
        updateName,
        hasOnboarded,
        completeOnboarding,
        currency,
        country,
        updateCountry,
        isLoading,
      }}
    >
      {children}
    </UserContext>
  );
}
