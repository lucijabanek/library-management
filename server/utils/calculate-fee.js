const { PRICE_PER_DAY, DAY_TO_MS } = require('./constant-values');

const calculateNumberOfDaysLate = (expiredDate) => {
  expiredDate = (new Date(expiredDate)).setHours(0, 0, 0, 0);
  const returnedDate = (new Date()).setHours(0, 0, 0, 0);

  return (returnedDate - expiredDate) / DAY_TO_MS;
};

const calculateLateFee = (expiredDate) => {
  let calculatedFee = 0;

  const numberOfDaysLate = calculateNumberOfDaysLate(expiredDate);

  if (numberOfDaysLate > 0) {
    calculatedFee = (Math.round(numberOfDaysLate * PRICE_PER_DAY * 100) / 100);
  }

  return calculatedFee.toFixed(2);
};

const calculateCurrentLateFee = (lendings) => {
  lendings.forEach(lending => {
    if (!lending.dataValues.lateFee) {
      lending.dataValues.lateFee = calculateLateFee(lending.dataValues.expiredDate);
    }
  });
};

module.exports.calculateNumberOfDaysLate = calculateNumberOfDaysLate;
module.exports.calculateLateFee = calculateLateFee;
module.exports.calculateCurrentLateFee = calculateCurrentLateFee;
