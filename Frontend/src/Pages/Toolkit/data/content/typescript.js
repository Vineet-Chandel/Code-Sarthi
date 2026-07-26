export default {
  topics: [
    {
      id: "types-interfaces",
      title: "Types & Interfaces",
      sections: [
        {
          heading: "Primitive types",
          description: "TypeScript infers types from assignment; add explicit annotations only when inference falls short.",
          language: "typescript",
          code: `// Explicit annotations
let name:    string  = "Vineet";
let age:     number  = 28;
let active:  boolean = true;
let nothing: null    = null;
let mystery: unknown = fetchData(); // safer than any

// Let TypeScript infer where obvious
const count  = 0;         // inferred: number
const labels = ["a","b"]; // inferred: string[]`,
        },
        {
          heading: "Object types & interfaces",
          description: "interface is open (can be re-declared/merged); type alias is closed. Prefer interface for object shapes.",
          language: "typescript",
          code: `interface User {
  id:        number;
  name:      string;
  email?:    string;     // optional
  readonly createdAt: Date; // immutable after creation
}

// Type alias — useful for unions and intersections
type ID = string | number;
type AdminUser = User & { role: "admin" };`,
        },
        {
          heading: "Union & intersection types",
          description: "Union (|) means \"one of these\"; intersection (&) means \"all of these combined\".",
          language: "typescript",
          code: `// Union: value can be any of these shapes
type Status = "idle" | "loading" | "success" | "error";

type ApiResponse =
  | { status: "success"; data: User[] }
  | { status: "error";   message: string };

// Intersection: combine multiple types
type TimestampedUser = User & {
  createdAt: Date;
  updatedAt: Date;
};`,
        },
        {
          heading: "Enums vs const objects",
          description: "Const objects (as const) are preferred — they produce smaller bundles and no runtime footprint.",
          language: "typescript",
          code: `// Avoid: regular enum compiles to an IIFE
enum Direction { Up, Down, Left, Right }

// Prefer: const assertion — zero runtime overhead
const Direction = {
  Up:    "UP",
  Down:  "DOWN",
  Left:  "LEFT",
  Right: "RIGHT",
} as const;

type Direction = typeof Direction[keyof typeof Direction];
// "UP" | "DOWN" | "LEFT" | "RIGHT"`,
        },
      ],
    },
    {
      id: "generics",
      title: "Generics",
      sections: [
        {
          heading: "Generic functions",
          description: "Type parameters (T, K, V) let a function work with any type while preserving type information.",
          language: "typescript",
          code: `// Without generics: loses type info
function identity(value: any): any { return value; }

// With generics: T flows through
function identity<T>(value: T): T { return value; }

const str = identity("hello");  // type: string
const num = identity(42);       // type: number

// Multiple type parameters
function pair<A, B>(a: A, b: B): [A, B] {
  return [a, b];
}`,
        },
        {
          heading: "Generic constraints",
          description: "extends restricts which types T can be — access only properties that exist on the constraint.",
          language: "typescript",
          code: `// T must have a .length property
function longest<T extends { length: number }>(a: T, b: T): T {
  return a.length >= b.length ? a : b;
}

longest("hello", "hi");         // OK — strings have .length
longest([1, 2, 3], [4, 5]);     // OK — arrays have .length

// K must be a key of T
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}`,
        },
        {
          heading: "Generic interfaces & classes",
          description: "Generics work on interfaces and classes too — the type parameter is part of the type contract.",
          language: "typescript",
          code: `interface Repository<T> {
  findById(id: number): Promise<T | null>;
  findAll(): Promise<T[]>;
  create(data: Omit<T, "id">): Promise<T>;
  delete(id: number): Promise<void>;
}

class UserRepository implements Repository<User> {
  async findById(id: number) { /* ... */ return null; }
  async findAll()            { return []; }
  async create(data)         { /* ... */ return data as User; }
  async delete(id: number)   { /* ... */ }
}`,
        },
      ],
    },
    {
      id: "utility-types",
      title: "Utility Types",
      sections: [
        {
          heading: "Partial, Required, Readonly",
          description: "Transform all properties of an existing type at once without repeating the shape.",
          language: "typescript",
          code: `interface Config {
  host: string;
  port: number;
  debug?: boolean;
}

// All fields optional (great for update payloads)
type UpdateConfig = Partial<Config>;

// All fields required (strips ?)
type StrictConfig = Required<Config>;

// All fields readonly
type FrozenConfig = Readonly<Config>;`,
        },
        {
          heading: "Pick, Omit, Record",
          description: "Pick selects a subset of keys; Omit excludes them; Record creates a mapped object type.",
          language: "typescript",
          code: `interface User {
  id: number; name: string; email: string; password: string;
}

// Only expose safe fields
type PublicUser = Pick<User, "id" | "name" | "email">;

// Remove sensitive field
type SafeUser = Omit<User, "password">;

// Map of tech IDs to booleans
type TechAvailability = Record<"html" | "css" | "js", boolean>;
const available: TechAvailability = { html: true, css: true, js: false };`,
        },
        {
          heading: "ReturnType & Parameters",
          description: "Extract the return type or parameter tuple of any function type — great for inferring from existing functions.",
          language: "typescript",
          code: `function getUser(id: number) {
  return { id, name: "Vineet", role: "admin" as const };
}

// Infer the return type
type UserResult = ReturnType<typeof getUser>;
// { id: number; name: string; role: "admin" }

// Infer parameter types as a tuple
type GetUserParams = Parameters<typeof getUser>;
// [id: number]

// Practical use — wrapping an existing function
function cached<T extends (...args: any[]) => any>(
  fn: T
): (...args: Parameters<T>) => ReturnType<T> { /* ... */ return fn; }`,
        },
      ],
    },
    {
      id: "narrowing",
      title: "Type Narrowing",
      sections: [
        {
          heading: "typeof & instanceof guards",
          description: "TypeScript narrows the type inside each branch based on the runtime check.",
          language: "typescript",
          code: `function format(value: string | number): string {
  if (typeof value === "string") {
    return value.toUpperCase();  // TypeScript knows: string
  }
  return value.toFixed(2);       // TypeScript knows: number
}

// instanceof for class instances
function handleError(err: unknown) {
  if (err instanceof Error) {
    console.error(err.message);  // Error
  } else {
    console.error(String(err));
  }
}`,
        },
        {
          heading: "Discriminated unions",
          description: "A shared literal field (the discriminant) lets TypeScript narrow a union exhaustively.",
          language: "typescript",
          code: `type ApiResult =
  | { status: "success"; data: User[] }
  | { status: "error";   code: number; message: string }
  | { status: "loading" };

function render(result: ApiResult) {
  switch (result.status) {
    case "success": return result.data;     // User[]
    case "error":   return result.message;  // string
    case "loading": return null;
  }
}`,
        },
        {
          heading: "Type predicates (custom guards)",
          description: "Return value is T lets you write reusable narrowing functions that teach TypeScript about your types.",
          language: "typescript",
          code: `interface Cat { meow(): void }
interface Dog { bark(): void }

function isCat(animal: Cat | Dog): animal is Cat {
  return "meow" in animal;
}

function makeSound(animal: Cat | Dog) {
  if (isCat(animal)) {
    animal.meow();   // TypeScript knows: Cat
  } else {
    animal.bark();   // TypeScript knows: Dog
  }
}`,
        },
        {
          heading: "Exhaustive checks with never",
          description: "Assign to never at the end of a switch to get a compile error if a union member is unhandled.",
          language: "typescript",
          code: `type Shape =
  | { kind: "circle";    radius: number }
  | { kind: "square";    side: number }
  | { kind: "rectangle"; w: number; h: number };

function area(shape: Shape): number {
  switch (shape.kind) {
    case "circle":    return Math.PI * shape.radius ** 2;
    case "square":    return shape.side ** 2;
    case "rectangle": return shape.w * shape.h;
    default: {
      const _exhaustive: never = shape;
      // TS error here if a new Shape variant is added but not handled
      throw new Error(\`Unhandled: \${JSON.stringify(_exhaustive)}\`);
    }
  }
}`,
        },
      ],
    },
  ],
};
