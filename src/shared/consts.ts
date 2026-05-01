export const DISPOSABLE_EMAIL_DOMAINS = new Set([
  'tempmail.com',
  'throwaway.com',
  'guerrillamail.com',
  'mailinator.com',
  '10minutemail.com',
  'temp-mail.org',
  'fakeinbox.com',
  'trashmail.com',
  'getnada.com',
  'maildrop.cc',
]);

export const COUNTRY_CODES = [
  'US', 'CA', 'GB', 'DE', 'FR', 'IT', 'ES', 'NL', 'BE', 'AT',
  'CH', 'PL', 'PT', 'SE', 'NO', 'DK', 'FI', 'AU', 'NZ', 'JP',
  'CN', 'IN', 'BR', 'RU', 'AZ', 'TR',
] as const;

export type CountryCode = typeof COUNTRY_CODES[number];
