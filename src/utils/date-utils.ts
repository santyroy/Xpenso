export function isValidDate(date: string): boolean {
  const dateArr = date.split('/');
  if (dateArr.length !== 3) return false; // must be DD/MM/YYYY

  const [day, month, year] = dateArr.map(Number);

  // Construct date safely
  const tempDate = new Date(year, month - 1, day);

  // Check that components match (to avoid cases like 32/01/2025 rolling over)
  return (
    tempDate.getFullYear() === year &&
    tempDate.getMonth() === month - 1 &&
    tempDate.getDate() === day
  );
}
