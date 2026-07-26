export default {
  topics: [
    {
      id: "variables",
      title: "Variables & Null Safety",
      sections: [
        {
          heading: "Variables & types",
          description: "Dart is statically typed with strong null safety. var infers the type; final/const are immutable.",
          language: "dart",
          code: `// Explicit types
String  name    = 'Vineet';
int     age     = 28;
double  score   = 95.5;
bool    active  = true;

// Type inference
var greeting = 'Hello, $name!';   // String

// Immutable
final createdAt = DateTime.now(); // runtime constant
const pi = 3.14159;               // compile-time constant

// Late initialisation
late String loadedData;  // must be assigned before first use`,
        },
        {
          heading: "Null safety",
          description: "Types are non-nullable by default. Append ? to allow null. Use ?? for fallbacks.",
          language: "dart",
          code: `// Non-nullable — cannot hold null
String name = 'Vineet';

// Nullable
String? email = null;

// Null-aware operators
String display = email ?? 'No email';       // null coalescing
int? length    = email?.length;             // null-conditional
email!.toUpperCase();                       // null assertion (throws if null)

// Required parameters vs optionals
void greet(String name, {String? title}) {
  print('Hello, \${title ?? ''} $name');
}
greet('Vineet', title: 'Dr.');`,
        },
        {
          heading: "Collections",
          description: "List, Set, and Map are generics. Spread (...) and if/for in collection literals are powerful.",
          language: "dart",
          code: `// List
List<String> langs = ['Dart', 'Swift', 'Kotlin'];
langs.add('TypeScript');
langs.sort();

// Set
var unique = <String>{'a', 'b', 'c'};

// Map
var scores = <String, int>{'Alice': 95, 'Bob': 87};
scores['Carol'] = 92;

// Collection if/for
var extra = true;
var items = [
  'always',
  if (extra) 'conditional',
  for (var i = 0; i < 3; i++) 'item_$i',
];`,
        },
      ],
    },
    {
      id: "classes",
      title: "Classes & OOP",
      sections: [
        {
          heading: "Class definition",
          description: "Dart supports initializer lists, named constructors, and factory constructors.",
          language: "dart",
          code: `class User {
  final int    id;
  final String name;
  String?      email;

  // Primary constructor
  User(this.id, this.name, {this.email});

  // Named constructor
  User.guest() : id = 0, name = 'Guest';

  // Factory constructor
  factory User.fromJson(Map<String, dynamic> json) {
    return User(json['id'], json['name'], email: json['email']);
  }

  // Getter
  String get initials => name.split(' ').map((w) => w[0]).join();

  @override
  String toString() => 'User($id, $name)';
}

final user = User(1, 'Vineet', email: 'v@devcheats.in');
final guest = User.guest();`,
        },
        {
          heading: "Mixins & extensions",
          description: "Mixins add capabilities to classes without inheritance. Extensions add methods to existing types.",
          language: "dart",
          code: `// Mixin
mixin Serializable {
  Map<String, dynamic> toJson();
  String toJsonString() => jsonEncode(toJson());
}

class Post with Serializable {
  final String title;
  Post(this.title);

  @override
  Map<String, dynamic> toJson() => {'title': title};
}

// Extension — adds method to String
extension StringUtils on String {
  String get initials =>
      split(' ').map((w) => w.isEmpty ? '' : w[0].toUpperCase()).join();
}

print('Vineet Chandel'.initials);  // 'VC'`,
        },
      ],
    },
    {
      id: "async",
      title: "Async & Streams",
      sections: [
        {
          heading: "Future & async/await",
          description: "Future<T> represents a value available later. async/await makes async code readable.",
          language: "dart",
          code: `import 'dart:convert';
import 'package:http/http.dart' as http;

Future<Map<String, dynamic>> fetchUser(int id) async {
  final uri = Uri.parse('https://api.example.com/users/$id');
  final res  = await http.get(uri);

  if (res.statusCode != 200) {
    throw Exception('Failed: \${res.statusCode}');
  }
  return jsonDecode(res.body) as Map<String, dynamic>;
}

// Error handling
Future<void> run() async {
  try {
    final user = await fetchUser(42);
    print(user['name']);
  } catch (e) {
    print('Error: $e');
  }
}`,
        },
        {
          heading: "Streams",
          description: "Streams are async sequences — use async* / yield to create them, await for to consume.",
          language: "dart",
          code: `// Stream generator
Stream<int> countdown(int from) async* {
  for (int i = from; i >= 0; i--) {
    await Future.delayed(Duration(seconds: 1));
    yield i;
  }
}

// Consuming
await for (final n in countdown(5)) {
  print(n);  // 5, 4, 3, 2, 1, 0
}

// StreamController
final controller = StreamController<String>();
controller.stream.listen((event) => print(event));
controller.add('Hello');
controller.add('World');
await controller.close();`,
        },
      ],
    },
    {
      id: "patterns",
      title: "Patterns (Dart 3)',",
      sections: [
        {
          heading: "Pattern matching & switch",
          description: "Dart 3 adds exhaustive switch expressions and destructuring patterns.",
          language: "dart",
          code: `// Switch expression (Dart 3)
String describe(Object obj) => switch (obj) {
  int n when n < 0 => 'negative',
  int n when n == 0 => 'zero',
  int _ => 'positive',
  String s => 'string of length \${s.length}',
  _ => 'unknown',
};

// Destructuring
final (x, y) = (3, 4);
final [first, ...rest] = [1, 2, 3, 4];
final {'name': name, 'age': age} = {'name': 'Vineet', 'age': 28};`,
        },
      ],
    },
  ],
};
