export const PORT_RANGES = {
  any: { min: 0, max: 65535 },
  privileged: { min: 0, max: 1023 },
  registered: { min: 1024, max: 49151 },
  dynamic: { min: 49152, max: 65535 },
} as const;
