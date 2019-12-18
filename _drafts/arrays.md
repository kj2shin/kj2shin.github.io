---
layout: post
title: Arrays
date: 
categories:
---

# What is an Array?
An array is the simplest and commonly used data structure and it is a contiguous block of memory. An array can be expressed as the following.
```python
A = [2,3,6,8,0,10]
```
Given an array `A`, `A[i]` denotes the $$(i+1)$$th object stored in the array. Hence using the example above, `A[0]` corresponds to `2` (1st object) and `A[3]` refers to value `8` (4th object).

# Time Complexity of Array Operations
- Retreiving and updating `A[i]` takes `O(1)` time.
- Insertion into a full array can be done using resizing. This increases the worst-case time of insertion; however, if we resize with a constant factor larger than the original array, resizing is infrequent. Therefore, the average time of insertion is `O(1)`.
- Deleting an element from an array corresponds to removing that element and shift all successive elements one over to the left, so the time complexity of deleting element at index `i` from an array of length `n` is `O(n-i)`.
- Similarly, inserting a new element in the array takes `O(n-i)` time.


