---
layout: post
title: Happy Number
date: 2020-04-02 00:00:00
categories: algorithm-problem
tags: [easy, leetcode]
---
The problem can be found in <a href="https://leetcode.com/problems/happy-number/">here</a>.

# Problem Description
Write an algorithm to determine if a number is **happy**.

A happy number is a number defined by the following process:
1. Starting with any positive integer, replace the number by the sum of the squares of its digits, and
2. repeat the process until the number equals 1 (where it will stay), or
3. it loops endlessly in a cyclw which does not include 1.

Those numbers for which this process ends in 1 are happy numbers

# Example
```
Input: 19
Output: True
Explanation:
1^2 + 9^2 = 82
8^2 + 2^2 = 68
6^2 + 8^2 = 100
1^2 + 0^2 + 0^2 = 1
```

```
Input: 20
Output: False
Explanation:
2^2 + 0^0 = 4
4^2 = 16
1^2 + 6^2 = 37
3^2 + 7^2 = 58
5^2 + 8^2 = 89
8^2 + 9^2 = 145
1^2 + 4^2 + 5^2 = 42
4^2 + 2^2 = 20 (Back to Input)
```

# Algorithm
The main concept here is a **cycle**. A happy number can be looked as a number that converges to `1` (Note that 1^2 = 1 and the sequence 1, 1, 1 ... is a cycle). Hence, we can redefine the problem as the following:

- A number is "happy" when the square sum converges to 1.
- A number is "unhappy" when the square sum cycles back to the original number.

One approach for detecting a cycle is to use an additional space like a set data structure. We can loop through the calculations and add it to the set if it is an unseen number. If we sees the same number again, that shows that the cycle is complete. Then we can look back what the last number is, either the original number or 1.

# Code
```python
def isHappy(n):
    seen = set()
    while n not in seen:
        seen.add(n)
        n = sum([int(x) ** 2 for x in str(n)])
    return n == 1
```

# Analysis
Time complexity is `O(log*n)` or almost `O(1)` and the space complexity if `O(log*n)

# Note
- To reduce the space complexity, we can also apply `Floyd's Cycle-Finding Algorithm`. This will result the space complexity of `O(1)`.
