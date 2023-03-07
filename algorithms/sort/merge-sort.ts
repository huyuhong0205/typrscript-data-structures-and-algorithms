// Merge sort
// O(n*logn)

const mergeTwoSortedArray = (nums1: number[], nums2: number[]): number[] => {
  let result: number[] = [];
  let index1 = 0;
  let index2 = 0;

  while (index1 < nums1.length && index2 < nums2.length) {
    if (nums1[index1] < nums2[index2]) {
      result.push(nums1[index1++]);
    } else {
      result.push(nums2[index2++]);
    }
  }

  if (index1 < nums1.length) result = result.concat(nums1.slice(index1));
  if (index2 < nums2.length) result = result.concat(nums2.slice(index2));

  return result;
};

const mergeSort = (nums: number[]): number[] => {
  if (nums.length <= 1) return nums;

  const center = Math.trunc(nums.length / 2);

  return mergeTwoSortedArray(
    mergeSort(nums.slice(0, center)),
    mergeSort(nums.slice(center))
  );
};

console.log(mergeSort([17, 12, 5, 9, 200]));
console.log(mergeSort([10, 24, 76, 73, 72, 1, 9]));

export {};
