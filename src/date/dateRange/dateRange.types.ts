export type DateRangeOptions = {
  message?: {
    invalidStart?: string;
    invalidEnd?: string;
    startBeforeEnd?: string;
  };
};

export type DateRangeInput = {
  start: Date | string | number;
  end: Date | string | number;
};