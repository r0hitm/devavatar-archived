---
title: "Lexical Scoping: The Essential Concept for All Programmers"
description: Lexical scoping is a fundamental concept in programming that is essential for understanding closures and writing efficient and effective code.
date: 2023-04-25
tags: 
  - closure
  - programming language scoping
---

Programming languages provide us with a set of tools to work with data, perform operations on it, and automate various tasks. Two of the most important concepts in programming are lexical scoping and closures. These concepts are closely related and provide us with powerful ways to write code that is concise, readable, and reusable. Understanding lexical scoping is essential for understanding closures, and both concepts are fundamental to writing efficient and effective code in many programming languages.

## What is Lexical Scoping?

The body of a function is evaluated in the environment where the function is **defined**, not the environment where the function is defined **called**. This is the lexical scoping.

Let's consider an example:

```python
x = 9              
def foo_env(y):
    x = 100         
    def foo(z):
        print(x + z)
    foo(y)

def bar(y):
    print(x + y)

def bar_call_env(y):
    x = 99
    bar(y)

foo_env(10)
bar_call_env(10)
```

In this Python code, we define a global variable `x` with a value of 9. The `foo_env` function defines a local variable `x` with a value of 100, and a nested function `foo` that accesses the value of `x` and adds it to its parameter `z`. The `foo_env` function calls the `foo` function with an argument of 10, resulting in the value of `x` (100 in its lexical environment) being added to 10 and printed, resulting in an output of 110. The `bar` function is defined in a global environment and simply adds the value of `x` in that environment to its parameter `y` and prints the result. When called with an argument of 10, it adds the value of `x` in the global environment (9) to 10 and prints the result, resulting in an output of 19. Both functions `foo` and `bar` are essentially the same. However, they differ in where they were defined. `foo` is defined in a local environment inside of `foo_env` as a nested function and called, and `bar` is defined in a global environment. This demonstrates how functions use the values of variables that are in the same environment where the function is defined, which is a key feature of lexical scoping.

**Sidenote**: The opposite of lexical scoping is dynamic scoping where the environment when the function call is made is used.

### Why Lexical Scope?

There are many good reasons for having lexical scope

1. The meaning of a function does NOT depend on local varaible names used and one can go ahead rename the local variables without affecting anything.
    
2. Functions can be type-checked and reasoned about where defined. This makes testing much more easier.
    
3. Closures require lexical scoping, so...
    

## What are Closures?

Now, the question arises how does the language implementation know which free variables to use? The answer is *function closure* or just *closure.* While the code itself can have free variables (variables that are not bound inside the code so they need to be bound by some outer environment), the closure carries with it an environment that provides all these bindings. So the closure overall is “closed” — it has everything it needs to produce a function result given a function argument.

The creation of a closure varies greatly depending on the language implementation. For instance, in Standard ML, a closure is formed when a function is evaluated. On the other hand, in the majority of mainstream programming languages that have first-class functions (ie functions can be passed as arguments, returned from other functions, or assigned to variables), a closure can be created by returning a nested inner function from an outer function. This results in the local environment of the outer function enclosing the inner function, forming a closure.

```python
# A simple closure example in python
def outer_func(msg):
    msg_3_times = msg * 3

    def inner_func():
        # msg_3_times is a free variable here
        # due to lexical scoping, inner_func() can access msg_3_times
        print(msg_3_times)

    # following line returns inner_func() as a closure
    # inner_func() environment is preserved even after outer_func() has finished executing
    return inner_func


# hi_func and bye_func are closures defined
# with different msg values
hi_func = outer_func("Hi")
bye_func = outer_func("Bye")

hi_func()  # prints Hi
bye_func()  # prints Bye
```

## Why are Closures a big deal?

Closures are a big deal because:

1. they allow you to create functions with persistent state that can be accessed by other functions.
    
2. they can be used to effectively abstract the implementation details and prevent polluting the global environment, as anything that a function needs can be enclosed in a closure.
    

This makes it possible to write code that is more modular and reusable. Some common uses include creating decorators, implementing callbacks, and creating factory functions. They are a powerful tool for writing efficient and effective code in many programming languages. A simple example:

```python
# Function that returns a closure that adds a suffix to the word
def make_suffixer(suffix):
    def suffixer(word):
        return word + suffix

    return suffixer


# Create two suffixers
chan_suffixer = make_suffixer("-chan")
kun_suffixer = make_suffixer("-kun")

# Use the suffixers
print(chan_suffixer("Sakura"))  # prints Sakura-chan
print(kun_suffixer("Sakura"))  # prints Sakura-kun
print(chan_suffixer("Naruto"))  # prints Naruto-chan
print(kun_suffixer("Naruto"))  # prints Naruto-kun
```

Now, go ahead and use your new powers of lexical scoping and closures to create amazing code...

![](https://media.tenor.com/Mq6YIZSmU_EAAAAd/yoda-star-wars.gif align="center")