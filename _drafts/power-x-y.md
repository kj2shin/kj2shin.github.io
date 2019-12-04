---
layout: post
title: Compute x<sup>y</sup>
date: 2019-12-03
categories: EPI
---

# Problem
In this post, we wish to calculate x<sup>y</sup>. This seems like a pretty simple problem to solve! Let's formulate the problem first:

> We want function `power(x, y)` that accepts two integer inputs `x` and `y` returns x<sup>y</sup>.

# Solution
Let's start with the simplest solution that we can come up with. By definition, x<sup>y</sup> is described as the following:

```
if y is positive:
    power(x,y) == x * x * ... * x, where there are y number of x's
if y is 0:
    power(x,y) == 1 
if y is negative:
    power(x,y) == 1/x * 1/x * ... * 1/x, where there are y number of (1/x)'s
```





# Conclusion

# References
