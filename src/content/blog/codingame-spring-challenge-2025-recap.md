---
pubDatetime: 2025-04-22T07:47:07.381Z
title: "Codingame Spring Challenge 2025: Recap"
tags:
  - optimization
  - codingame
  - competitive programming
  - recap
description: "My experience tackling the Codingame Spring Challenge 2025 - Cehpalopod Game Simulation, Optimization problem."
---

For a couple of years now, I've eyed the [Codingame Spring Challenge](https://www.codingame.com/contests/spring-challenge-2025), but never quite felt ready or had the time. This year, armed with some recent experience and study, I decided to finally jump in. Here's how it went.

## Table of contents

## The Problem: Cephalopod Game Simulation

The challenge, themed around a "Cephalopod Game," boiled down to a board simulation and optimization task. Given an initial board state and a maximum simulation depth, the goal was to generate _all_ possible end-game states reachable within that depth. An end-game state is one where no further moves are possible. Finally, these end states needed to be aggregated and hashed into a single numerical output. The specifics of the game rules, moves, and scoring were detailed on the challenge page, but the core task was state space exploration and aggregation under performance constraints.

## The Approach: C++ Ad-Hoc Solution

My initial brainstorming involved sketching ideas on paper, drawing parallels to past experiences with problems like Sudoku solvers or N-Queens, and considered using Racket.

The scoring factored in execution time, so I decided to go with C++, and also to brush up on my old C++ skills. C seemed too low-level, and Python felt too slow.

In my prior C++ projects, I hadn't used the STL at all! I'm not kidding; I essentially used C++ like C with classes. It was a nice experience using C++ iterator syntax and range-based for loops (similar to Python's). Although the syntax can be a nightmare, it has become more expressive than plain C. It was amusing to encounter `std::map` – which I initially mistook for a functional `map()` or fold function, haha, a bad habit from TypeScript. Also learned about `std::prev_permutation`, which I used in my generative function to generate all the board sequences for all the entpy cells. The devdocs.io carried me haha.

My approach _involved_ a function that would take a board state and recursively (or iteratively - see the next section) explore possible moves up to the maximum depth. I initially thought about using multithreading (perhaps a fork-join model) to parallelize the exploration of different move branches simultaneously. However, I quickly abandoned this complexity in favor of a simpler generative approach, likely a recursive helper function, passing a reference to a vector that would collect the final end states.

Early development hit several snags:

- My recursive simulation logic got stuck in infinite loops when the maximum depth was greater than 1.
- The end states being generated weren't correct according to the examples.
- Debugging revealed a faulty `play_move()` function – it wasn't correctly updating the board, leading to generated states being identical to the starting one.
- Later, I found a particularly silly mistake: I was assigning `0` instead of the player's ID (`1` or `2`) when simulating a non-capture move, completely messing up the board state logic.

## Optimization Attempts and Roadblocks

After squashing the initial implementation bugs, the real challenge emerged: performance and correctness on larger test cases. My solution worked for trivial inputs but failed spectacularly on more complex ones. For instance, a test case expected to yield 20 unique end states resulted in my code producing a completely wrong hash (`344282302` instead of the correct `76092874`).

Furthermore, the simulation was painfully slow. As the board size, number of pieces, and simulation depth increased, the number of possible states exploded exponentially. The requirement was to stay under 10 seconds of execution time, which my naive simulation couldn't meet.

- _Memoization_: My first thought was to cache the results for board states that had already been fully explored. I implemented this using an `std::map` where the key represented the board state and the value stored its outcome (or perhaps the list of end states reachable from it). Counter-intuitively, this seemed to make things _worse_ for the 20-state test case, generating _more_ end states (2372) than the expected 1484. This was a confusing result. I realized my recursive approach, even with memoization, was essentially a _slow_ Depth-First Search (DFS), potentially exploring redundant paths or not managing the state exploration systematically. It highlighted the difference between knowing about DFS and implementing it efficiently with proper state management (like using an explicit stack and visited set).

- _BFS_: Suspecting my DFS approach might be inefficient or flawed, I tried switching to a Breadth-First Search (BFS) using a queue to manage the states to explore. While BFS explores level by level, it didn't fundamentally solve the problem; the 20+ state test cases still failed.

A major sticking point was handling visited states. If I strictly pruned branches leading to already-visited board states (to avoid redundant computation and infinite loops in cyclic scenarios), my solution started failing the _simpler_ test cases. This implied that reaching the same board state via different paths might be necessary to find all unique _end_ states. However, without pruning visited states, the computation exploded. The 20-state test case remained stubbornly incorrect, and I couldn't figure out why my code was generating so many more end states than the official solution expected (2372 vs. 1484). \*I tried hybrid approaches, even reimplemented core functions, but same.\* No progress. I was stuck.

## Conclusion and Takeaways

After like, 10 or so days, I realized this problem, _though_ _it_ seemed easier at first, _is_ actually very hard. And I decided to quit for now. It was my first Codingame challenge and first serious attempt at optimization problems, and frankly, I hit a wall.

I don't feel great about quitting, but I did manage to build a simulation pipeline and wrestle with different search strategies (DFS, BFS attempts), caching, and memoization. But ultimately, performance bottlenecks and state explosion stopped me.

Some things became clearer through failure; _perhaps the most important is realizing_ that there's a gap between knowing about data structures/algorithms and actually using them effectively when things get complex.

What now? First, I will resume my Greedy Algorithms studies which I mentioned in [this](/posts/course-review-coursera-tim-roughgarden-algorithms-2-graph-data-structure) post. Then, practice some more on optimization problems, and build myself up.

We'll see about the next challenge. I'll be better prepared, the next time for sure.

![anime pushup gif](https://media1.tenor.com/m/tPfQ0zzL2g0AAAAC/push-up-okarun.gif)
