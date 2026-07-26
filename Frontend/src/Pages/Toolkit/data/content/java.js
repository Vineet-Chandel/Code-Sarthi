export default {
  topics: [
    {
      id: "classes-oop",
      title: "Classes & OOP",
      sections: [
        {
          heading: "Class anatomy",
          description: "Java is class-based. Access modifiers (public/private/protected) control visibility.",
          language: "java",
          code: `public class User {
    // Fields
    private final int id;
    private String name;
    private String email;

    // Constructor
    public User(int id, String name, String email) {
        this.id    = id;
        this.name  = name;
        this.email = email;
    }

    // Getters / setters
    public int    getId()    { return id; }
    public String getName()  { return name; }
    public void   setName(String name) { this.name = name; }

    @Override
    public String toString() {
        return "User{id=" + id + ", name='" + name + "'}";
    }
}`,
        },
        {
          heading: "Inheritance & interfaces",
          description: "extends inherits one class; implements can implement multiple interfaces.",
          language: "java",
          code: `// Interface
public interface Printable {
    void print();
    default String format() { return toString(); }
}

// Abstract base class
public abstract class Shape implements Printable {
    protected String color;
    public abstract double area();

    @Override
    public void print() {
        System.out.println(format() + " area=" + area());
    }
}

// Concrete class
public class Circle extends Shape {
    private double radius;

    public Circle(String color, double radius) {
        this.color  = color;
        this.radius = radius;
    }

    @Override
    public double area() { return Math.PI * radius * radius; }
}`,
        },
      ],
    },
    {
      id: "collections",
      title: "Collections",
      sections: [
        {
          heading: "List, Set, Map",
          description: "Always program to interfaces (List, not ArrayList) for flexibility.",
          language: "java",
          code: `import java.util.*;

// List — ordered, allows duplicates
List<String> names = new ArrayList<>(List.of("Alice", "Bob", "Carol"));
names.add("Dave");
names.remove("Bob");
String first = names.get(0);

// Set — unique elements
Set<Integer> ids = new HashSet<>(Set.of(1, 2, 3));

// Map — key → value
Map<String, Integer> scores = new HashMap<>();
scores.put("Alice", 95);
scores.put("Bob",   87);
int score = scores.getOrDefault("Carol", 0);
scores.forEach((name, s) -> System.out.println(name + ": " + s));`,
        },
        {
          heading: "Streams API",
          description: "Streams enable declarative, functional-style data transformation pipelines.",
          language: "java",
          code: `import java.util.stream.*;

List<String> names = List.of("Alice", "Bob", "Carol", "Dave");

// filter → map → collect
List<String> result = names.stream()
    .filter(n -> n.length() > 3)
    .map(String::toUpperCase)
    .sorted()
    .collect(Collectors.toList());

// reduce
int total = IntStream.rangeClosed(1, 100).sum();

// groupingBy
Map<Integer, List<String>> byLength = names.stream()
    .collect(Collectors.groupingBy(String::length));

// Optional — handle null safely
Optional<String> found = names.stream()
    .filter(n -> n.startsWith("C"))
    .findFirst();
found.ifPresent(System.out::println);`,
        },
      ],
    },
    {
      id: "generics",
      title: "Generics",
      sections: [
        {
          heading: "Generic classes & methods",
          description: "Type parameters make classes and methods work with any type while preserving type safety.",
          language: "java",
          code: `// Generic class
public class Pair<A, B> {
    private final A first;
    private final B second;

    public Pair(A first, B second) {
        this.first  = first;
        this.second = second;
    }
    public A getFirst()  { return first; }
    public B getSecond() { return second; }
}

// Generic method
public static <T extends Comparable<T>> T max(T a, T b) {
    return a.compareTo(b) >= 0 ? a : b;
}

// Wildcard — accept List of any Number subtype
public static double sum(List<? extends Number> list) {
    return list.stream().mapToDouble(Number::doubleValue).sum();
}`,
        },
      ],
    },
    {
      id: "exceptions",
      title: "Exceptions & I/O",
      sections: [
        {
          heading: "Checked vs unchecked exceptions",
          description: "Checked exceptions must be declared or caught; unchecked (RuntimeException) are optional.",
          language: "java",
          code: `// Checked exception — must declare or catch
public String readFile(String path) throws IOException {
    return Files.readString(Path.of(path));
}

// try-with-resources — auto-closes AutoCloseable
try (var reader = new BufferedReader(new FileReader("file.txt"))) {
    String line;
    while ((line = reader.readLine()) != null) {
        System.out.println(line);
    }
} catch (IOException e) {
    System.err.println("Error: " + e.getMessage());
}

// Custom exception
public class NotFoundException extends RuntimeException {
    public NotFoundException(String message) { super(message); }
}`,
        },
        {
          heading: "Modern file I/O (NIO.2)",
          description: "java.nio.file.Files provides a high-level API for common file operations.",
          language: "java",
          code: `import java.nio.file.*;

Path p = Path.of("src/data/users.json");

// Read
String content = Files.readString(p);
List<String> lines = Files.readAllLines(p);

// Write
Files.writeString(p, "{\"users\": []}", StandardOpenOption.CREATE);

// List directory
Files.list(Path.of("src"))
     .filter(Files::isRegularFile)
     .forEach(System.out::println);

// Copy / move
Files.copy(p, Path.of("backup.json"), StandardCopyOption.REPLACE_EXISTING);`,
        },
      ],
    },
  ],
};
