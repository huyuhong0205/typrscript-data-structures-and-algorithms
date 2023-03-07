// Binary search

const binarySearch = (nums: number[], val: number): number => {
  let left = 0;
  let right = nums.length - 1;
  let center: number;

  while (left <= right) {
    center = Math.floor((right + left) / 2);

    if (nums[center] === val) return center;
    if (nums[center] < val) left = center + 1;
    if (nums[center] > val) right = center - 1;
  }

  return -1;
};

console.log(binarySearch([1, 2, 3, 4, 5, 6, 7], 2));
console.log(binarySearch([1, 2, 3, 4, 5, 6, 7], 9));

export {};
