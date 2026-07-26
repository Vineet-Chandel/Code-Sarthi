export default {
  topics: [
    {
      id: "arrays",
      title: "Arrays",
      sections: [
        {
          heading: "Creating arrays",
          description: "NumPy arrays are homogeneously typed and stored in contiguous memory — much faster than Python lists.",
          language: "python",
          code: `import numpy as np

# From Python list
a = np.array([1, 2, 3, 4, 5])
m = np.array([[1, 2, 3], [4, 5, 6]])  # 2D

# Built-in constructors
np.zeros((3, 4))          # 3×4 of float64 zeros
np.ones((2, 3), dtype=int)
np.eye(4)                 # 4×4 identity
np.arange(0, 10, 2)      # [0, 2, 4, 6, 8]
np.linspace(0, 1, 11)    # 11 evenly spaced points
np.random.rand(3, 3)      # uniform random [0,1)
np.random.randn(100)      # standard normal

# Shape info
a.shape      # (5,)
m.shape      # (2, 3)
m.ndim       # 2
m.dtype      # dtype('int64')`,
        },
        {
          heading: "Indexing & slicing",
          description: "NumPy indexing is 0-based. Slices return views, not copies.",
          language: "python",
          code: `a = np.arange(10)          # [0 1 2 3 4 5 6 7 8 9]

a[3]                       # 3
a[-1]                      # 9 (last)
a[2:7]                     # [2 3 4 5 6]
a[::2]                     # [0 2 4 6 8] — every other
a[::-1]                    # reversed

# 2D
m = np.arange(12).reshape(3, 4)
m[1, 2]                    # row 1, col 2 → 6
m[0, :]                    # first row
m[:, -1]                   # last column
m[0:2, 1:3]                # 2×2 submatrix

# Boolean indexing
a[a > 5]                   # [6 7 8 9]
a[(a % 2) == 0]            # even numbers`,
        },
        {
          heading: "Reshaping",
          description: "reshape returns a view sharing data. -1 means 'infer this dimension'.",
          language: "python",
          code: `a = np.arange(24)

a.reshape(4, 6)         # 4×6
a.reshape(2, 3, 4)      # 3D: 2×3×4
a.reshape(6, -1)        # 6×4 (inferred)

# Flatten / ravel
m = np.arange(12).reshape(3, 4)
m.flatten()             # copy: always 1D array
m.ravel()               # view if possible

# Transpose
m.T                     # (4, 3) from (3, 4)
m.swapaxes(0, 1)        # same as .T for 2D`,
        },
      ],
    },
    {
      id: "math-ops",
      title: "Math Operations",
      sections: [
        {
          heading: "Element-wise operations",
          description: "All standard arithmetic operators work element-wise on arrays of the same shape.",
          language: "python",
          code: `a = np.array([1, 2, 3, 4])
b = np.array([10, 20, 30, 40])

a + b          # [11 22 33 44]
a * b          # [10 40 90 160]
b / a          # [10. 10. 10. 10.]
a ** 2         # [1  4  9 16]
np.sqrt(b)     # [3.16 4.47 5.48 6.32]

# Universal functions (ufuncs)
np.sin(a)
np.exp(a)
np.log(b)
np.abs(np.array([-1, -2, 3]))   # [1 2 3]`,
        },
        {
          heading: "Aggregations",
          description: "Reductions operate over the whole array or along an axis.",
          language: "python",
          code: `m = np.array([[1, 2, 3], [4, 5, 6]])

m.sum()                # 21 — total
m.sum(axis=0)          # [5 7 9] — column sums
m.sum(axis=1)          # [6 15] — row sums

m.mean()               # 3.5
m.std()                # std dev
m.min(), m.max()       # 1, 6
m.argmin(), m.argmax() # index of min/max
np.cumsum(m, axis=1)   # cumulative sums along rows`,
        },
      ],
    },
    {
      id: "broadcasting",
      title: "Broadcasting",
      sections: [
        {
          heading: "Broadcasting rules",
          description: "Arrays with different shapes are broadcast together if trailing dimensions are compatible.",
          language: "python",
          code: `# Scalar broadcast
a = np.array([1, 2, 3])
a + 10            # [11 12 13]
a * 2             # [2  4  6]

# 1D + 2D
m = np.ones((3, 4))
v = np.array([1, 2, 3, 4])  # shape (4,)
m + v                         # each row of m gets v added

# Column vector broadcast
col = np.array([[10], [20], [30]])  # shape (3, 1)
m + col                             # each column gets col added

# Outer product via broadcasting
a = np.array([1, 2, 3])     # (3,)
b = np.array([10, 20])      # (2,)
a[:, np.newaxis] * b        # (3,1) × (2,) → (3,2)`,
        },
        {
          heading: "Linear algebra",
          description: "numpy.linalg provides matrix operations — prefer it over manual loops.",
          language: "python",
          code: `from numpy import linalg as la

A = np.array([[1., 2.], [3., 4.]])
b = np.array([5., 6.])

la.det(A)          # determinant
la.inv(A)          # inverse
la.norm(b)         # L2 norm
la.solve(A, b)     # solve Ax = b
vals, vecs = la.eig(A)  # eigenvalues & vectors

# Matrix multiplication
A @ b              # equivalent to np.dot(A, b)
A @ A.T            # A × Aᵀ`,
        },
      ],
    },
  ],
};
