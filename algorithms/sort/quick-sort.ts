// Quick sort
// time complexity
// best: O(n*logn), average: O(n*logn), worst: O(n^2) - in sorted array, because I choose the start element to pivot in the array

const swap = (arr: unknown[], index1: number, index2: number): void => {
  [arr[index1], arr[index2]] = [arr[index2], arr[index1]];
};

/**
 *
 * @param nums target array
 * @param start start index
 * @param end end index
 * @returns {number} correct index of the pivot point (in there I choose the start element in the array)
 */
const pivot = (
  nums: number[],
  start: number = 0,
  end: number = nums.length - 1
): number => {
  let swapIndex = start;

  for (let i = start + 1; i <= end; i++) {
    if (nums[i] < nums[start]) swap(nums, i, ++swapIndex);
  }

  swap(nums, start, swapIndex);
  return swapIndex;
};

const quickSort = (
  nums: number[],
  start: number = 0,
  end: number = nums.length - 1
): number[] => {
  if (start >= end) return nums;

  const pivotIndex = pivot(nums, start, end);

  quickSort(nums, start, pivotIndex - 1); // left side
  quickSort(nums, pivotIndex + 1, end); // right side

  return nums;
};

console.log(quickSort([17, 12, 5, 9, 200]));
console.log(quickSort([10, 24, 76, 73, 72, 1, 9]));

export {};
