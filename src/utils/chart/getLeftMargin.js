export const getLeftMargin = (data) => {
  if (!data || data.length === 0) return 44;

  const rawMax = Math.max(...data.map(item => item.count));
  let roundedMax = rawMax;
    
  if (rawMax >= 880) {
    const remainder = rawMax % 1000;

    if (remainder > 880) {
      roundedMax = rawMax + (1000 - remainder);
    }
  } else if (rawMax >= 80) {
    const remainder = rawMax % 100;

    if (remainder > 80) {
      roundedMax = rawMax + (100 - remainder);
    }
  }

  const digits = String(roundedMax).length;

  return 44 + (digits - 1) * -5;
};
