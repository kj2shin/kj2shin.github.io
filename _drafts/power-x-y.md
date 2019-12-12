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

By definition, $$x^y$$ is described as the following:

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

The time complexity of such algorithm is `O(y)` since we perform `y-1` multiplications. Hence, the algorithm will get slower as we increase the value of `y`. Can we do better? Let's look at some mathematical properties of exponentials.

## Exponential Properties
- Product of like bases: \$$a^ma^n = a^{m+n}$$
- Power to power: \$$(a^m)^n = a^{mn}$$

Let's look at the second property (_Power to power_) and see how it can reduce the algorithm performance. To calculate $$1.1^{20}$$ we would be require to perform 19 calculations. But using this exponential property, we can modify the equation to the following: $$(1.1^{10})^2$$ and this will require us to perform only 10 calculations in total! Let's expand it further to the following form.
$$
(1.1^{10})^2 = (((1.1^5))^2)^2 = ((1.1 * (1.1^2)^2)^2)^2
$$
Now, we have reduced the number of multiplication required from 19 -> 5.

So what is the pattern here? **Recursion**! The pattern here looks like the following:

$$ 
pow(a, n) =
    \begin{cases}
        1,                  & \text{$n = 0$} \\
        pow(a, n/2)^2,      & \text{if $n$ is even}\\
        pow(a, n/2)^2 * a,  & \text{if $n$ is odd}
    \end{cases}
$$

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
