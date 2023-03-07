// Insertion sort
// O(n^2)
// Good at nearly sorted arrays

const insertionSort = (nums: number[]): number[] => {
  let current: number;

  for (let i = 1; i < nums.length; i++) {
    current = nums[i];

    for (let j = i - 1; j >= 0; j--) {
      if (current >= nums[j]) {
        nums[j + 1] = current;
        break;
      }

      nums[j + 1] = nums[j];
    }
    if (nums[0] > current) nums[0] = current;
  }

  return nums;
};

const nums1 = [17, 12, 5, 9, 200];

console.log(insertionSort(nums1));

export {};
