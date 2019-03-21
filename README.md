# kbank-payroll.js

Export your data into text file that support in KBank Smart Payroll system.

## Installation

You can install package from npm

```bash
npm install kbank-payroll.js
```

Or you can use `yarn`

```bash
yarn add kbank-payroll.js
```

## Usage

```javascript
// Import kbank-payroll.js package
const kbank = require('kbank-payroll.js');

// For Smart Payroll
const smartPayroll = kbank.smartPayroll(
  [
    { name: 'John Doe', amount: 6370, accountNumber: '4371992192' },
    { name: 'John Dee', amount: 100.12, accountNumber: '1298749321' },
    { name: 'Erict Doe', amount: 5000, accountNumber: '9837174126' },
  ],
  {
    companyName: 'John Doe Company',
    accountNumber: '1234567890',
    date: new Date('02, 22 2019'),
  }
);

// For Direct Credit
const directCredit = kbank.directCredit(
  [
    { name: 'John Doe', amount: 6370, accountNumber: '4371992192' },
    { name: 'John Dee', amount: 100.12, accountNumber: '1298749321' },
    { name: 'Erict Doe', amount: 5000, accountNumber: '9837174126' },
  ],
  {
    companyName: 'John Doe Company',
    accountNumber: '1234567890',
    date: new Date('02, 22 2019'),
  }
);

// Both functions return as string and ready to save as text to upload directly to KBank's system!
const fs = require('fs');
fs.writeFileSync('payroll.txt', directCredit);
```

## API

### `transaction` object

`transaction` use in this library is a simple JavaScript object with this schema. **All keys are required.**

```javascript
{
  name: String,
  amount: Number,
  accountNumber: String (length is 10),
}
```

### `config` object

`config` use in this library is a simple JavaScript object with this schema.

```javascript
{
  companyName: String (Required),
  accountNumber: String (Required),
  date: Date (Optional, default is `Date.now()`),
}
```

### `smartPayroll(transactions, config)`

Convert transactions array into string that compatible to use with KBank's smart payroll.

Take two parameters

- `transactions` array which is array of `transaction` object
- `config` object

Return as `string`

### `directCredit(transactions, config)`

Convert transactions array into string that compatible to use with KBank's direct credit.

Take two parameters

- `transactions` array which is array of `transaction` object
- `config` object

Return as `string`

## Contribution

Feels free for any kind of contribution (issue, PR, etc.). :D

## License

MIT
