import { Period } from '../types/budget-types';

export const capitalize = (text: string) => {
  if (!text || text.length === 0) return;
  return text.substring(0, 1).toUpperCase() + text.substring(1);
};

export const greetMessage = () => {
  const currentHours = new Date().getHours();
  if (currentHours < 6) return 'Good Night';
  if (currentHours < 12) return 'Good Morning';
  if (currentHours < 16) return 'Good Afternoon';
  return 'Good Evening';
};

export const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const generatePreviousYears = (count: number = 10) => {
  const currentYear = new Date().getFullYear();
  const years: string[] = [];

  for (let i = 0; i < count; i++) {
    years.push(String(currentYear - i));
  }

  return years.reverse();
};

export const getMonthYearString = () =>
  months[new Date().getMonth()].substring(0, 3) +
  ' ' +
  new Date().getFullYear();

export const budgetPeriod: Period[] = ['Daily', 'Weekly', 'Monthly', 'Yearly'];

const countryData = new Map([
  ['France', { flag: '🇫🇷', currency: 'EUR' }],
  ['Japan', { flag: '🇯🇵', currency: 'JPY' }],
  ['Brazil', { flag: '🇧🇷', currency: 'BRL' }],
  ['Australia', { flag: '🇦🇺', currency: 'AUD' }],
  ['Egypt', { flag: '🇪🇬', currency: 'EGP' }],
  ['India', { flag: '🇮🇳', currency: 'INR' }],
  ['Canada', { flag: '🇨🇦', currency: 'CAD' }],
  ['Greece', { flag: '🇬🇷', currency: 'EUR' }],
  ['South Africa', { flag: '🇿🇦', currency: 'ZAR' }],
  ['Iceland', { flag: '🇮🇸', currency: 'ISK' }],
  ['USA', { flag: '🇺🇸', currency: 'USD' }],
  ['UK', { flag: '🇬🇧', currency: 'GBP' }],
]);

export const countryName = Array.from(countryData).map(
  ([key, value]) => `${value.flag} ${key}`,
);

export const getCountryCurrency = (country: string) => {
  const name = country.split(' ')[1];
  return countryData.get(name)?.currency;
};

export const formatAmount = (amount: number, currency: string) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency || 'INR',
    minimumFractionDigits: 0, // Remove decimal
    maximumFractionDigits: 0, // Rounds to nearest whole number
  }).format(amount);
};
