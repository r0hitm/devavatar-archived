---
title: Understanding Soundness and Completeness in Programming Languages
description: In this blog post, I'll share what I learned about the concept of soundness and completeness while completing the MOOC Programming Languages, Part B.
date: 2023-04-30
tags: 
  - computer science
  - programming language
---

In this blog post, I'll share what I learned about the concept of soundness and completeness while completing the MOOC [Programming Languages, Part B](https://www.coursera.org/learn/programming-languages-part-b).

## What is Static Checking?

Static checking is a program analysis technique that is used to check the source code for errors without running it. It helps to detect syntax errors, type errors, and other semantic errors before the program is executed. Different programming languages may perform static checking differently, and some languages may not perform it at all. However, tools like linters can be used to perform static checking in languages that lack it.

The primary goal of static checking is to reject incorrect programs. For instance, a type system in a statically typed language is designed to prevent certain actions, such as arithmetic addition with strings or division by zero, from occurring. A correct type system can catch these kinds of errors before the program is executed.

Note that the concept of static checking also applies to dynamic languages that typically perform some tests during run-time. In programming language design, it is essential to ensure that static checking is sound and complete, i.e., it does what it is designed to do.

## What is Soundness?

A type system is said to be sound if all well-typed programs are guaranteed to be correct, i.e., the program type-checks. In other words, a incorrect program will not type check.  
The implications of this property are significant: it means that you can trust the compiler when it gives you an error message about your code. If your program compiles without any errors, then you can be darn confident that it won't crash at run-time!

## What is Completeness?

Completeness is a property of a programming language that ensures that all possible (correct) programs can be written in the language. In other words, it means that if you have an algorithm and want to express it in your programming language, then you can do so without any problems.

It implies that all of the correct programs can be accepted by the type-checker and there will not be any *false positives* (positive that is the type-checker claims that there are *some errors* in the input program aka it's incorrect).

## Trade-off between Soundness and Completeness

  
It is impossible for a programming language to be both sound and complete, as there is always a tradeoff between the two. Most programming language designs prioritize soundness over completeness, with the exception of C and C++ due to weak typing. The reason for this tradeoff can be attributed to undecidability, a fundamental concept in computer science and mathematics that has significant implications for programming language and algorithm design.

While a detailed discussion of undecidability is beyond the scope of this blog post, it is worth noting that it makes it impossible to implement a static checker that is sound, complete, and always terminates, for any program in any programming language. Therefore, in practice, a balance is struck between the desire for soundness and completeness and the need for static checkers to terminate.

## Bonus: Weak Typing

Weak typing is a property of programming languages where the type system is unsound but complete. In weakly typed languages like C and C++, the burden of type safety is shifted to the programmer. Although the programs must pass static checking, they can still potentially "set the computer on fire" when executed due to the lack of dynamic checks. The ease of language implementation and improved performance are two main reasons why weak typing is used. However, this comes at the cost of increased responsibility on the programmer to ensure type safety. Additionally, the lower-level nature of these languages means that the compiler cannot always insert information like array sizes, which limits its ability to do thorough checks.

![](https://media.tenor.com/ViTJnMMosLQAAAAC/anime-typing.gif align="center")