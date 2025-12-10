export const capitalize = (text: string) => {
  if (!text || text.length === 0) return;
  return text.substring(0, 1).toUpperCase() + text.substring(1);
};
