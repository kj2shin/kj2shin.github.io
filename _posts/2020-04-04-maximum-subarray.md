---
layout: post
title: Maximum Subarray
date: 2020-04-04
categories: algorithm-problem
tags: [easy, leetcode]
---
The problem can be found in <a href="https://leetcode.com/problems/maximum-subarray/">here</a>.

# Problem Description
Given an integer array `nums`, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.

# Example
```
Input: [-2, 1, -3, 4, -1, 2, 1, -5, 4]
Output: 6
Explanation: [4, -1, 2, 1] has the largest sum = 6
```

# Algorithm
First, let's understand what `contiguous subarray` is. A contiguous subarray is a subarray of an array which it has no gaps in between. For example, given the input array as shown in the example above, a subarray, `[1, -3, 4]`, is a contiguous subarray; where as, a subarray `[-2, 1, 4, -1]`, is not a valid contiguous subarray due to missing `-3`.

A simplest solution would be to generate all possible subarrays and perform a sum operation on each subarray to determine the maximum contiguous subarray. However, this will cost us `O(n^3)` running time (subarray generation (`O(n^2)`) * sum (`O(n)`)).

There are multiple approaches to improve the approach from here including divide and conquer and dynamic programming. In this post, an approach using a Dynamic Programming would be introduced here. The dynamic programming solution for this problem is also known as **Kadane's Algorithm**.

## Dynamic Programming
Here are two key points to solve a DP problem efficiently.
- The original problem can be solved relatively easily once solutions to the subproblems are available, and
- These subproblem solutions are cached.

Let's try to define out subproblem for this question. Max contiguous subarray problem can be translated to the following statement
> On what index does this subarray stop to result the max sum, and on what index does it need to be started at.

For example, consider the following
```
nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]
```

Let's consider a subarray ending a certain index (ie. i = 4). In the example, this value corresponds to `nums[4] = -1`. Let's also assume that we know the maximum sum of subarray that ends in previous index (ie. i = 3). Then, we can express the maximum sum of subarray ending in index 4 using the following expression.
```
maximum_sum_ending_index_4 = max(nums[4], nums[4] + maximum_sum_ending_index_3)
```
Simply saying, the maximum sum ending on index 4 is either the value itself or the sum of previous max and its value.

Similarly, to get a maximum sum ending index 3, we can do the following.
```
maximum_sum_ending_index_3 = max(nums[3], nums[3] + maximum_sum_ending_index_2)
```

To get `maximum_sum_ending_index_2`, we can perform a similar approach with index 1, and so on. Finally, `maximum_sum_ending_0` correponds to `nums[0]` itself.

Now we have successfully identified the `maximum_sum_ending` on each index. To answer the full question, we just need to return the maximum of these.

# Code
```python
def maxSubArray(nums):
    max_sum = global_max = nums[0]

    for i in range(1, len(nums)):
        max_sum = max(nums[i], nums[i] + max_sum)
        global_max = max(global_max, max_sum)
    return global_max
```

# Analysis
This algorithm runs with time complexity of `O(n)` and space complexity of `O(1)`.
