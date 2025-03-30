---
pubDatetime: 2025-03-30T16:19:38.084Z
title: "Course Review: Tim Roughgarden's Graph Search, Shortest Paths, and Data Structures"
description: "Review of second course of the Algorithms specialization - graphs and shortest paths - and its prerequisites."
tags:
  - review
  - algorithms
  - computer-science
  - coursera
---

[Graph Search, Shortest Paths, and Data Structures](https://www.coursera.org/learn/algorithms-graphs-data-structures) (henceforth called Algo2) is the second course after Divide and Conquer, about which you can read in the [previous post here](/posts/course-review-coursera-tim-roughgarden-algorithms-1-divide-and-conquer). I completed Algo2 between 2025 Feb 17 and 2025 Mar 25. Similar to the review of Algo1, this review covers the module's content, difficulty, and prerequisites, sprinkled with my own opinions.

## Table of contents

## Module 1 - Graph Traversal, Searching, and SCCs

**Difficulty: ★★★★☆ (Challenging)**

This course starts off with the graph search problem and develops ideas for breadth-first and depth-first searches. If you have studied graph theory before or are familiar with graph traversal, this will be very easy.
The challenging part of this module comes from computing the strongly connected components in a directed graph. Unlike non-directed graphs, how do you identify the connected components? Therefore, the idea of SCC - a subset of vertices that can be reached from each other is called an SCC. Unlike undirected graphs, where one could use BFS to compute the connected components efficiently, we cannot use BFS here. The solution is using Kosaraju's algorithm: we reverse all edges and superimpose the graphs to see all the nodes a node can visit and on reversal all the nodes that can visit it. In implementation, we run two DFS runs to compute all the SCCs! The first run topologically sorts the SCC components in order of their reverse finishing times, then we reverse the graph and run the second DFS that runs in the order we found before. Each DFS termination on the second run produces an SCC! I will spare you the math here, but a good understanding of topological sorting and equivalence relations from discrete math will tremendously help you here.

## Module 2 - Dijkstra's Shortest Path Algorithm

**Difficulty: ★☆☆☆☆ (Easy)**

I already knew Dijkstra from my time with Susanna Epps' book on discrete math. So this was a breeze. They did not discuss priority queues and how to make Dijkstra run in O(V+E), which I implemented. Priority queues and heaps are discussed in the next module.

## Module 3 - Heaps and Trees

**Difficulty: ★☆☆☆☆ (Easy)**

This module discussed [heaps](<https://en.wikipedia.org/wiki/Heap_(data_structure)>) - a data structure optimized for use cases that require often maximum or minimum computation. The invariant is that you can read the max or min from a list of numbers in O(1), and insertions, deletions, and extractions are O(log n) operations! Some applications include Priority Queues, heap sort, and median maintenance of a running list.

Trees, binary search trees, and mention of red-black trees were also discussed. I already knew these so not an issue (I am so glad I took my time with Susanna Epps' discrete math!)

## Module 4 - Hash Tables and Bloom Filters

**Difficulty: ★★★☆☆ (Moderate)**

This was a bit more challenging module that discussed hash tables, collision, load factor, pathological data sets that break the hash tables and universal hashing functions... yup, this module gets a bit more technical and mathy with number theory. Fun fact: I learned that chances of hash collisions increase exponentially with the input size! Look up Birthday Paradox, you'll be amazed!
Finally, the course ends with Bloom Filters data structure - yes you read that right, not the bloom filter (shader effect) from the video games. It is a probabilistic data structure that tells you if an element was "seen" before, and yes errors are possible. They are used in applications that are not critical, like early spell checkers, list of forbidden passwords or network routing by low-powered devices.

## Conclusion

Overall, this was an easier course than the Algo1. Next up is Algo3 - [Greedy Algorithms, Minimum Spanning Trees, and Dynamic Programming](https://www.coursera.org/learn/algorithms-greedy/home/welcome), which I have already started working on. I expect it to complete before the end of April 2025.

![anime umaru typing](https://media1.tenor.com/m/JJmdqVhGoewAAAAC/anime-typing.gif)
