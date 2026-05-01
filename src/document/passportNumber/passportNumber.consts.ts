export const COUNTRY_PATTERNS: Record<string, RegExp> = {
  RU: /^\d{10}$/,
  CN: /^[EG]\d{8}$/,
  TR: /^[A-Z]\d{8}$/,
  IN: /^[A-Z]\d{7}$/,
  US: /^[A-Z0-9]{9}$/,
  ES: /^[A-Z0-9]{9}$/,
  DE: /^[A-Z0-9]{10}$/,
  IT: /^[A-Z]{2}\d{7}$/,
  GB: /^[A-Z]{2}[0-9]{7}$/,
  AZ: /^[A-Z]{3}[0-9]{6}$/,
  FR: /^\d{2}[A-Z]{2}\d{5}$/,
};
