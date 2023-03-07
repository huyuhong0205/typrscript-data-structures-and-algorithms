// Selection sort
// O(n^2)

const selectionSort = (nums: number[]): number[] => {
  let smallestIndex: number;

  for (let i = 0; i < nums.length - 1; i++) {
    smallestIndex = i;

    for (let j = i; j < nums.length - 1; j++) {
      if (nums[j] < nums[smallestIndex]) smallestIndex = j;
    }

    if (smallestIndex !== i)
      [nums[smallestIndex], nums[i]] = [nums[i], nums[smallestIndex]];
  }

  return nums;
};

const nums1 = [17, 12, 5, 9, 200];

console.log(selectionSort(nums1));

export {};
