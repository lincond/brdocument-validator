/**
 * Validate a CPF or CNPJ
 * @param {string} document CPF or CNPJ document number
 */
const validate = (document) => {
  const cleanDocument = document.replace(/[^\d]/g,"")
  const isSameNumber  = cleanDocument.match(/^(\d)\1{10}$/)
  if (isSameNumber) 
    return false

  if (cleanDocument.length == 11)
    return validateCPF(cleanDocument)
  if (cleanDocument.length == 14)
    return validateCNPJ(cleanDocument)
  return false
}

const validateCNPJ = (cnpj) => {
  let weights = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
  const digits = toDigits(cnpj)
  
  let sum = getWeightSum(weights, digits)
  const firstDV = getCNPJNormalizedDV(sum % 11)

  weights = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
  const newDigits = digits.slice(0, 12)
  newDigits.push(firstDV)
  
  sum = getWeightSum(weights, newDigits)
  const secondDV = getCNPJNormalizedDV(sum % 11)

  return firstDV == digits[12] && secondDV == digits[13]
}

const getCNPJNormalizedDV = (dv) => dv < 2 ? 0 : 11 - dv

const getWeightSum = (weights, digits) => {
  const result = weights.map((w, i) => w * digits[i])
  return result.reduce((acc, cur) => acc + cur, 0)
}

const toDigits = (document) => document.split('').map((digit) => parseInt(digit))

const validateCPF = (cpf) => {
  const digits = toDigits(cpf)
  const firstDigits = digits.slice(0, 9)

  const firstDV = getValidationDigit(firstDigits, 10)
  firstDigits.push(firstDV)
  const secondDV = getValidationDigit(firstDigits, 11)

  return firstDV == digits[9] && secondDV == digits[10]
}

const getValidationDigit = (digits, multiplier) => {
  let digit = digits.reduce((acc, cur) => (cur * multiplier--) + acc, 0)
  digit = (digit * 10) % 11
  return (digit == 10) ? 0 : digit
}

module.exports = { validate: validate }
