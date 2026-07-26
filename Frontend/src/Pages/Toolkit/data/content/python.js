export default {
  topics: [
    {
      id: "data-types",
      title: "Data Types & Functions",
      sections: [
        {
          heading: "Core built-in types",
          description: "Python's built-in types cover most data needs without imports.",
          language: "python",
          code: `# Numbers
x: int   = 42
y: float = 3.14
z: complex = 2 + 3j

# Strings — immutable, indexable
name = "Vineet"
greeting = f"Hello, {name}!"   # f-string (Python 3.6+)
multiline = """
  Line 1
  Line 2
"""

# Collections
my_list  = [1, 2, 3]           # mutable, ordered
my_tuple = (1, 2, 3)           # immutable, ordered
my_set   = {1, 2, 3}           # mutable, unique
my_dict  = {"key": "value"}    # mutable, key-value`,
        },
        {
          heading: "Functions",
          description: "def defines functions; * args collects positional extras, ** kwargs collects keyword extras.",
          language: "python",
          code: `def greet(name: str, greeting: str = "Hello") -> str:
    return f"{greeting}, {name}!"

# *args — variable positional arguments
def total(*numbers: int) -> int:
    return sum(numbers)

# **kwargs — variable keyword arguments
def create_user(name: str, **fields) -> dict:
    return {"name": name, **fields}

# Lambda — single-expression function
square = lambda x: x ** 2

# Type hints (Python 3.10+)
def process(items: list[str]) -> dict[str, int]:
    return {item: len(item) for item in items}`,
        },
        {
          heading: "Comprehensions",
          description: "Compact syntax for building lists, dicts, and sets from iterables.",
          language: "python",
          code: `# List comprehension
squares = [x**2 for x in range(10)]
evens   = [x for x in range(20) if x % 2 == 0]

# Dict comprehension
lengths = {word: len(word) for word in ["apple", "fig", "banana"]}

# Set comprehension
unique_lengths = {len(word) for word in ["apple", "fig", "banana"]}

# Generator expression (lazy, memory-efficient)
total = sum(x**2 for x in range(1_000_000))

# Nested comprehension
matrix = [[row * col for col in range(1, 4)] for row in range(1, 4)]`,
        },
      ],
    },
    {
      id: "classes",
      title: "Classes & OOP",
      sections: [
        {
          heading: "Class definition",
          description: "Python classes use __init__ for construction. @dataclass auto-generates boilerplate.",
          language: "python",
          code: `class User:
    # Class variable (shared)
    count: int = 0

    def __init__(self, name: str, email: str) -> None:
        self.name  = name
        self.email = email
        User.count += 1

    def __repr__(self) -> str:
        return f"User(name={self.name!r})"

    def __eq__(self, other: object) -> bool:
        return isinstance(other, User) and self.email == other.email

    @classmethod
    def from_dict(cls, data: dict) -> "User":
        return cls(data["name"], data["email"])

    @staticmethod
    def validate_email(email: str) -> bool:
        return "@" in email`,
        },
        {
          heading: "@dataclass",
          description: "dataclasses auto-generate __init__, __repr__, __eq__, and optionally __hash__.",
          language: "python",
          code: `from dataclasses import dataclass, field

@dataclass(frozen=True)  # frozen = immutable (hashable)
class Point:
    x: float
    y: float

@dataclass
class Post:
    title: str
    tags:  list[str] = field(default_factory=list)
    views: int       = 0

    def summary(self) -> str:
        return f"{self.title} ({self.views} views)"

p = Point(1.0, 2.0)
post = Post(title="Hello", tags=["python", "web"])`,
        },
      ],
    },
    {
      id: "error-handling",
      title: "Error Handling",
      sections: [
        {
          heading: "try / except / finally",
          description: "Catch specific exception types. Use finally for cleanup that must always run.",
          language: "python",
          code: `try:
    result = 10 / 0
except ZeroDivisionError:
    print("Cannot divide by zero")
except (TypeError, ValueError) as e:
    print(f"Type or value error: {e}")
except Exception as e:
    print(f"Unexpected: {e}")
    raise   # re-raise
else:
    print("No exception occurred")
finally:
    print("Always runs")`,
        },
        {
          heading: "Custom exceptions",
          description: "Create exception hierarchies by subclassing Exception or a domain base class.",
          language: "python",
          code: `class AppError(Exception):
    """Base for all app-level errors."""

class NotFoundError(AppError):
    def __init__(self, resource: str, id: int):
        super().__init__(f"{resource} with id={id} not found")
        self.resource = resource
        self.id = id

class ValidationError(AppError):
    def __init__(self, field: str, message: str):
        super().__init__(f"{field}: {message}")

# Using
try:
    raise NotFoundError("User", 42)
except NotFoundError as e:
    print(e.resource, e.id)`,
        },
      ],
    },
    {
      id: "stdlib",
      title: "Standard Library",
      sections: [
        {
          heading: "pathlib — file system",
          description: "pathlib.Path is the modern, OO way to handle file paths.",
          language: "python",
          code: `from pathlib import Path

p = Path("./src/data")
p.mkdir(parents=True, exist_ok=True)

# Read / write
text = Path("README.md").read_text(encoding="utf-8")
Path("output.json").write_text('{"ok": true}')

# Glob
py_files = list(Path("src").rglob("*.py"))

# Path operations
config = Path.home() / ".config" / "app.json"
print(config.stem)    # "app"
print(config.suffix)  # ".json"
print(config.parent)  # ~/.config`,
        },
        {
          heading: "itertools & collections",
          description: "Standard library tools that save you from reinventing common patterns.",
          language: "python",
          code: `from itertools import chain, islice, groupby
from collections import Counter, defaultdict, deque

# Counter — frequency map
words = ["apple", "fig", "apple", "banana", "fig", "apple"]
freq  = Counter(words)  # Counter({"apple": 3, "fig": 2, "banana": 1})

# defaultdict — avoids KeyError
groups: defaultdict[str, list] = defaultdict(list)
for item in items:
    groups[item.category].append(item)

# deque — fast O(1) appends/pops from both ends
q: deque[int] = deque(maxlen=100)
q.appendleft(0)
q.append(1)
q.popleft()`,
        },
      ],
    },
  ],
};
