export default {
  topics: [
    {
      id: "pointers",
      title: "Pointers & Memory",
      sections: [
        {
          heading: "Pointer basics",
          description: "A pointer holds the memory address of another variable. & gets the address; * dereferences it.",
          language: "c",
          code: `#include <stdio.h>

int main(void) {
    int x = 42;

    int *ptr = &x;       // ptr holds the address of x

    printf("Value: %d\\n",  x);      // 42
    printf("Address: %p\\n", ptr);   // address, e.g. 0x7ffd...
    printf("Via ptr: %d\\n", *ptr);  // 42 — dereference

    *ptr = 100;   // modify x through the pointer
    printf("x is now: %d\\n", x);   // 100

    return 0;
}`,
        },
        {
          heading: "Dynamic memory",
          description: "malloc/calloc allocate heap memory; free releases it. Always check for NULL and free every malloc.",
          language: "c",
          code: `#include <stdlib.h>
#include <string.h>

// Allocate array of 10 ints
int *arr = malloc(10 * sizeof(int));
if (arr == NULL) { /* allocation failed */ exit(1); }

// Zero-initialised allocation
int *zeros = calloc(10, sizeof(int));

// Resize
arr = realloc(arr, 20 * sizeof(int));

// Use
for (int i = 0; i < 10; i++) arr[i] = i * i;

// Always free heap memory
free(arr);
free(zeros);
arr = NULL;   // avoid dangling pointer`,
        },
        {
          heading: "Pointer arithmetic",
          description: "Adding 1 to a pointer advances it by sizeof(type) bytes — the basis of array iteration.",
          language: "c",
          code: `int arr[] = {10, 20, 30, 40, 50};
int *p = arr;           // points to arr[0]

printf("%d\\n", *p);    // 10
p++;
printf("%d\\n", *p);    // 20

// Iterate with pointer
for (int *q = arr; q < arr + 5; q++) {
    printf("%d ", *q);  // 10 20 30 40 50
}

// Pointer difference
ptrdiff_t dist = (arr + 5) - arr;  // 5`,
        },
      ],
    },
    {
      id: "structs",
      title: "Structs & Unions",
      sections: [
        {
          heading: "Struct definition",
          description: "Structs group related data into a named type. typedef removes the struct keyword from usage.",
          language: "c",
          code: `#include <stdio.h>

typedef struct {
    int   id;
    char  name[64];
    float score;
} Student;

int main(void) {
    Student s = { .id = 1, .name = "Alice", .score = 95.5f };

    printf("Name: %s, Score: %.1f\\n", s.name, s.score);

    // Pointer to struct — use -> to access members
    Student *sp = &s;
    printf("Via pointer: %s\\n", sp->name);

    return 0;
}`,
        },
        {
          heading: "Struct with pointer members",
          description: "Use pointers inside structs to build linked lists, trees, and graphs.",
          language: "c",
          code: `typedef struct Node {
    int           value;
    struct Node  *next;   // pointer to same type
} Node;

Node *push(Node *head, int value) {
    Node *node = malloc(sizeof(Node));
    node->value = value;
    node->next  = head;
    return node;
}

void print_list(Node *head) {
    for (Node *n = head; n != NULL; n = n->next)
        printf("%d -> ", n->value);
    printf("NULL\\n");
}`,
        },
      ],
    },
    {
      id: "arrays-strings",
      title: "Arrays & Strings",
      sections: [
        {
          heading: "Arrays",
          description: "C arrays are contiguous memory blocks. The name decays to a pointer to the first element.",
          language: "c",
          code: `// Declare and initialise
int  scores[5] = {90, 85, 92, 88, 79};
char vowels[]  = {'a','e','i','o','u'};   // size inferred = 5

// 2D array
int matrix[3][3] = {
    {1, 2, 3},
    {4, 5, 6},
    {7, 8, 9},
};

// Pass to function — must pass size separately
void print_array(const int *arr, size_t len) {
    for (size_t i = 0; i < len; i++)
        printf("%d ", arr[i]);
}
print_array(scores, 5);`,
        },
        {
          heading: "Strings",
          description: "C strings are null-terminated char arrays. Use the <string.h> library for manipulation.",
          language: "c",
          code: `#include <string.h>
#include <stdio.h>

char name[32] = "Vineet";

strlen(name);              // 6 (excludes null terminator)
strcpy(name, "Priya");    // copy — ensure dest is large enough
strcat(name, " Chandel"); // concatenate — ensure space
strcmp("abc", "abc");     // 0 if equal

// Safe variants (prefer these)
strncpy(name, "Vineet Chandel", sizeof(name) - 1);
snprintf(name, sizeof(name), "Hello, %s!", "World");

// Heap string
char *s = malloc(64);
snprintf(s, 64, "Dynamic: %d", 42);
free(s);`,
        },
      ],
    },
    {
      id: "functions",
      title: "Functions & Scope",
      sections: [
        {
          heading: "Function pointers",
          description: "Functions are first-class in C via pointers — enables callbacks and strategy patterns.",
          language: "c",
          code: `#include <stdio.h>

int add(int a, int b) { return a + b; }
int mul(int a, int b) { return a * b; }

// Function pointer type: takes two ints, returns int
typedef int (*BinaryOp)(int, int);

int apply(int a, int b, BinaryOp op) {
    return op(a, b);
}

int main(void) {
    printf("%d\\n", apply(3, 4, add));  // 7
    printf("%d\\n", apply(3, 4, mul));  // 12

    // Array of function pointers
    BinaryOp ops[] = { add, mul };
    for (int i = 0; i < 2; i++)
        printf("%d\\n", ops[i](5, 2));  // 7, 10
    return 0;
}`,
        },
      ],
    },
  ],
};
