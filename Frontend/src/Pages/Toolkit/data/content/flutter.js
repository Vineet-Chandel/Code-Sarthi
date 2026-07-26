export default {
  topics: [
    {
      id: "widgets",
      title: "Widgets",
      sections: [
        {
          heading: "Widget basics",
          description: "Everything in Flutter is a widget. Stateless widgets render from immutable data; Stateful widgets manage mutable state.",
          language: "dart",
          code: `import 'package:flutter/material.dart';

// Stateless — pure function of its properties
class GreetingCard extends StatelessWidget {
  final String name;
  const GreetingCard({super.key, required this.name});

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Text(
          'Hello, $name!',
          style: Theme.of(context).textTheme.headlineMedium,
        ),
      ),
    );
  }
}`,
        },
        {
          heading: "StatefulWidget",
          description: "Use StatefulWidget when the widget needs to rebuild in response to internal changes.",
          language: "dart",
          code: `class Counter extends StatefulWidget {
  const Counter({super.key});

  @override
  State<Counter> createState() => _CounterState();
}

class _CounterState extends State<Counter> {
  int _count = 0;

  void _increment() => setState(() => _count++);

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text('Count: $_count', style: const TextStyle(fontSize: 24)),
        ElevatedButton(
          onPressed: _increment,
          child: const Text('Increment'),
        ),
      ],
    );
  }
}`,
        },
        {
          heading: "Common widgets",
          description: "Flutter's Material widget library covers 90% of common UI patterns.",
          language: "dart",
          code: `// Text
Text('Hello', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold))

// Image
Image.network('https://example.com/photo.jpg', fit: BoxFit.cover)
Image.asset('assets/logo.png', width: 100)

// Button variants
ElevatedButton(onPressed: () {}, child: const Text('Elevated'))
TextButton(onPressed: () {}, child: const Text('Text'))
IconButton(icon: const Icon(Icons.add), onPressed: () {})

// TextField
TextField(
  decoration: const InputDecoration(labelText: 'Email', hintText: 'you@example.com'),
  onChanged: (val) => print(val),
)`,
        },
      ],
    },
    {
      id: "layout",
      title: "Layout",
      sections: [
        {
          heading: "Column, Row & Stack",
          description: "Column is vertical flex; Row is horizontal. Stack layers widgets on top of each other.",
          language: "dart",
          code: `// Column
Column(
  mainAxisAlignment: MainAxisAlignment.center,
  crossAxisAlignment: CrossAxisAlignment.start,
  children: [
    const Text('Title'),
    const SizedBox(height: 8),
    const Text('Subtitle'),
  ],
)

// Row
Row(
  mainAxisAlignment: MainAxisAlignment.spaceBetween,
  children: [
    const Icon(Icons.menu),
    const Text('DevCheats'),
    const Icon(Icons.search),
  ],
)

// Expanded — takes remaining space
Row(children: [
  const Icon(Icons.star),
  Expanded(child: const Text('Long label that fills space')),
  const Text('42'),
])`,
        },
        {
          heading: "ListView & GridView",
          description: "ListView.builder and GridView.builder virtualise long lists.",
          language: "dart",
          code: `// ListView.builder
ListView.builder(
  itemCount: items.length,
  itemBuilder: (context, index) {
    final item = items[index];
    return ListTile(
      leading: const Icon(Icons.code),
      title: Text(item.title),
      subtitle: Text(item.subtitle),
      onTap: () => Navigator.push(context, ...),
    );
  },
)

// GridView
GridView.builder(
  gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
    crossAxisCount: 2,
    crossAxisSpacing: 12,
    mainAxisSpacing: 12,
    childAspectRatio: 1.2,
  ),
  itemCount: technologies.length,
  itemBuilder: (_, i) => TechCard(tech: technologies[i]),
)`,
        },
      ],
    },
    {
      id: "state",
      title: "State Management",
      sections: [
        {
          heading: "Provider (recommended)",
          description: "Provider wraps ChangeNotifier in an InheritedWidget for simple, testable state.",
          language: "dart",
          code: `import 'package:provider/provider.dart';

// Model
class CartModel extends ChangeNotifier {
  final List<Item> _items = [];
  List<Item> get items => List.unmodifiable(_items);
  int get total => _items.fold(0, (sum, i) => sum + i.price);

  void add(Item item) {
    _items.add(item);
    notifyListeners();  // triggers rebuild of listening widgets
  }
}

// Provide
void main() => runApp(
  ChangeNotifierProvider(create: (_) => CartModel(), child: const MyApp()),
);

// Consume
class CartButton extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final cart = context.watch<CartModel>();
    return Badge(label: Text('\${cart.items.length}'), child: const Icon(Icons.cart));
  }
}`,
        },
      ],
    },
    {
      id: "navigation-flutter",
      title: "Navigation",
      sections: [
        {
          heading: "Navigator 2.0 — GoRouter",
          description: "GoRouter is the recommended URL-based router for Flutter, especially for web.",
          language: "dart",
          code: `import 'package:go_router/go_router.dart';

final router = GoRouter(
  routes: [
    GoRoute(path: '/',        builder: (_, __) => const HomeScreen()),
    GoRoute(
      path: '/post/:id',
      builder: (context, state) {
        final id = state.pathParameters['id']!;
        return PostScreen(id: id);
      },
    ),
  ],
);

// Navigate
context.go('/post/42');
context.push('/settings');   // push onto stack
context.pop();               // go back`,
        },
      ],
    },
  ],
};
