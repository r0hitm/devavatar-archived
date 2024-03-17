---
title: Common misconceptions and unintuitive understanding of conditional statement
description: Discrete Math is a subject every programmer should study to solidify their logic, critical thinking and reasoning abilities. Plus the topics are one-to-one applicable in the programming! Learn how people misunderstand how conditional statements behave
pubDatetime: 2024-03-18T16:22:13.660Z
draft: true
tags:
  - discrete-math
---

; making sense of conditional statements
; conditional statements: do you really know them as well as you think you do?
; math of conditional statements: clearing all the common misconceptions & confusions
; modus ponen and modus tollen

Conditional statements are very ubiquitous in the world of programming. Every language has them, some even have several versions of them with different syntax. A basic _if something happens do something else_, and they may appear straightforward and easy. In fact, so easy that leads to many logical errors in the programs. In this blog post, I will go over the logic and math behind, hopefully in an intuitive way for you, to make sense of conditional statements.

## Table of Contents

## Definition

In principle a conditional [statements](<https://en.wikipedia.org/wiki/Statement_(logic)>) is pretty straightforward, and we seem to have a rather intuitive understanding of it, and most programming language have a syntax that is similar to this,

```
if p
then q
```

That is, if the condition or statement `p` is true then all the statements (`q`s) will be executed, otherwise they won't.

Now question, what do you think the negation or negative of the above conditional is?
If you thought `if not p then q` then, like most people, you are wrong! In fact, the negation of the above statement is NOT a conditional at all! It is an and statement

```
p and not q
```

And did you know that you can convert that statement into an `and` statement? It is `not p or q`. This is how conditional logic is implemented in the hardware. I'd argue that because of the HLL we take our day-to-day understanding of a conditional for granted and apply it to our logical reasoning (and make logical mistakes because of it).

You might be thinking wait, what? How? The reason is that in informal language, simple conditionals are often used to mean biconditionals (both `p` and `q` are true or both `p` and `q` are false)

## Truth Table

| p   | q   | if p then q | comment         |
| --- | --- | ----------- | --------------- |
| T   | T   | T           |                 |
| T   | F   | F           |                 |
| F   | T   | T           | true by default |
| F   | F   | T           |                 |

---

Final checklist

- [ ] Put images into `src/assets/images/`
- [ ] OG image should be 1200 x 640 px
