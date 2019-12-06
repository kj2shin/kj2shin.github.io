---
layout: post
title: Compute x to the power of y
date: 2019-12-03
categories: primitive-types, algorithm
---

# Problem
In this post, we wish to calculate $$x^y$$. This seems like a pretty simple problem to solve! Let's formulate the problem first:

> We want function `power(x, y)` that accepts two integer inputs `x` and `y` returns $$x^y$$.

Let's assume that there is no overflow and underflow.

# Solution
Let's start with the simplest solution that we can come up with. By definition, $$x^y$$ is described as the following:

```
if y is positive:
    power(x,y) == x * x * ... * x, where there are y number of x's
if y is 0:
    power(x,y) == 1 
if y is negative:
    power(x,y) == 1/x * 1/x * ... * 1/x, where there are y number of (1/x)'s
```

Considering `y >= 0` case only, one can write a such program:

```python
def power(x,y):
    result = 1.0
    for i in range(y):
        result *= x
    return result
```

The time complexity of such algorithm is `O(y)` since we perform `y-1` multiplications. Can we do better? Let's look at some mathematical properties of exponentials.

## Exponential Properties
- Product of like bases: \$$a^ma^n = a^{m+n}$$
- Power to power: \$$(a^m)^n = a^{mn}$$

Let's look at the second property (_Power to power_) and see how it can reduce the algorithm performance. To calculate $$1.1^{20}$$ we would be require to perform 19 calculations but using such property, we can make the following change $$(1.1^2)^10$$ and this will require us to perform only 10 calculations in total! We can do better by computing $$1.1^3$$, $$1.1^4$$, and so on.

One approach we can take is using a recursive algorithm. For even `y`, we take `power(x,y) = power(x, y/2) * power(x, y/2)` and for off `y`, we take `power(x,y) = x * power(x, y/2) * power(x, y/2)`, and for our base case, `power(x,1) = x`.

```python
def power(x,y):
    if y == 0:
        return 1

    temp = power(x, int(y/2))
    if y % 2 == 0:
        return temp * temp
    else:
        return x * temp * temp
```

Let's do better by using binary expression.
```python
def power(x, y):
    result, power = 1.0, y
    if y < 0:
        power, x = -power, 1.0 / x
    while power:
        if power & 1:
            result *= x;
        x, power = x * x, power >> 1
    return result
```

# Conclusion

# References
- https://studentsuccess.asu.edu/sites/default/files/exponentialandlogrithmicproperties.pdf
