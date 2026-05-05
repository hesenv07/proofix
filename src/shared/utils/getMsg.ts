export const getMsg = <T extends Record<string, string | undefined>>(
  message: string | T | undefined,
  key: keyof T,
  fallback: string
): string => {
  if (typeof message === 'string') return message;
  return message?.[key] ?? fallback;
};