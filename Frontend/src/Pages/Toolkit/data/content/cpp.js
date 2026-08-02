export default {
  topics: [
    {
      id: "modern-basics",
      title: "Modern C++ & Basics",
      sections: [
        {
          heading: "Auto & References",
          description: "Use auto for type deduction and references (& and const &) to pass large objects cleanly without unnecessary copying.",
          language: "cpp",
          code: `#include <iostream>
#include <vector>
#include <string>

void print_greeting(const std::string& name) {
    std::cout << "Hello, " << name << "!\\n";
}

int main() {
    auto number = 42;                // int
    auto pi = 3.14159;               // double
    std::string user = "Vineet";

    // Range-based for loop with const reference to avoid copying
    std::vector<std::string> names = {"Alice", "Bob", "Charlie"};
    for (const auto& name : names) {
        print_greeting(name);
    }

    return 0;
}`,
        },
        {
          heading: "Structured Bindings (C++17)",
          description: "Deconstruct pairs, tuples, and structs conveniently into standalone variables using structured bindings.",
          language: "cpp",
          code: `#include <iostream>
#include <tuple>
#include <map>

std::tuple<std::string, int, double> get_player_info() {
    return {"Hero", 10, 99.5};
}

int main() {
    // Unpack tuple directly into variables
    auto [name, level, health] = get_player_info();
    std::cout << name << " (Lvl " << level << ") HP: " << health << "\\n";

    // Iterating over a map with structured bindings
    std::map<std::string, int> scores = {{"Alice", 100}, {"Bob", 85}};
    for (const auto& [player, score] : scores) {
        std::cout << player << ": " << score << "\\n";
    }

    return 0;
}`,
        },
      ],
    },
    {
      id: "stl-containers",
      title: "STL Containers & Algorithms",
      sections: [
        {
          heading: "Vectors & Maps",
          description: "std::vector provides dynamic arrays, while std::unordered_map provides O(1) average lookup hash tables.",
          language: "cpp",
          code: `#include <iostream>
#include <vector>
#include <unordered_map>

int main() {
    // Dynamic vector
    std::vector<int> numbers = {5, 2, 8, 1, 9};
    numbers.push_back(4);

    // Fast lookup with unordered_map (Hash table)
    std::unordered_map<std::string, int> ages;
    ages["Alice"] = 28;
    ages["Bob"] = 34;

    if (ages.find("Alice") != ages.end()) {
        std::cout << "Alice is in the map with age " << ages["Alice"] << "\\n";
    }

    return 0;
}`,
        },
        {
          heading: "STL Algorithms",
          description: "Use algorithms like std::sort, std::find_if, and std::accumulate with iterators and lambda expressions.",
          language: "cpp",
          code: `#include <iostream>
#include <vector>
#include <algorithm>
#include <numeric>

int main() {
    std::vector<int> nums = {4, 1, 8, 3, 2};

    // Sort in ascending order
    std::sort(nums.begin(), nums.end());

    // Sum all elements using accumulate
    int sum = std::accumulate(nums.begin(), nums.end(), 0);
    std::cout << "Sum: " << sum << "\\n";

    // Find first even number using lambda
    auto it = std::find_if(nums.begin(), nums.end(), [](int n) {
        return n % 2 == 0;
    });

    if (it != nums.end()) {
        std::cout << "First even number: " << *it << "\\n";
    }

    return 0;
}`,
        },
      ],
    },
    {
      id: "smart-pointers",
      title: "Smart Pointers & Memory",
      sections: [
        {
          heading: "Unique Pointer (std::unique_ptr)",
          description: "Provides exclusive ownership of dynamically allocated memory and frees it automatically when exiting scope (RAII).",
          language: "cpp",
          code: `#include <iostream>
#include <memory>

class Resource {
public:
    Resource() { std::cout << "Resource acquired\\n"; }
    ~Resource() { std::cout << "Resource destroyed\\n"; }
    void work() { std::cout << "Working...\\n"; }
};

int main() {
    // Prefer make_unique over bare new
    std::unique_ptr<Resource> ptr = std::make_unique<Resource>();
    ptr->work();

    // Ownership can be moved, but not copied
    std::unique_ptr<Resource> new_ptr = std::move(ptr);
    
    // Resource destroyed automatically when new_ptr goes out of scope!
    return 0;
}`,
        },
        {
          heading: "Shared & Weak Pointers",
          description: "std::shared_ptr allows reference-counted shared ownership; std::weak_ptr prevents reference cycles.",
          language: "cpp",
          code: `#include <iostream>
#include <memory>

class Data {
public:
    int value;
    Data(int v) : value(v) {}
};

int main() {
    std::shared_ptr<Data> sp1 = std::make_shared<Data>(42);
    std::cout << "Count: " << sp1.use_count() << "\\n"; // 1

    {
        std::shared_ptr<Data> sp2 = sp1; // Share ownership
        std::cout << "Count: " << sp1.use_count() << "\\n"; // 2
        
        std::weak_ptr<Data> wp = sp1;    // Does not increase reference count
        if (auto locked = wp.lock()) {
            std::cout << "Value via weak_ptr: " << locked->value << "\\n";
        }
    } // sp2 goes out of scope

    std::cout << "Final Count: " << sp1.use_count() << "\\n"; // 1
    return 0;
}`,
        },
      ],
    },
    {
      id: "oop-classes",
      title: "Classes & OOP",
      sections: [
        {
          heading: "Classes & Constructors",
          description: "Define custom types encapsulating state and behavior, utilizing member initializer lists and const methods.",
          language: "cpp",
          code: `#include <iostream>
#include <string>

class Player {
private:
    std::string name;
    int health;

public:
    // Member initializer list
    Player(std::string_view n, int h) : name(n), health(h) {}

    // Const member function guarantees no modification to member variables
    void get_status() const {
        std::cout << name << " has " << health << " HP.\\n";
    }

    void take_damage(int amount) {
        health -= amount;
        if (health < 0) health = 0;
    }
};

int main() {
    Player p("Hero", 100);
    p.take_damage(25);
    p.get_status();
    return 0;
}`,
        },
        {
          heading: "Inheritance & Polymorphism",
          description: "Achieve runtime polymorphism via virtual destructors and methods marked with override.",
          language: "cpp",
          code: `#include <iostream>
#include <vector>
#include <memory>

class Shape {
public:
    virtual ~Shape() = default; // Always make base class destructors virtual
    virtual double area() const = 0; // Pure virtual method (interface)
};

class Circle : public Shape {
private:
    double radius;
public:
    explicit Circle(double r) : radius(r) {}
    double area() const override { return 3.14159 * radius * radius; }
};

class Rectangle : public Shape {
private:
    double width, height;
public:
    Rectangle(double w, double h) : width(w), height(h) {}
    double area() const override { return width * height; }
};

int main() {
    std::vector<std::unique_ptr<Shape>> shapes;
    shapes.push_back(std::make_unique<Circle>(5.0));
    shapes.push_back(std::make_unique<Rectangle>(4.0, 6.0));

    for (const auto& shape : shapes) {
        std::cout << "Area: " << shape->area() << "\\n";
    }
    return 0;
}`,
        },
      ],
    },
    {
      id: "templates",
      title: "Templates & Generics",
      sections: [
        {
          heading: "Function & Class Templates",
          description: "Write type-agnostic, generic algorithms and data structures resolved at compile-time with zero overhead.",
          language: "cpp",
          code: `#include <iostream>

// Function template
template <typename T>
T clamp(T val, T min_val, T max_val) {
    if (val < min_val) return min_val;
    if (val > max_val) return max_val;
    return val;
}

// Class template
template <typename T, int Size>
class FixedArray {
private:
    T data[Size];
public:
    void set(int idx, T val) {
        if (idx >= 0 && idx < Size) data[idx] = val;
    }
    T get(int idx) const { return data[idx]; }
};

int main() {
    std::cout << clamp(105, 0, 100) << "\\n";    // 100 (int)
    std::cout << clamp(-1.5, 0.0, 1.0) << "\\n"; // 0.0 (double)

    FixedArray<std::string, 3> words;
    words.set(0, "Modern");
    words.set(1, "C++");
    std::cout << words.get(0) << " " << words.get(1) << "\\n";

    return 0;
}`,
        },
      ],
    },
  ],
};
