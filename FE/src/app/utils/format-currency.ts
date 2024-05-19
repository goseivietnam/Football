export const formatCurrency = (value: number): string => {
  const formatter = value.toLocaleString('it-IT', {
    style: 'currency',
    currency: 'VND',
  });
  return formatter;
};
