export const bubble_sort = <T>(
  arr: T[],
  compare: (a: T, b: T) => number
): T[] => {
  if (!arr || arr.length <= 0) {
    return [];
  }

  const result = [...arr];

  for (let i = 0; i < result.length; i++) {
    for (let j = 0; j < result.length - i - 1; j++) {
      if (compare(result[j], result[j + 1]) > 0) {
        const temp = result[j];
        result[j] = result[j + 1];
        result[j + 1] = temp;
      }
    }
  }

  return result;
};