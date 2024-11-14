export function format(date: Date, formatStr: string): string {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const shortMonths = months.map(m => m.slice(0, 3));

  const pad = (num: number) => num.toString().padStart(2, '0');
  
  return formatStr
    .replace('MMMM', months[date.getMonth()])
    .replace('MMM', shortMonths[date.getMonth()])
    .replace('MM', pad(date.getMonth() + 1))
    .replace('yyyy', date.getFullYear().toString())
    .replace('d', date.getDate().toString());
}

export function isTimeConflict(
  existingStart: string,
  existingEnd: string,
  newStart: string,
  newEnd: string
): boolean {
  return (
    (newStart >= existingStart && newStart < existingEnd) ||
    (newEnd > existingStart && newEnd <= existingEnd) ||
    (newStart <= existingStart && newEnd >= existingEnd)
  );
}