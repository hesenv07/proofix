# proofix

<div align="center">

**Production-ready Zod validators for real-world data**

[![npm version](https://img.shields.io/npm/v/proofix.svg?style=flat-square)](https://www.npmjs.com/package/proofix)
[![npm downloads](https://img.shields.io/npm/dm/proofix.svg?style=flat-square)](https://www.npmjs.com/package/proofix)
[![bundle size](https://img.shields.io/bundlephobia/minzip/proofix?style=flat-square)](https://bundlephobia.com/package/proofix)
[![license](https://img.shields.io/npm/l/proofix.svg?style=flat-square)](./LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue?style=flat-square)](https://www.typescriptlang.org/)
[![zod peer](https://img.shields.io/npm/dependency-version/proofix/peer/zod?style=flat-square)](https://zod.dev)

[Installation](#installation) • [Quick Start](#quick-start) • [Validators](#validators) • [Contributing](#contributing)

</div>

---

## Why proofix?

You're already using Zod. Writing the same `.refine()` logic for emails, passwords, IBANs, and phone numbers across every project gets old fast. **proofix** is a growing, community-driven collection of **28 validators** that slot directly into your schemas.

- **28 production-ready validators** — emails, URLs, UUIDs, credit cards, IBANs, and more
- **Fully typed** — TypeScript-first with exported option interfaces
- **Tree-shakeable** — import only what you need
- **Customizable** — every validator accepts a `message` option
- **Zero dependencies** — only `zod` as a peer dependency

---

## Installation

```bash
npm install proofix zod
```

```bash
pnpm add proofix zod
```

```bash
yarn add proofix zod
```

```bash
bun add proofix zod
```

> `zod` is a peer dependency — you control the version (>= 3).

---

## Quick Start

```ts
import { z } from 'zod';
import { email, password, creditCard, iban } from 'proofix';

const UserSchema = z.object({
  email: email({ blockDisposable: true }),
  password: password({ requireSpecial: true, minLength: 10 }),
});

const PaymentSchema = z.object({
  cardNumber: creditCard(),
  bankAccount: iban(),
});

type User = z.infer<typeof UserSchema>;
type Payment = z.infer<typeof PaymentSchema>;
```

Every validator is a plain function returning a Zod schema. Compose, extend, and `.pipe()` them exactly like any native Zod type.

---

## Tree-Shakeable Imports

Import from the root or go category-specific:

```ts
// Root import
import { email, password, uuid } from 'proofix';

// Category-specific imports
import { email, password, uuid } from 'proofix/string';
import { creditCard, iban, ssn } from 'proofix/document';
import { pastDate, futureDate, ageRange } from 'proofix/date';
import { currency, percentage, latitude } from 'proofix/number';
import { ipAddress, macAddress, domain } from 'proofix/network';
```

---

## Validators

### String — `proofix/string`

| Validator   | Description                               |
| ----------- | ----------------------------------------- |
| `email`     | Email with disposable blocking            |
| `password`  | Configurable password strength            |
| `fullName`  | First and last name validation            |
| `username`  | Alphanumeric usernames                    |
| `phone`     | International phone formats               |
| `slug`      | URL-friendly slugs                        |
| `url`       | URL with protocol restrictions            |
| `uuid`      | UUID v1-v7 validation                     |
| `hexColor`  | Hex color codes (#RGB, #RRGGBB, #RRGGBBAA)|
| `jwt`       | JSON Web Token format                     |
| `semver`    | Semantic versioning                       |
| `cron`      | Cron expressions                          |

### Document — `proofix/document`

| Validator        | Description                        |
| ---------------- | ---------------------------------- |
| `iban`           | IBAN with checksum verification    |
| `creditCard`     | Credit card with Luhn check        |
| `passportNumber` | Country-specific passport formats  |
| `serialNumber`   | Product serial numbers             |
| `vatNumber`      | EU VAT identification numbers      |
| `ssn`            | US Social Security Number          |
| `postalCode`     | Country-specific postal codes      |
| `mongoId`        | MongoDB ObjectId                   |

### Date — `proofix/date`

| Validator    | Description                      |
| ------------ | -------------------------------- |
| `pastDate`   | Date in the past                 |
| `futureDate` | Date in the future               |
| `ageRange`   | Age from date of birth           |

### Number — `proofix/number`

| Validator    | Description                      |
| ------------ | -------------------------------- |
| `currency`   | Monetary amounts                 |
| `percentage` | Percentage values (0-100)        |
| `latitude`   | Latitude (-90 to 90)             |
| `longitude`  | Longitude (-180 to 180)          |
| `port`       | Network port numbers             |

### Network — `proofix/network`

| Validator    | Description                      |
| ------------ | -------------------------------- |
| `ipAddress`  | IPv4 and IPv6 addresses          |
| `macAddress` | MAC addresses                    |
| `domain`     | Domain names                     |

---

## Examples

### email

```ts
email().parse('user@example.com');                              // ok
email({ blockDisposable: true }).parse('user@tempmail.com');    // throws
email({ allowedDomains: ['company.com'] }).parse('a@company.com'); // ok
```

| Option           | Type       | Default | Description                    |
| ---------------- | ---------- | ------- | ------------------------------ |
| `blockDisposable`| `boolean`  | `false` | Block disposable providers     |
| `allowedDomains` | `string[]` | —       | Whitelist domains              |
| `blockedDomains` | `string[]` | —       | Blacklist domains              |
| `allowedTlds`    | `string[]` | —       | Restrict TLDs                  |
| `maxLength`      | `number`   | `254`   | Maximum length                 |

### password

```ts
password().parse('Secret1');                           // ok
password({ requireSpecial: true }).parse('Secret1!'); // ok
password({ minLength: 12 }).parse('Short1');          // throws
```

| Option             | Type      | Default | Description              |
| ------------------ | --------- | ------- | ------------------------ |
| `minLength`        | `number`  | `8`     | Minimum length           |
| `maxLength`        | `number`  | `128`   | Maximum length           |
| `requireUppercase` | `boolean` | `true`  | Require uppercase        |
| `requireLowercase` | `boolean` | `true`  | Require lowercase        |
| `requireNumbers`   | `boolean` | `true`  | Require digit            |
| `requireSpecial`   | `boolean` | `false` | Require special char     |

### creditCard

```ts
creditCard().parse('4111111111111111');    // ok (Visa test)
creditCard().parse('4111 1111 1111 1111'); // ok
creditCard().parse('1234567890123456');    // throws (Luhn fails)
```

### iban

```ts
iban().parse('GB29 NWBK 6016 1331 9268 19'); // ok
iban().parse('DE89370400440532013000');      // ok
iban().parse('GB00INVALID');                  // throws
```

### uuid

```ts
uuid().parse('550e8400-e29b-41d4-a716-446655440000');           // ok
uuid({ version: 4 }).parse('550e8400-e29b-41d4-a716-446655440000'); // ok
uuid({ version: 4 }).parse('550e8400-e29b-11d4-a716-446655440000'); // throws (v1)
```

| Option    | Type                              | Default | Description |
| --------- | --------------------------------- | ------- | ----------- |
| `version` | `1 \| 3 \| 4 \| 5 \| 7 \| 'any'`  | `'any'` | UUID version|

### ipAddress

```ts
ipAddress().parse('192.168.1.1');         // ok (IPv4)
ipAddress().parse('::1');                 // ok (IPv6)
ipAddress({ version: 4 }).parse('::1');   // throws
```

| Option    | Type                  | Default  | Description |
| --------- | --------------------- | -------- | ----------- |
| `version` | `4 \| 6 \| 'both'`    | `'both'` | IP version  |

### postalCode

```ts
postalCode({ country: 'US' }).parse('12345');      // ok
postalCode({ country: 'US' }).parse('12345-6789'); // ok (ZIP+4)
postalCode({ country: 'GB' }).parse('SW1A 1AA');   // ok
postalCode({ country: 'DE' }).parse('10115');      // ok
```

**Supported:** `US` `CA` `GB` `DE` `FR` `IT` `ES` `NL` `BE` `AT` `CH` `PL` `PT` `SE` `NO` `DK` `FI` `AU` `NZ` `JP` `CN` `IN` `BR` `RU` `AZ` `TR`

### latitude / longitude

```ts
latitude().parse(40.7128);   // ok (New York)
latitude().parse(91);        // throws

longitude().parse(-74.006);  // ok (New York)
longitude().parse(181);      // throws
```

### port

```ts
port().parse(8080);                         // ok
port({ range: 'registered' }).parse(3000);  // ok
port({ excludeWellKnown: true }).parse(80); // throws
```

| Option            | Type                                            | Default | Description         |
| ----------------- | ----------------------------------------------- | ------- | ------------------- |
| `range`           | `'any' \| 'privileged' \| 'registered' \| 'dynamic'` | `'any'` | Port range    |
| `excludeWellKnown`| `boolean`                                       | `false` | Exclude 0-1023      |
| `excludeZero`     | `boolean`                                       | `true`  | Exclude port 0      |

---

## Custom Error Messages

Every validator accepts a `message` option:

```ts
const schema = z.object({
  email: email({ message: 'Invalid email address' }),
  card: creditCard({ message: 'Card number is invalid' }),
});
```

---

## Composing with Zod

proofix validators are plain Zod schemas:

```ts
import { z } from 'zod';
import { password, email } from 'proofix';

const BrandedPassword = password().brand<'Password'>();
const OptionalEmail = email().optional();
const NormalizedEmail = email().transform((e) => e.toLowerCase());
```

Works with react-hook-form, tRPC, Hono, Fastify, or any Zod-aware library.

---

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for the guide on adding validators.

---

## License

MIT © [Arif Hasanov](https://github.com/hesenv07)
