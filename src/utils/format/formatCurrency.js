export const formatCurrency = (amount) => {
  if (!amount || isNaN(amount) || amount === 0) {
    return "";
  }

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};
