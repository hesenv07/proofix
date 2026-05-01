# Contributing to proofix

Thank you for contributing! This guide explains how to add new validators.

---

## Project Structure

```
src/
├── shared/                     # Common types and constants
│   ├── types.ts
│   ├── consts.ts
│   └── index.ts
├── string/                     # String validators
│   ├── email/
│   │   ├── email.ts
│   │   ├── email.types.ts
│   │   ├── email.consts.ts
│   │   └── index.ts
│   ├── password/
│   │   └── ...
│   └── index.ts
├── document/                   # Document validators
├── date/                       # Date validators
├── number/                     # Number validators
├── network/                    # Network validators
└── index.ts                    # Main exports
```

---

## Adding a Validator

### 1. Pick a Category

| Category   | Path            | Examples                          |
| ---------- | --------------- | --------------------------------- |
| `string`   | `src/string/`   | email, password, uuid, slug       |
| `document` | `src/document/` | iban, creditCard, ssn, vatNumber  |
| `date`     | `src/date/`     | pastDate, futureDate, ageRange    |
| `number`   | `src/number/`   | currency, percentage, latitude    |
| `network`  | `src/network/`  | ipAddress, macAddress, domain     |

### 2. Create Validator Folder

Create a folder `src/<category>/<validatorName>/` with the following files:

#### `<validatorName>.types.ts`

```ts
import type { BaseValidatorOptions } from '../../shared/types.js';

export interface MyValidatorOptions extends BaseValidatorOptions {
  someOption?: string;
  anotherOption?: number;
}
```

#### `<validatorName>.consts.ts` (if needed)

```ts
export const MY_PATTERN = /^[a-z]+$/;

export const MY_VALUES = ['one', 'two', 'three'] as const;
```

#### `<validatorName>.ts`

```ts
import { z } from 'zod';
import type { MyValidatorOptions } from './myValidator.types.js';
import { MY_PATTERN } from './myValidator.consts.js';

export function myValidator(options: MyValidatorOptions = {}) {
  const { someOption = 'default', message } = options;

  return z.string().refine(
    (val) => MY_PATTERN.test(val),
    { message: message ?? 'Invalid value' }
  );
}
```

#### `index.ts`

```ts
export { myValidator } from './myValidator.js';
export type { MyValidatorOptions } from './myValidator.types.js';
```

### 3. Export from Category Index

**File:** `src/<category>/index.ts`

```ts
export { myValidator } from './myValidator/index.js';
export type { MyValidatorOptions } from './myValidator/index.js';
```

---

## File Structure Summary

```
src/<category>/<validatorName>/
├── <validatorName>.ts           # Main function
├── <validatorName>.types.ts     # TypeScript interfaces
├── <validatorName>.consts.ts    # Constants (optional)
└── index.ts                     # Exports
```

---

## Code Guidelines

- Use `z.refine()` for single pass/fail checks
- Use `z.superRefine()` for multiple independent error messages
- Always extend `BaseValidatorOptions` for the `message` option
- Keep files focused and small
- Do not add JSDoc comments or inline comments
- Use `import type` for type-only imports

---

## Before Submitting

```bash
npm run lint
npm run type-check
npm run build
```

---

## PR Checklist

- [ ] Validator folder created with all required files
- [ ] Types extend `BaseValidatorOptions`
- [ ] Exported from category `index.ts`
- [ ] README updated with documentation
- [ ] All checks pass
