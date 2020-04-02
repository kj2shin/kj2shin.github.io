---
layout: post
title: Single Number
date: 2020-04-01 00:00:01
categories: algorithm-problem
tags: [easy, leetcode]
---
The problem can be found in <a href="https://leetcode.com/problems/single-number/" target="_blank">here</a>.

# Problem Description
Given a **non-empty** array of integers, every element appears _twice_ except for one. Find that single one.

Note:
Your algorithm should have a linear runtime complexity.
Could you implement it without using extra memory?

# Example
```
Input: [2, 2, 1]
Output: 1
```

```
Input: [4, 1, 2, 1, 2]
Output: 4
```

# Algorithm
The brute-force approach would be comparing element by element and this will result `O(n^2)` time complexity.
```python
for i in range(len(nums)):
    duplicate_found = False
    for j in range(len(nums)):
        if i == j:
            continue
        if nums[i] == nums[j]:
            duplicate_found = True
            break
     if not duplicate_found:
         return nums[i]
```

Another approach is to use a hashmap to keep track which number was seen in the past.
```python
from collections import defaultdict

hashmap = defaultdict(int)
for num in nums:
    hashmap[num] += 1

for i in hashmap:
    if hashmap[i] == 1:
        return i
```
The time complexity here is no `O(n)` however, we are using `O(n)` space here.

A main trick to this problem is to use a **Bit Manipulation**. Specifially, we are interested with `XOR` operation.

Here are some `XOR` characteristics that will help us.
- If we take `XOR` of zero and some bit, it will return that bit.
    `a ^ 0 = a`
- If we take `XOR` of two same bits, it will return 0
    `a ^ a = 0`
- `XOR` is associative.
    `a ^ (b ^ c) == (a ^ b) ^ c`

Based on these facts, starting with `0` we can perform `XOR` manipulation element by element and the final result would be the `single` integer that we wish to find. (As repeating integers would cancel each other due to the 2nd characteristic)

# Code
```python
def singleNumber(nums):
    a = 0
    for i in nums:
        a ^= i
    return a
```

# Analysis
The time complexity if `O(n)` and the space complexity if `O(1)`.
