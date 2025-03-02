---
title: "Course Review: Tim Roughgarden's Algorithms: Divide and Conquer, Sorting and Searching, and Randomized Algorithms"
description: "My review of Tim Roughgarden's Coursera algorithms class covering divide-and-conquer techniques, sorting algorithms, and randomized approaches"
pubDatetime: 2025-02-20T15:39:32.431Z
tags:
  - review
  - algorithms
  - computer-science
  - coursera
---

[Divide and Conquer, Sorting and Searching, and Randomized Algorithms](https://www.coursera.org/learn/algorithms-divide-conquer)
is the first course in [OSSU Core Theory](https://github.com/ossu/computer-science?tab=readme-ov-file#core-theory). I completed
the course between December 22, 2024 and February 15, 2025. This review covers each module's content, difficulty level, and prerequisites to help you gauge your readiness for the course.

## Table of Contents

## Module 1: Introductions, Karatsuba Multiplication, and Merge Sort

**Difficulty: ★☆☆☆☆ (Easy)**

This introductory module covers the course motivation, **Karatsuba multiplication** - faster algorithm to multiply two numbers than the usual grade-school multiplication, and **Merge sort** with its asymptotic analysis. While Karatsuba multiplication was new, it was relatively straightforward to understand. The merge sort portion was familiar to me, so it also didn't take me much effort. If, however, you are new to merge sort, expect getting confused by the recursive nature of the algorithm. The trick is to focus on the merge step, aka when we combine the recursively sorted subarrays (you assume they are already sorted).

## Module 2: Divide and Conquer

**Difficulty: ★★★☆☆ (Moderate)**

This module explores the "Divide-and-Conquer" paradigm through:

- **Array inversion** problem using modified merge sort
- **Strassen's matrix multiplication algorithm**: This one was amazing! Like people had given up on making the matrix multiplication faster (O(n^3)), and then Strassen came up with a way to do it in O(n^2) time. The key insight was to perform the carefully chosen 7 products and add/subtract them. I won't spoil the fun, but it's a must-learn algorithm.
- **Closest pair of points in a plane problem**: This was the most challenging part of the module. You have some points in a 2D plane, and you need to find the closest pair of points. Here again, we divide the problem, here a plane, into smaller and smaller parts, find the closest pair in each part, and then combine the results. And a key insight during the combination is that we only need to check the points that are within a certain distance from the dividing line. This reduces the number of points we need to consider drastically from n^2 to nLog(n).
- [**The Master Method**](<https://en.wikipedia.org/wiki/Master_theorem_(analysis_of_algorithms)>) for solving recurrence relations for divide and conquer algorithms. This is more math-y part of the paradigm, where we write an recurrence relation for the recursive algorithm, mostly in the form of T(n) = aT(n/b) + O(n^d), and then use the Master Method to find the time complexity of the algorithm. Here, a = number of subproblems at each step, b = factor by which the input size is reduced, and d = exponent in the running time of the "combine" step. How these variables are related depends on the implemenation, and we get one of the three cases of the Master Method:
  - Case 1: If a = b^d, then the time complexity is O(n^d * log(n)); *number of subproblems at each step is equal to the factor by which the input size is reduced\*
  - Case 2: If a < b^d, then the time complexity is O(n^d); _number of subproblems at each step is less than the factor by which the input size is reduced - more work is done towards the root of the recursion tree_
  - Case 3: If a > b^d, then the time complexity is O(n^log*b(a)); \_number of subproblems at each step is more than the factor by which the input size is reduced - more work is done towards the leaves of the recursion tree*

## Module 3: Quick Sort

**Difficulty: ★★★★☆ (Challenging)**

This module introduces QuickSort, arguably the most practical sorting algorithm in use today. Its elegance lies in its simplicity and in-place sorting capability. This is an randomized algorithm, meaning each run of the algorithm can have a different running time. The worst-case time complexity is O(n²), the expected and most common average running time of O(n log n). And unlike merge sort, quicksort does not have space overhead as the sorting happens in-place. Without going into the details, here's a high-level pseudocode for QuickSort:

```
QuickSort (array A, length n):
    if n = 1 return;
    p = ChoosePivot(A,n)
    partition A around p
    recursively sort 1st part
    recusively sort 2nd part
```

Key insight lies in the choice of pivot element. _We let the algorithm pick a pivot element uniformly at random_, then partition the array around the pivot: elements less than the pivot to the left, and elements greater than the pivot to the right. This is done in linear time O(n). The algorithm then recursively sorts the two partitions. And we're done! Notice the simplicity? The elegance? THE BEAUTY?! 😍

The mathematical analysis and proof was challenging. Prerequisites mathematical knowledge of Probability and expectation analysis is required. The course has a couple refresher videos on the topics used in the analysis, but it's better to have a good understanding of the topics beforehand.

Another interesting mathematical fact is that it is impossible to sort an array faster than O(n log n) using a comparison-based sorting algorithm.

## Module 4: Linear Time Selection and Graph Cuts

**Difficulty: ★★★★★ (Very Challenging)**

The module starts with selecting i-th order statistics, or in plain english i-th element of an N-element sequence sorted in ascending order. The randomized approach builds on quicksort and takes linear time to select the i-th order statistics. The intuition is pretty easy to understand, we just run quicksort but instead of sorting, we keep deleting the elements around the pivot unless the pivot lands at the i-th position in the statistics, or we don't find it. (**Trivia**: N/2 order statics is median element of an N-array). There is a optional discusion of an deterministic algorithm that also takes linear time to select the i-th order statistics, however I didn't go through it.

[Graph](<https://en.wikipedia.org/wiki/Graph_(abstract_data_type)>) concepts came easily to me thanks to my prior study of Susanna Epp's Discrete Math. The basic stuff like adjacency lists and matrices was straightforward. But then came the [Minimum cut](<https://en.wikipedia.org/wiki/Cut_(graph_theory)>) problem - whew! This one knocked me down for a while. The goal is simple: split a graph's vertices into two groups while cutting through as few edges as possible.

The solution, [Karger's algorithm](https://en.wikipedia.org/wiki/Karger%27s_algorithm), is fascinating but tricky. You keep randomly picking edges and merging their endpoints until only two vertices remain. Count the edges between them and that's your cut! Simple to describe, but implementing it for the homework (with a 200-vertex graph) took me two solid weeks of head-scratching and debugging.

The math behind it is pretty intense too. Running time is O(n²m) where n is the number of vertices and m is the number of edges. The success probability is only 1/n per run, but you can boost your confidence by running it multiple times. Despite these seemingly poor bounds, it actually outperforms naive approaches like randomly picking vertex pairs. The beauty of randomized algorithms, I guess!

## Conclusion

This course provides a solid foundation in algorithm design and analysis. The difficulty progressively increases, with the final module being particularly challenging. If you're planning to take this course, I recommend:

1. Complete a discrete mathematics course first
2. Have solid programming fundamentals
3. Be comfortable with mathematical proofs
4. Understand basic probability theory

This is primarily a theoretical course - you'll spend more time analyzing algorithms and proving their correctness than implementing them. When you do code, you can use any programming language you're comfortable with.

I'm looking forward to the next course in the series, [Graph Search, Shortest Paths, and Data Structures](https://www.coursera.org/learn/algorithms-graphs-data-structures). Until next time, keep analyzing! 🤓

![anime mouse drag](https://media1.tenor.com/m/d79toO9-OsAAAAAC/typing-computer.gif)
