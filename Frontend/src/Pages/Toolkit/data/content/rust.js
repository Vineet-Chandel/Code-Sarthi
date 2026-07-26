export default {
  topics: [
    {
      id: "ownership",
      title: "Ownership & Borrowing",
      sections: [
        {
          heading: "Ownership rules",
          description: "Every value has exactly one owner. When the owner goes out of scope, the value is dropped.",
          language: "rust",
          code: `fn main() {
    let s1 = String::from("hello");
    let s2 = s1;           // s1 is MOVED to s2 — s1 no longer valid

    // println!("{}", s1); // ❌ compile error: value borrowed after move

    let s3 = s2.clone();   // explicit deep copy — both valid
    println!("{} {}", s2, s3);

    // Stack types implement Copy — no move
    let x = 5;
    let y = x;
    println!("{} {}", x, y); // ✅ both valid
}`,
        },
        {
          heading: "References & borrowing",
          description: "& creates an immutable reference; &mut creates a mutable one. Only one &mut at a time.",
          language: "rust",
          code: `fn length(s: &String) -> usize {
    s.len()   // borrow — s stays valid in the caller
}

fn push_world(s: &mut String) {
    s.push_str(", world");
}

fn main() {
    let s = String::from("hello");
    println!("{}", length(&s)); // borrow
    println!("{}", s);          // s still valid

    let mut s2 = String::from("hello");
    push_world(&mut s2);
    println!("{}", s2);          // "hello, world"
}`,
        },
        {
          heading: "Slices",
          description: "Slices reference a contiguous sequence without owning it — &str is a string slice.",
          language: "rust",
          code: `fn first_word(s: &str) -> &str {
    let bytes = s.as_bytes();
    for (i, &b) in bytes.iter().enumerate() {
        if b == b' ' { return &s[..i]; }
    }
    s
}

fn main() {
    let sentence = String::from("hello world");
    let word = first_word(&sentence);     // &str — a slice
    println!("{}", word);                 // "hello"

    // Array slice
    let arr = [1, 2, 3, 4, 5];
    let slice: &[i32] = &arr[1..3];       // [2, 3]
}`,
        },
      ],
    },
    {
      id: "structs-enums",
      title: "Structs & Enums",
      sections: [
        {
          heading: "Structs",
          description: "Rust structs are similar to C structs but with methods via impl blocks.",
          language: "rust",
          code: `#[derive(Debug, Clone)]
struct User {
    id:    u32,
    name:  String,
    email: String,
    active: bool,
}

impl User {
    // Associated function (constructor pattern)
    fn new(id: u32, name: &str, email: &str) -> Self {
        User { id, name: name.to_owned(), email: email.to_owned(), active: true }
    }

    // Method — &self = immutable borrow
    fn greeting(&self) -> String {
        format!("Hello, {}!", self.name)
    }
}

let user = User::new(1, "Vineet", "v@devcheats.in");
println!("{}", user.greeting());
println!("{:?}", user);`,
        },
        {
          heading: "Enums & pattern matching",
          description: "Rust enums are algebraic data types — each variant can hold different data.",
          language: "rust",
          code: `#[derive(Debug)]
enum Shape {
    Circle(f64),
    Rectangle(f64, f64),
    Triangle { base: f64, height: f64 },
}

impl Shape {
    fn area(&self) -> f64 {
        match self {
            Shape::Circle(r)            => std::f64::consts::PI * r * r,
            Shape::Rectangle(w, h)      => w * h,
            Shape::Triangle { base, height } => 0.5 * base * height,
        }
    }
}

let shapes = vec![
    Shape::Circle(5.0),
    Shape::Rectangle(4.0, 6.0),
];
for s in &shapes { println!("{:.2}", s.area()); }`,
        },
      ],
    },
    {
      id: "error-handling",
      title: "Error Handling",
      sections: [
        {
          heading: "Result & Option",
          description: "Rust has no null and no exceptions — Result<T,E> and Option<T> encode fallibility in the type.",
          language: "rust",
          code: `use std::fs;
use std::num::ParseIntError;

// Result — Ok(value) or Err(error)
fn parse_port(s: &str) -> Result<u16, ParseIntError> {
    s.parse::<u16>()
}

// Option — Some(value) or None
fn first(v: &[i32]) -> Option<i32> {
    v.first().copied()
}

// The ? operator — propagate errors early
fn read_config() -> Result<String, std::io::Error> {
    let content = fs::read_to_string("config.toml")?;  // returns Err if fails
    Ok(content.trim().to_owned())
}`,
        },
        {
          heading: "Combinators",
          description: "chain Result and Option operations without nested match expressions.",
          language: "rust",
          code: `let port: u16 = std::env::var("PORT")
    .unwrap_or_else(|_| "3000".to_owned())
    .parse()
    .unwrap_or(3000);

// map, and_then, unwrap_or
let doubled: Option<i32> = Some(21).map(|n| n * 2);     // Some(42)
let parsed:  Result<i32, _> = Ok("42").and_then(|s: &str| s.parse());

// Collecting Results
let results: Result<Vec<i32>, _> = vec!["1", "2", "3"]
    .iter()
    .map(|s| s.parse::<i32>())
    .collect();`,
        },
      ],
    },
    {
      id: "traits",
      title: "Traits",
      sections: [
        {
          heading: "Defining & implementing traits",
          description: "Traits define shared behaviour — similar to interfaces but more powerful.",
          language: "rust",
          code: `trait Summary {
    fn summarize(&self) -> String;
    // Default method
    fn preview(&self) -> String {
        format!("{}...", &self.summarize()[..50.min(self.summarize().len())])
    }
}

struct Article { title: String, body: String }
struct Tweet   { handle: String, content: String }

impl Summary for Article {
    fn summarize(&self) -> String { format!("{}: {}", self.title, self.body) }
}

impl Summary for Tweet {
    fn summarize(&self) -> String { format!("{}: {}", self.handle, self.content) }
}

// Trait bound — accept any T that implements Summary
fn notify(item: &impl Summary) { println!("{}", item.summarize()); }`,
        },
      ],
    },
  ],
};
