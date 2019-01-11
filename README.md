# brdocument-validator

Validate CPF/CNPJ documents

## Install

```
npm install --save brdocument-validator
```

## Usage

```javascript
const brdocument = require('brdocument-validator')

let   isValid = brdocument.validate('111.111.111-11') // false
      isValid = brdocument.validate('474.353.233-73') // true
      isValid = brdocument.validate('11.111.111/0001-11') // false
      isValid = brdocument.validate('05.196.652/0001-67') // true
```

## API

### validate()

Method signature:

```javascript
Boolean validate(String document);
```

## Changelog

**v0.0.1**

* Initial project