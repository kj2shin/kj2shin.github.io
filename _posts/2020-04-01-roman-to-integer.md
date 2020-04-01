---
layout: post
title: Roman to Integer
date: 2020-04-01
categories: algorithm-problem
tags: [easy, leetcode]
---
The problem can be found in <a href="https://leetcode.com/problems/roman-to-integer/" target="_blank">here</a>.

# Problem Description
Roman numerals are represented by seven different symbols:
```
Symbol      Value
I           1
V           5
X           10
L           50
C           100
D           500
M           1000
```
For example, two is written as `II` in Roman numeral, just two one's added together. Similarly, twelve is writtern as, `XII`, which is simply `X` + `II`.

Roman numerals are usually written largest to smallest from left to right. However, the numeral for four is not `IIII`. Instead, the number four is written as `IV`, which translated to `V` minus `I`. There are six instances where subtraction is used:
- `I` can be placed before `V` (5) and `X` (10) to make 4 and 9
- `X` can be placed before `L` (50) and `C` (100) to make 40 and 90
- `C` can be placed before `D` (500) and `M` (1000) to make 400 and 900

## Problem
Given a string of Roman numeral, convert it to an integer.

Assume:
- Input is guaranteed to be within the range from 1 to 3999

# Example
```
Input: "III"
Output: 3
```

```
Input: "LVIII"
Output: 58
```

```
Input: "MCMXCIV"
Output: 1994
```

# Algorithm
Assuming that we are given a Roman numeral that is written from the largest to smallest, we can loop through each characters of the given Roman numeral string and add them together. To get the character's corresponding integer value, a pre-defined hashmap can be used (ie. `symbol_map`). 

However, there is one small modification required due to our special rule for subtraction. Since we are accepting a valid input all the time and the only case that this rule applies is when the previous character is "smaller" than the current character.

Let's take `XIV` to see what modification is required.
```
Loop 1:
    previous = None
    current = "X"
    result = 0 + 10 = 10

Loop 2:
    previous = "X"
    current = "I"
    result = 10 + 1 = 11

Loop 3:
    previous = "I"
    current = "V"
    previous < current
        result = 11 - 1 = 10  # undo the previous loop
        result = 10 + 5 - 1 = 14  # perform the subtraction
result = 14
```

Generally the subtraction step is described as the following:
```
result = result - previous + current - previous
       = result - 2 * previous + current
```
# Code
```python
def romanToInt(s):
    result = 0
    
    symbol_map = {
        "I": 1,
        "V": 5,
        "X": 10,
        "L": 50,
        "C": 100,
        "D": 500,
        "M": 1000
    }
    
    previous = ""
    for c in s:
        if previous:
            if symbol_map[previous] < symbol_map[c]:
                result -= 2 * symbol_map[previous]
                
        result += symbol_map[c]
        previous = c
    
    return result
```

# Analysis
Let's say the length of the givin input string is `n`.

The time complexity of this algorithm is `O(n)` as we traverse the string just once.

The space complexity here is `O(1)` as we only have a static mapping for the space.
