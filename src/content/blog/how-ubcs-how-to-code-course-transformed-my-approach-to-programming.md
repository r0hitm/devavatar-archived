---
title: "How UBC's How to Code Course Transformed My Approach to Programming"
description: "My experience with UBC's How to Code course and how it changed the way I approach programming problems now. The point isn't to learn a language. The point is to learn a programming paradigm that transcends language entirely."
pubDatetime: 2023-02-27T00:00:00.000Z
tags:
  - review
  - programming
---

## Table of Contents

[How to Code Simple Data](https://www.edx.org/course/how-to-code-simple-data) and [How to Code Complex Data](https://www.edx.org/course/how-to-code-complex-data) is a two part MOOC that focuses on teaching a systematic programming method rather than a programming language. This course is based on the book [How to Design Programs](https://htdp.org/2022-8-7/Book/index.html). I completed the course last month. In this blog post, I will write about my experience, and how it changed the way I approach programming problems now.

## My Experience

I was not a complete beginner when I took the course. However, I am still someone new in this field. In the first part of the course, namely Simple Data, I was bored in the beginning because it was very slow. And I am not alone here, most of the people that enrolled also mentioned this in the [OSSU](https://github.com/ossu/computer-science#community) Discord server. Furthermore, the course used some weird language (words from my past self here!) called Beginner Student Language which is a subset of Racket, a dialect of Lisp. This was my first roadblock, I felt that I would be wasting my time learning a totally another language that is not even used for building "real" software. But as someone more experienced told me as well as I soon found out for myself.

> HtC is taught in a "garbage" language on purpose -- specifically so you think more about learning the programming patterns -- and not about whether your code fits arbitrary measures of quality or standardization or can pass a PEP8 linter or has docstrings in the right places.
>
> The point isn't to learn a language. The point is to learn a programming paradigm that transcends language entirely.

And here's the things that I took home from the course:

- Brainstorm the problem on paper before writting any code

- Break the problem into smaller unit problems and solve those first

- Write tests before implementing the function. Get a sense of how's it supposed to function

- Don't try to write the entire program in one go, instead write in iterative steps improving with each iteration,

- Run the code as early and as often as possible,

- And working with abstractions to reduce code duplication,

- Local expressions for managing scope and hiding the code that should not be accessed by other parts of the code

- Use helper functions more! Seriously don't shy away from breaking a function further down.

In part 1, by the time I reached the final module I decided to redo it because I could not learn anything useful and forgot most of it as I rushed through the prior modules. Moreover, I took a long break mid-course to make the situation even worse. Second time around, I was practicing a lot of problems both from the book and the course's problem banks to internalize everything I was learning.

I soon fell in love with the language and the design recipes (using the words of the course). You may ask why? Well because in functional languages you cannot have state that other parts of the program may rely on that could break the entire application if something bad happens to the state. In functional programming, on the other hand, that is impossible because everything is immutable and only way to mutate something is to create a new immutable entity that has the desired modification. This makes the functions easy to test and write, and the whole language much more modular and resilient.

Plus, the fact that BSL has an inbuilt capability to write tests that makes the development a very pleasant experience than in most other languages. Sure, you can use a testing framework but it'll be slow and requires extra setup, and in most cases, somewhat different syntax.

## Conclusion

By the end of it, I have built programs to render BSTs, solve simple mazes, n-queens etc. including interactive programs like Space Invader as a final project for the part 1. Most of the things that I learned are quite easy to transfer to other programming languages especially the functional stuff. You can play the [Snake Game](https://avatar-hiro.itch.io/simple-snake) that I made for practice on itch.io.

If you are considering to take this course, I would say go for it! it is a goldmine. And if you are already enrolled and finding it boring, just hang on. It will get better (and harder) soon.

Overall, after completing this course I feel like an anime protagonist who has mastered a new power and can take on bigger demons, metamorphically speaking. I hope you'll too!
