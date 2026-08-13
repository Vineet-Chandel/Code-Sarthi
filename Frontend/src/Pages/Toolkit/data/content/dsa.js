export default {
  categories: [
    {
      title: "Interview Strategies",
      topicIds: ["golden-rules-interview", "time-space-complexity"]
    },
    {
      title: "Data Structures",
      topicIds: ["arrays-strings", "linked-lists", "stacks-queues", "trees-graphs"]
    },
    {
      title: "Algorithms & Patterns",
      topicIds: ["two-pointers-sliding-window", "sorting-searching", "dynamic-programming"]
    }
  ],
  topics: [
    {
      id: "golden-rules-interview",
      category: "Interview Strategies",
      shortTitle: "Golden Rules for Coding Interviews",
      title: "Golden Rules for Solving a Coding Question in an Interview",
      sections: [
        {
          heading: "Golden Rules for Technical Coding Interviews",
          description: "Step-by-step methodology to tackle any coding interview question effectively:\n\n1. **Listen & Clarify**: Carefully read/listen to the problem statement. Ask clarifying questions regarding constraints, input bounds, edge cases, and expected outputs.\n2. **Work Through Examples**: Manually solve small sample test cases on whiteboard/paper before typing any code.\n3. **Brute Force First**: State a simple brute-force solution to establish a baseline time and space complexity.\n4. **Optimize**: Identify bottlenecks and apply data structures (Hash Maps, Two Pointers, Heaps, DP) to optimize time/space complexity.\n5. **Dry Run Before Coding**: Trace your algorithm step-by-step with sample inputs to ensure correctness.\n6. **Write Clean Code**: Use clear variable names, modular functions, and edge-case handling.\n7. **Test & Analyze**: Run through edge cases (empty inputs, single elements, duplicates) and clearly explain the final Time and Space Complexity."
        }
      ]
    },
    {
      id: "time-space-complexity",
      category: "Interview Strategies",
      shortTitle: "Time & Space Complexity",
      title: "Time & Space Complexity (Big-O Notation)",
      sections: [
        {
          heading: "Big-O Notation Cheat Sheet",
          description: "Understanding algorithm efficiency:\n- **O(1)**: Constant Time\n- **O(log N)**: Logarithmic (Binary Search, Balanced BST)\n- **O(N)**: Linear Time (Array Traversal)\n- **O(N log N)**: Linearithmic (Merge Sort, Quick Sort)\n- **O(N²)**: Quadratic (Nested Loops, Bubble Sort)\n- **O(2ⁿ)**: Exponential (Recursive Subsets, Fibonacci)"
        }
      ]
    },
    {
      id: "arrays-strings",
      category: "Data Structures",
      shortTitle: "Arrays & Strings",
      title: "Arrays & Strings",
      sections: [
        {
          heading: "Arrays & Strings Overview",
          description: "Arrays store elements in contiguous memory locations allowing O(1) random access.\nCommon techniques:\n- Prefix Sums\n- Sliding Window\n- Two Pointers\n- Hash Map Lookup"
        }
      ]
    },
    {
      id: "linked-lists",
      category: "Data Structures",
      shortTitle: "Linked Lists",
      title: "Linked Lists",
      sections: [
        {
          heading: "Singly & Doubly Linked Lists",
          description: "Linear data structure where elements are stored in nodes pointing to the next node.\nCommon patterns:\n- Fast & Slow Pointer (Cycle Detection, Middle of List)\n- In-place Reversal\n- Dummy Head Node technique"
        }
      ]
    },
    {
      id: "stacks-queues",
      category: "Data Structures",
      shortTitle: "Stacks & Queues",
      title: "Stacks & Queues",
      sections: [
        {
          heading: "LIFO & FIFO Data Structures",
          description: "- **Stack (LIFO)**: Used in Parentheses Matching, Expression Evaluation, Monotonic Stack.\n- **Queue (FIFO)**: Used in BFS Traversal, Level Order Traversal, Buffer Management."
        }
      ]
    },
    {
      id: "trees-graphs",
      category: "Data Structures",
      shortTitle: "Trees & Graphs",
      title: "Trees & Graphs",
      sections: [
        {
          heading: "Trees & Graphs",
          description: "Non-linear hierarchical and network structures.\nKey Traversals:\n- Depth First Search (DFS): Pre-order, In-order, Post-order\n- Breadth First Search (BFS): Queue-level traversal\n- Graph Algorithms: Dijkstra's, Topological Sort, Union-Find (Disjoint Set)"
        }
      ]
    },
    {
      id: "two-pointers-sliding-window",
      category: "Algorithms & Patterns",
      shortTitle: "Two Pointers & Sliding Window",
      title: "Two Pointers & Sliding Window",
      sections: [
        {
          heading: "Two Pointers & Sliding Window Patterns",
          description: "Efficient patterns for array and string problems:\n- **Two Pointers**: Opposite ends moving inward or fast/slow pointers.\n- **Sliding Window**: Fixed size or dynamic size expanding/shrinking window."
        }
      ]
    },
    {
      id: "sorting-searching",
      category: "Algorithms & Patterns",
      shortTitle: "Sorting & Searching",
      title: "Sorting & Searching",
      sections: [
        {
          heading: "Sorting & Searching",
          description: "Fundamental sorting algorithms (Merge Sort, Quick Sort, Heap Sort) and Binary Search variants (search in rotated sorted array, lower/upper bound)."
        }
      ]
    },
    {
      id: "dynamic-programming",
      category: "Algorithms & Patterns",
      shortTitle: "Dynamic Programming",
      title: "Dynamic Programming",
      sections: [
        {
          heading: "Dynamic Programming",
          description: "Solving complex problems by breaking them down into overlapping subproblems.\nTechniques:\n- Memoization (Top-Down)\n- Tabulation (Bottom-Up)\n- Common Patterns: 0/1 Knapsack, Unbounded Knapsack, LCS, LIS, Matrix Chain Multiplication."
        }
      ]
    }
  ]
};
