export function isValidField(field: string, min: number, max: number): boolean {
  if (field === '*') return true;

  const stepMatch = field.match(/^(.+)\/(\d+)$/);
  if (stepMatch) {
    const [, range, step] = stepMatch;
    if (parseInt(step, 10) < 1) return false;
    return isValidField(range, min, max);
  }

  const rangeMatch = field.match(/^(\d+)-(\d+)$/);
  if (rangeMatch) {
    const [, start, end] = rangeMatch;
    const s = parseInt(start, 10);
    const e = parseInt(end, 10);
    return s >= min && e <= max && s <= e;
  }

  if (field.includes(',')) {
    return field.split(',').every((part) => isValidField(part.trim(), min, max));
  }

  const num = parseInt(field, 10);
  return !isNaN(num) && num >= min && num <= max;
}
