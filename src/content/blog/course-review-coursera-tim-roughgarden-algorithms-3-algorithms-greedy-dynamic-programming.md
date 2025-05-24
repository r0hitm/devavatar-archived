---
pubDatetime: 2025-05-24T07:02:20.725Z
title: "Course Review: Tim Roughgarden's Algorithms: Greedy Algorithms, Minimum Spanning Trees, and Dynamic Programming"
tags:
  - review
  - algorithms
  - computer-science
  - coursera
description: "Review of third course of the Algorithms specialization - greedy algorithms and dynamic programming - and its prerequisites."
---

[Greedy Algorithms, Minimum Spanning Trees, and Dynamic Programming](https://www.coursera.org/learn/algorithms-greedy/home/welcome) (henceforth refered to as Algo3) is the third course in the Algorithms Specialization (on Coursera) and in OSSU Core Theory curriculum. I finished the course yesterday, and as continuation for previous (prereq) courses (check [Algo1 review here](/posts/course-review-coursera-tim-roughgarden-algorithms-2-graph-data-structure) and [Algo2 review here](/posts/course-review-coursera-tim-roughgarden-algorithms-1-divide-and-conquer)), this is my personal review of the course.

## Table of contents

## Module 1 - Greedy Algorithms and Minimum Spanning Trees

**Difficulty: ★★☆☆☆ (Not Difficult)**

This course starts with Greedy algorithms - basically a paradigm in which solves problems by making the best choice at each step, hoping to find the overall optimal solution, without considering future consequences. It was very easy to understand the principles of greedy theoritically, and for the most part proposing a greedy heuristics, is very easy. However, proving correctness is hard. It is VERY easy to get a greedy algorithm. Let me repeat that most greedy heuristics that we may come up with intially will be wrong, and extra care needs to be taken while designing greedy. Proof of correctness is hard, usual approaches are using induction, exchange argument or whatever works 😅. The course discusses some applications in scheduling algorithms and caching problem.
(Sidenote: I found this [video here](https://youtu.be/O2tV9q6784k?si=5zvngeq4hjoDPZqK) on CPU scheduling, and it was amazing.)

Then the course wrapped up by discussing MST and Prim's algorithm. Again, my previous homework in Discrete Math came in handy, and I barely experienced any difficulty here. However, one thing to note is that an optimal implementation of Prim's algorithm uses an Indexed Priority Queue (IPQ), which the course does not discuss. Essentially a love child of hashing and a priority queue that also provides operations to update and delete keys in logarithmic time. I implemented an IPQ from scratch for Prim's implementation in this week's homework.

## Module 2 - Kruskal, Union-Find, and Clustering Algorithm

**Difficulty: ★★★☆☆ (Moderate)**

This module covers another way to compute MSTs, namely Kruskal's Algorithm, and the Union-Find data structure, which is used to implement Kruskal's for getting constant-time cycle lookups when building the MST. The challenging part for me was getting the hang of the implementation using Union-Find; otherwise, this one was relatively easy. And I think I fell in love with Union-Find xD - who could imagine such versatility with just two basic operations.

The latter half discussed clustering algorithms and how they are similar to Kruskal's. Fun fact: It is also used in unsupervised learning to identify patterns in unlabeled data. The intuition follows directly from the way Kruskal's algorithm builds an MST. The course touches on k-means clustering but goes in-depth on max-spacing k-clustering – i.e., cluster the points into k groups such that the minimum distance between any two points in different clusters is as large as possible (side note: this way of measuring distance is also called single-link clustering). Guess what we use? Yup, the greedy approach from Module 1! This was a moderately challenging module because one of the homework problems involved doing Hamming clustering on a very, very big graph. So big, in fact, that with the usual approach for k-max clustering, I was running out of memory. After some optimizations and a clever trick to avoid direct comparisons of points, I managed to run it in under 10 minutes! Took me a week!

## Module 3 - Huffman Codes, Independent Set using Dynamic Programming

**Difficulty: ★★★★☆ (Challenging)**

This module discusses Huffman coding to produce prefix-trees, and using variable-length encoding to reduce the bit count based on letter usage frequency in some language. TLDR: think of encodings as a tree; then we use the letter frequency to construct a binary tree (using a greedy approach) such that higher frequency letters are at or near the root. I'll tease you with this: a divide and conquer approach produces a sub-optimal solution.

Then the course starts off with dynamic programming using Weighted-Independent Set graph problem. This is a programming paradigm which also helps us solve problems where other approaches will either be too slow or impractical. Note, the name, dynamic programming is one of many badly named things in computer science. Think of it more like "Memoized/Tabulated Brute-force search". The gist is we reason from an optimal solution's properties to identify a recurrence and subproblems that we need to solve in order to solve the original problem, then the most tricky part is solving the smaller subproblems quickly to compute the bigger original problem <- this is not easy to come up with good subproblems or what property of a hypothetical optimal solution we should exploit. As we go through each subproblem we are memoizing all the work so that we don't do extra work on the overlapping subproblems. Iterative with a tabulation array is the most common approach ("bottom-up"), however, recursion with memoization ("top-down") is also used depending upon the space and time constraints and the problem at hand.

## Module 4 - Knapsack Problem, Sequence Alignment, Optimal Binary Search Tree

**Difficulty: ★★★★★ (Very Challenging)**

The final module continues with dynamic programming, using the problems in the subheading of this section. I won't go into detail about those here. I'll mention that this module was the hardest, especially the optimal binary search tree - I still don't think I understand it completely. The final homework involved implementing the knapsack problem; the second part of the problem was on a very large input size. The iterative approach practically ran out of memory and was super slow. Taking the hint, I developed a recursive version, which took me a couple of attempts to get the memoization right, before it was able to run within 10 seconds.

## Conclusion

Overall, this was a great course, and I learned a lot. However, I need to practice more dynamic programming problems, which I will do alongside the next and final course of this specialization: [Shortest Paths Revisited, NP-Complete Problems and What To Do About Them](https://www.coursera.org/learn/algorithms-npcomplete).

<img width=300 height=200 src="https://media1.tenor.com/m/8b2-2a17wIAAAAAC/wow-world-of-warcraft.gif" alt="kobayashi glasses matrix anime gif" />
