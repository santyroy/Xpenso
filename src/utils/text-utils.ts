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
