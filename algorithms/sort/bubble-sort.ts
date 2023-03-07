// Bubble sort
// O(n^2)

const bubbleSort = (nums: number[]): number[] => {
  let swap: boolean;

  for (let i = 0; i < nums.length - 1; i++) {
    swap = false;

    for (let j = 0; j < nums.length - i - 1; j++) {
      if (nums[j] > nums[j + 1]) {
        swap = true;

        [nums[j], nums[j + 1]] = [nums[j + 1], nums[j]];
      }
    }

    // if no swap in previous loop stands for array already been sorted
    if (!swap) break;
  }

  return nums;
};

const nums1 = [17, 12, 5, 9, 200];

console.log(bubbleSort(nums1));

export {};
