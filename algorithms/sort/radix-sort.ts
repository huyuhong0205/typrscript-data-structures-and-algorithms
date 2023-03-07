// Radix sort
// NOT a comparsion sort
// ONLY work on integer numbers array
// time complexity
// O(n * k) = O(n * mostDigit in nums)

const getDigit = (num: number, position: number): number => {
  return Math.trunc(Math.abs(num) / 10 ** position) % 10;
};

const countDigit = (num: number): number => {
  if (num === 0) return 1;

  return Math.trunc(Math.log10(Math.abs(num))) + 1;
};

const mostDigit = (nums: number[]): number => {
  return countDigit(Math.max(...nums));
};

const radixSort = (nums: number[]): number[] => {
  const maxDigit = mostDigit(nums);

  for (let curDigit = 0; curDigit <= maxDigit; curDigit++) {
    const buckets: Array<number[]> = Array.from({ length: 10 }, () => []);

    nums.forEach((num) => buckets[getDigit(num, curDigit)].push(num));

    nums = ([] as number[]).concat(...buckets);
  }

  return nums;
};

console.log(radixSort([17, 12, 5, 9, 200]));
console.log(radixSort([10, 24, 76, 73, 72, 1, 9]));

export {};
