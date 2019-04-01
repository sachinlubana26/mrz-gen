# Machine-readable zone code generator

This library helps to generate [Machine-readable zone codes](https://en.wikipedia.org/wiki/Machine-readable_passport). 
It's implemented with Node.js and TypeScript. 

## Dependencies:

The project depends on the following dev libraries:
* `Node.js`;
* `TypeScript`;
* `jest` and `ts-jest`;
* `ts-node-dev`;
* `tslint`.


## Installation

To install it as your project dependency, run:

```sh
$ npm install mrz-gen
```

## API

The library exports some methods:
* `generate` – the function that actually generates the code. It validates the data and generates the MRZ code.;
  

### Basic example

You could use `generate` function to generate a machine-readable zone code. 

```typescript
import { generate } from 'mrz-gen';

const code = generate({
  user: {
    firstName: 'Jane',
    lastName: 'Lodges',
    passportNumber: '123456789',
    countryCode: 'USA',
    nationality: 'USA',
    birthday: '01.02.1983',
    gender: 'F',
    validUntilDay: '02.03.2028',
    personalNumber: '12345678901234',
  },
});

// Prints P<USALODGES<<JANE<<<<<<<<<<<<<<<<<<<<<<<<<<<\n1234567897USA8302010F28030211234567890123454
console.log(code);
```

## Copyright

Author: Sachin Lubana ([@lubanasachin](https://github.com/sachinlubana26))

