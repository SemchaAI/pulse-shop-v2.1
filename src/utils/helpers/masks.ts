export const applyMask = (value: string, mask: string) => {
  // mask="+9 (99) 99-99-99"
  const currValue = value.replace(/\D/g, '');
  let formattedValue = '';
  let valueIndex = 0;

  // Iterate through the mask pattern
  for (let i = 0; i < mask.length; i++) {
    const currentMaskChar = mask[i];
    console.log('currentMaskChar', currentMaskChar, value);
    if (currentMaskChar === '9' && valueIndex < currValue.length) {
      // Apply number from input
      formattedValue += currValue[valueIndex];
      valueIndex++;
    } else if (currentMaskChar !== '9') {
      formattedValue += currentMaskChar;
    }
    if (valueIndex >= currValue.length) {
      break;
    }
  }

  return formattedValue;
};
