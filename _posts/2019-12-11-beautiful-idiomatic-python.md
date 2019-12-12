---
layout: post
title: Transforming Code into Beautiful, Idiomatic Python
date: 2019-12-11
categories: python
todo: 
[ ] : Run code snippets and see it it works, put output in a comment
---

# Introduction
I accidentally came across to this video that Raymond Hettinger presented at PyCon US 2013. Even though this was back 6 years in the past, but I still managed to learn new things from it. In this talk, Raymon focuses on these three aspects:

1. Replace traditional index manipulation with Python's core looping idioms
2. Learn advanced techniques with `for-else` caluses and the two argument form of `iter()`
3. Improve your craftmanship and aim for clean, fast, idiomatic Python code

Note: the original presentation was presented in Python 2 but I am putting Python 3 version of it here.

# List
## Looping over a range of numbers
```python
for i in [0, 1, 2, 3, 4, 5]:
    print(i**2)
```

**Better**
```python
for i in range(6):
    print(i**2)
```

Both of the code above performs the same task of "printing squared term of numbers range from 0 to 5 (included)". However, later performs better as it utilizes an iterator so it does not create extra memory space.

## Looping over a collection
```python
colors = ['red', 'green', 'blue', 'yellow']

for i in range(len(colors)):
    print(colors[i])
```

**Better**
```python
colors = ['red', 'green', 'blue', 'yellow']

for color in colors:
    print(color)
```

If Python is not your first programming language, you probably learned to use indices to loop through an array; however, in Python, we can simply loop through by element. This is more of a `foreach` loop than `for` loop.

## Lookping backwards
Let's say we want to print the above `colors` from backwards.
```python
for i in range(len(colors)-1, -1, -1):
    print(colors[i])
```

**Better**
```python
for color in reversed(colors):
    print(color)
```

Using a simple `reversed()` function, we can loop through backwards.

## Looping over a collection and indicies
What if we are interested with both item and index?

```python
for i in range(len(colors)):
    print(f"{i} --> {colors[i]})
```

**Better**
```python
for i, color in enumerate(colors):
    print(f"{i} --> {color}")
```

Using `enumerate()`, we can access both item and index at the same time.

## Looping over two collections
```python
names = ['raymond', 'rachel', 'matthew']
colors = ['red', 'green', 'blue', 'yellow']
```

```python
# calculate minimum length between two arrays and loop through only this amount
# to prevent index out of range error
n = min(len(names), len(colors))

for i in range(n):
    print(names[i], '-->', colors[i])
```

**Better**
```python
for name, color in zip(names, colors):
    print(name, '-->', color)
```

With `zip()`, we can loop through two collections together at the same time, and it will take care of length mis-match by looping through only the shorter amount.

## Looping in sorted order
Using `sorted()`, we can sort Python list.

```python
for color in sorted(colors):
    print(color)
```

### Sorting reversed order
By passing in optional argument `reverse=True`, the sorting can be done in a reversed manner.

```python
for color in sorted(colors, reverse=True):
    print(color)
```

### Custom sort order
We can also specify the comparison by providing `key` optional argument. By default, the element gets compared directly.

```python
print(sorted(colors, key=len))
# ['red', 'blue', 'green', 'yellow']
```

# Iterator
## Call a function until a sentinel value
A sentinel value (or a flag value) is a special value in the context of an algorithm which uses its presence as a condition of termination, typically in a loop or recursive algorithm.

Let's consider a case when we want to loop through a file line by line until it hits an empty line.

```python
blocks = []
while True:
    block = f.read(32)
    if block == '':
        break
    blocks.append(block)
```

**Better**
```python
blocks = []
for block in iter(partial(f.read, 32), ''):
    blocks.append(block)
```

`iter()` returns an iterator object where it acceps optional parameter (`sentinel`) which is used to stop the iteration when the value returned is equal to sentinel.

## Distinguishing multiple exit points in loops
Let's consider a problem of finding a target value in a sequence. We can easily perform such calculation using an external flag item like `find` in the below example.

```python
def find(seq, target):
    for i, value in enumerate(seq):
        if value == target:
            found = True
            break
    if not found:
        return -1
    return i
```

**Better**
```python
def find(seq, target):
    for i, value in enumerate(seq):
        if value == target:
            break
    else:
        return -1
    return i
```

In here `else` works like a `no break` action where if the look did not break out, the one under `else` block gets executed. This provides a tightly bound relationship towards the loop compared to using a flag variable.

# Dictionary
## Dictionary Skills
- Mastering dictionaries is a fundamental Python skill
- They are fundamental for expressing relationships, linking, counting, and grouping.

## Looping over dictionary keys
```python
d = {'matthew': 'blue', 'rachel': 'green', 'raymond': 'red'}

for k in d:
    print(k)
```

By default, `for ... in` with dictionary loops over the `keys`. We can also use `keys()` to extract dictionary keys. Finally, we can use `dictionary comprehension` to perform similar.

```python
for k in d.keys():
    if k.startswith('r'):
        del d[k]

d = {k: d[k] for k in d if not k.startswith('r')}
```

## Looping over a dictionary keys and values
```python
for k in d:
    print(k, '-->', d[k])
```

**Better**
```python
for k, v in d.items():
    print(k, '-->', v)
```

The later performs better as the first method requires to re-hash every key and do a lookup.

## Construct a dictionary from pairs
```python
names = ['raymond', 'rachel', 'matthew']
colors = ['red', 'green', 'blue']

d = dict(zip(names, colors))
# d == {'raymond': 'red', 'rachel': 'green', 'matthew': 'blue'}
```

## Counting with dictionaries
```python
colors = ['red', 'green', 'red', 'blue', 'green', 'red']

d = {}
for color in colors:
    if color not in d:
        d[color] = 0
    d[color] += 1
```

**Advanced**
```python
from collections import defaultdict
d = defaultdict(int)
for color in colors:
    d[color] += 1
```

Similarly we can perform `defaultdict` with `list` values too.

```python
names = ['raymond', 'rachel', 'matthew', 'roger',
         'betty', 'melissa', 'judith', 'charlie']

d = {}
for name in names:
    key = len(name)
    if key not in d:
        d[key] = []
    d[key].append(name)
```

**Advanced**
```python
d = defaultdict(list)
for name in names:
    key = len(name)
    d[key].append(name)
```

## Is a dictionary popitem() atomic?
What is atomic?
```python
d = {'matthew': 'blue',
     'rachel': 'green',
     'raymond': 'red'}

while d:
    key, value = d.popitem()
    print(key, '-->', value)
```


## Linking dictionaries

```python
import os, argparse

defaults = {'color': 'red', 'user': 'guest'}

parser = argparse.ArgumentParser()
parser.add_argument('-u', '--user')
parser.add_argument('-c', '--color')
namespace = parse.parse_args([])
command_line_args = {k:v for k, v in vars(namespace).items() if b}
```

```python
"""
The common approach here allows you to use defaults at first, then override them
with environments and then finally with command line arguments.
"""
d = defaults.copy()
d.update(os.environ)
d.update(command_line_args)
```

**Better**
```python
d = ChainMap(command_line_args, os.environ, defaults)
```

# Improving Clarity
- Positional arguments and indicies are nice
- Keywords and names are better
- The first way is convenient for the computer
- The second corresponds to how human's think

## Clarify function calls with keyword arguments
```python
twitter_search('@obama', False, 20, True)
```

**Better**
```python
twitter_search('@obama', retweets=False, numtweets=20, popular=True)
```

## Clarify multiple return values with named tuples
```python
doctest.testmod()  # (0, 4)
```

**Better**
```python
TestResults = namedtuple('TestResults', ['failed', 'attempted'])

doctest.testmod() # TestResults(failed=0, attempted=4)
```

## Unpacking Sequence
```python
p = ['Raymond', 'Hettinger', 0x30, 'python@example.com']

fname = p[0]
lname = p[1]
age = p[2]
email = p[3]
```

**Better**
```python
fname, lname, age, email = p
```

## Updating multiple state variables
```python
def fibonacci(n):
    x = 0
    y = 1
    for i in range(n):
        print(x)
        t = y
        y = x + y
        x = t
```

**Better**
```python
def fibonacci(n):
    x, y = 0, 1
    for i in range(n):
        print(x)
        x, y = y, x + y
```

This performs state level update so the new `x` and `y` values get updated with using old `x` and `y`.

## Tuple packing and unpacking
- Don't under-estimate the advantages of updating state variables at the same time
- It eliminates an entire class of errors due to out-of-order updates
- It allows high level thinking: "chunking"

## Simultaneous state updates
```python
tmp_x = x + dx * t
tmp_y = y + dy * t
tmp_dx = influence(m, x, y, dx, dy, partial='x')
tmp_dy = influence(m, x, y, dx, dy, partial='y')

x = tmp_x
y = tmp_y
dx = tmp_dx
dy = tmp_dy
```

**Better**
```python
x, y, dx, dy = (x + dx * t,
                y + dy * t,
                tmp_dx = influence(m, x, y, dx, dy, partial='x'),
                tmp_dy = influence(m, x, y, dx, dy, partial='y'))
```

### Efficiency
- An optimization fundamental rule
- Don't cause data to move around unnecessarily
- It takes only a little care to avoid $O(n^2)$ behaviour instead of linear behaviour


## Concatenating strings
```python
names = ['raymond', 'rachel', 'matthew', 'roger',
         'bettey', 'melissa', 'judith', 'charlie']

s = names[0]
for name in names[1:]:
    s += ', ' + name
print(s)
```

**Better**
```python
print(', '.join(names))
```

## Updating sequence
```python
names = ['raymond', 'rachel', 'matthew', 'roger',
         'bettey', 'melissa', 'judith', 'charlie']

del names[0]
names.pop(0)
names.insert(0, 'mark')
```

**Better**
```python
names = deque(['raymond', 'rachel', 'matthew', 'roger',
               'bettey', 'melissa', 'judith', 'charlie'])

del names[0]
names.popleft()
names.appendleft('mark')
```


# Decorators and Context Managers
- Helps separate business logic from administrative logic
- Clean, beautiful tools for factoring code and improving code reuse
- Good naming is essential
- Remember the Spiderman rule:
    > With great power, comes great responsivility!

## Using decorators to factor-out administrative logic
```python
def web_lookup(url, saved={}):
    if url in saved:
        return saved[url]
    page = urllib.urlopen(url).read()
    saved[url] = page
    return page
```

**Better**
```python
@lru_cache
def web_lookup(url):
    return urllib.urlopen(url).read()
```
(https://orbifold.xyz/local-lru.html)

## Factor-out temporary contexts
```python
old_context = getcontext().copy()
getcontext().prec = 50
print(Decimal(355)/Decimal(113))
setcontect(old_context)
```

**Better**
```python
with localcontext(Context(prec=50)):
    print(Decimal(355)/Decimal(113))
```

## How to open and close files
```python
f = open('data.txt')
try:
    data = f.read()
finally:
    f.close()
```

**Better**
```python
with open('data.txt') as f:
    data = f.read()
```

## How to use locks
```python
lock = threading.Lock()

lock.acquire()
try:
    print('Critical section 1')
    print('Critical seciton 2')
finally:
    lock.release()
```

**Better**
```python
with lock:
    print('Critical section 1')
    print('Critical section 2')
```

## Factor-out temporary contexts
```python
try:
    os.remove('somefile.tmp')
except FileNotFoundError:
    pass
```

**Better**
```python
from contextlib import suppress

with suppress(FileNotFoundError):
    os.remove('somefile.tmp')
```

---
```python
with open('help.txt', 'w') as f:
    oldstdout = sys.stdout
    sys.stdout = f
    try:
        help(pow)
    finally:
        sys.stdout = oldstdout
```

```python
with open('help.txt', 'w') as f:
    with redirect_stdout(f):
        help(pow)
```

# Concise expressive one-liners
Two conflicting rules:
1. Don't put too much on one line
2. Don't break atoms of thought into subatomic particles

Raymond's rule:
- One logical line of code equals one sentence in English.

## List comprehensions and Generator expressions

```python
result = []
for i in range(10):
    s = i ** 2
    result.append(s)
print(sum(result))
```

```python
print(sum([i**2 for i in range(10)]))
```

**Best**
```python
print(sum(i**2 for i in range(10)))
```

# Reference
- https://github.com/JeffPaine/beautiful_idiomatic_python
- https://www.youtube.com/watch?feature=player_embedded&v=OSGv2VnC0go

