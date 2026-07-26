export default {
  topics: [
    {
      id: "optionals",
      title: "Optionals & Variables",
      sections: [
        {
          heading: "Variables & type safety",
          description: "Swift uses let for constants and var for variables. Types are inferred but can be explicit.",
          language: "swift",
          code: `// Constants and variables
let name: String = "Vineet"   // constant
var score = 95                 // inferred: Int

// String interpolation
let greeting = "Hello, \\(name)! Score: \\(score)"

// Type aliases
typealias UserID = Int
let userId: UserID = 42

// Multiple assignment
var (x, y) = (1, 2)`,
        },
        {
          heading: "Optionals",
          description: "Optional<T> (written T?) means the value may be nil. Unwrap safely with if let or guard let.",
          language: "swift",
          code: `var email: String? = "v@example.com"
var missing: String? = nil

// Optional binding
if let e = email {
    print("Email: \\(e)")  // e is String (non-optional) here
}

// Guard — early exit pattern (preferred in functions)
func process(email: String?) {
    guard let e = email else {
        print("No email")
        return
    }
    print("Processing \\(e)")  // e is String below guard
}

// Nil-coalescing
let display = email ?? "No email"

// Optional chaining
let count = email?.count   // Int? — nil if email is nil`,
        },
        {
          heading: "Collections",
          description: "Array, Set, and Dictionary are generic value types — they're copied on assignment.",
          language: "swift",
          code: `// Array
var langs: [String] = ["Swift", "Dart", "Kotlin"]
langs.append("TypeScript")
langs.sort()
let first = langs.first        // String?

// Set
var visited: Set<String> = ["London", "Tokyo"]
visited.insert("Mumbai")
visited.contains("Tokyo")      // true

// Dictionary
var scores: [String: Int] = ["Alice": 95, "Bob": 87]
scores["Carol"] = 92
let s = scores["Alice", default: 0]  // safe access`,
        },
      ],
    },
    {
      id: "closures",
      title: "Closures & Functions",
      sections: [
        {
          heading: "Function syntax",
          description: "Functions are first-class. Argument labels can differ from internal parameter names.",
          language: "swift",
          code: `// External label vs internal name
func greet(person name: String, from city: String) -> String {
    return "\\(name) from \\(city)"
}
greet(person: "Vineet", from: "Mumbai")

// Variadic parameters
func sum(_ numbers: Int...) -> Int { numbers.reduce(0, +) }
sum(1, 2, 3, 4)   // 10

// inout — mutate a passed value
func double(_ n: inout Int) { n *= 2 }
var x = 5
double(&x)   // x is now 10`,
        },
        {
          heading: "Closures",
          description: "Trailing closure syntax and shorthand argument names ($0, $1) keep call sites clean.",
          language: "swift",
          code: `let nums = [3, 1, 4, 1, 5, 9, 2, 6]

// Full closure syntax
let sorted = nums.sorted(by: { (a: Int, b: Int) -> Bool in a < b })

// Trailing closure — cleaner
let doubled = nums.map { $0 * 2 }
let evens   = nums.filter { $0.isMultiple(of: 2) }
let total   = nums.reduce(0) { $0 + $1 }

// Capturing values
func makeCounter() -> () -> Int {
    var count = 0
    return { count += 1; return count }
}
let counter = makeCounter()
counter()   // 1
counter()   // 2`,
        },
      ],
    },
    {
      id: "structs-classes",
      title: "Structs & Classes",
      sections: [
        {
          heading: "Structs (value types)",
          description: "Prefer structs — they're value types (copied on assignment) and thread-safe by default.",
          language: "swift",
          code: `struct Point {
    var x: Double
    var y: Double

    // Computed property
    var magnitude: Double { (x*x + y*y).squareRoot() }

    // Mutating method — required to modify self in struct
    mutating func translate(dx: Double, dy: Double) {
        x += dx; y += dy
    }
}

var p1 = Point(x: 3, y: 4)
p1.translate(dx: 1, dy: 0)
print(p1.magnitude)  // 5.0

// Struct is COPIED
var p2 = p1         // independent copy
p2.x = 100          // does not affect p1`,
        },
        {
          heading: "Protocols",
          description: "Protocols define requirements that types must satisfy — similar to interfaces.",
          language: "swift",
          code: `protocol Describable {
    var description: String { get }
    func describe()
}

// Default implementation via extension
extension Describable {
    func describe() { print(description) }
}

struct Car: Describable {
    let make: String
    let model: String
    var description: String { "\\(make) \\(model)" }
}

// Protocol as a type
func printAll(_ items: [any Describable]) {
    items.forEach { $0.describe() }
}`,
        },
      ],
    },
    {
      id: "async-swift",
      title: "Async / Await",
      sections: [
        {
          heading: "Async functions",
          description: "Swift's structured concurrency with async/await — no completion handlers needed.",
          language: "swift",
          code: `import Foundation

func fetchUser(id: Int) async throws -> User {
    let url = URL(string: "https://api.example.com/users/\\(id)")!
    let (data, response) = try await URLSession.shared.data(from: url)
    guard let http = response as? HTTPURLResponse, http.statusCode == 200 else {
        throw URLError(.badServerResponse)
    }
    return try JSONDecoder().decode(User.self, from: data)
}

// Calling async from a Task
Task {
    do {
        let user = try await fetchUser(id: 42)
        print(user.name)
    } catch {
        print("Error:", error)
    }
}`,
        },
      ],
    },
  ],
};
