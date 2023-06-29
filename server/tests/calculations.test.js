const { calculateNumberOfDaysLate, calculateLateFee } = require('../utils/calculate-fee');
const { DAY_TO_MS, PRICE_PER_DAY } = require('../utils/constant-values');

const DAYS = 4;
const expiredDateInPast = new Date(Date.now() - DAYS * DAY_TO_MS);
const expiredDateInFuture = new Date(Date.now() + DAYS * DAY_TO_MS);

describe('Calculating number of days late tests', () => {
  test('Subtracting current return date and expired date - expired date before returned date', () => {
    expect(calculateNumberOfDaysLate(expiredDateInPast)).toBe(DAYS);
  });
  test('Subtracting current return date and expired date - expired date equal to returned date', () => {
    expect(calculateNumberOfDaysLate(new Date())).toBe(0);
  });
  test('Subtracting current return date and expired date - expired date after returned date', () => {
    expect(calculateNumberOfDaysLate(expiredDateInFuture)).toBe(-DAYS);
  });
});

describe('Calculating late fee tests', () => {
  test('Calculating late fee - expired date before returned date', () => {
    const lateFee = (PRICE_PER_DAY * DAYS).toFixed(2);
    expect(calculateLateFee(expiredDateInPast)).toEqual(lateFee);
  });
  test('Calculating late fee - expired date equal to returned date', () => {
    expect(calculateLateFee(new Date())).toEqual('0.00');
  });
  test('Calculating late fee - expired date after returned date', () => {
    expect(calculateLateFee(expiredDateInFuture)).toEqual('0.00');
  });
});
