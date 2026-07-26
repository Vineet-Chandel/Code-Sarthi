export default {
  topics: [
    {
      id: "classes",
      title: "Classes & Properties",
      sections: [
        {
          heading: "Class anatomy",
          description: "C# classes support auto-implemented properties, constructors, and expression-bodied members.",
          language: "csharp",
          code: `public class User
{
    // Auto-implemented properties
    public int    Id    { get; init; }     // init-only (record-like)
    public string Name  { get; set; } = "";
    public string Email { get; private set; } = "";

    // Constructor
    public User(int id, string name, string email)
    {
        Id    = id;
        Name  = name;
        Email = email;
    }

    // Expression-bodied method
    public string Greeting => $"Hello, {Name}!";

    public override string ToString() => $"User({Id}, {Name})";
}

// Record — immutable by default, structural equality
public record Point(double X, double Y);
var p1 = new Point(1, 2);
var p2 = p1 with { Y = 5 };  // non-destructive mutation`,
        },
        {
          heading: "Interfaces & abstract classes",
          description: "Interfaces define contracts; abstract classes provide shared implementation.",
          language: "csharp",
          code: `public interface IRepository<T>
{
    Task<T?> GetByIdAsync(int id);
    Task<IEnumerable<T>> GetAllAsync();
    Task<T> CreateAsync(T entity);
    Task DeleteAsync(int id);
}

public abstract class BaseRepository<T> : IRepository<T>
{
    protected readonly DbContext _db;
    protected BaseRepository(DbContext db) => _db = db;

    public abstract Task<T?> GetByIdAsync(int id);
    public async Task<IEnumerable<T>> GetAllAsync() =>
        await _db.Set<T>().ToListAsync();
    // ...
}`,
        },
      ],
    },
    {
      id: "linq",
      title: "LINQ",
      sections: [
        {
          heading: "Method syntax",
          description: "LINQ method syntax chains extension methods on IEnumerable<T> — the preferred style.",
          language: "csharp",
          code: `var users = new List<User>
{
    new(1, "Alice", "a@x.com"),
    new(2, "Bob",   "b@x.com"),
    new(3, "Carol", "c@x.com"),
};

// Filter → project → sort → take
var result = users
    .Where(u => u.Name.Length > 3)
    .Select(u => new { u.Id, u.Name.ToUpperInvariant() })
    .OrderBy(u => u.Id)
    .Take(10)
    .ToList();

// Aggregates
int total  = users.Count;
var first  = users.First(u => u.Id == 1);
var byName = users.ToDictionary(u => u.Name);

// GroupBy
var grouped = users
    .GroupBy(u => u.Name.Length)
    .Select(g => new { Length = g.Key, Count = g.Count() });`,
        },
        {
          heading: "Query syntax",
          description: "SQL-like query syntax compiles to the same method calls — useful for joins.",
          language: "csharp",
          code: `var query = from u in users
            where u.Name.StartsWith("A")
            orderby u.Name
            select new { u.Id, u.Name };

// Join
var userPosts = from u in users
                join p in posts on u.Id equals p.AuthorId
                select new { u.Name, p.Title };`,
        },
      ],
    },
    {
      id: "async",
      title: "Async / Await",
      sections: [
        {
          heading: "Async methods",
          description: "async/await converts async code to a state machine. Always return Task or Task<T>.",
          language: "csharp",
          code: `using System.Net.Http.Json;

public async Task<User?> GetUserAsync(int id, CancellationToken ct = default)
{
    using var http   = new HttpClient();
    var response     = await http.GetAsync($"/api/users/{id}", ct);
    response.EnsureSuccessStatusCode();
    return await response.Content.ReadFromJsonAsync<User>(ct);
}

// Run multiple tasks concurrently
var (users, posts) = await (
    GetUsersAsync(),
    GetPostsAsync()
).WhenAll();

// WhenAll shorthand
var results = await Task.WhenAll(tasks);`,
        },
        {
          heading: "IAsyncEnumerable — streaming",
          description: "Stream results lazily with await foreach — perfect for large datasets or server-sent events.",
          language: "csharp",
          code: `public async IAsyncEnumerable<Post> StreamPostsAsync()
{
    await foreach (var post in dbContext.Posts.AsAsyncEnumerable())
    {
        yield return post;
    }
}

// Consuming
await foreach (var post in StreamPostsAsync())
{
    Console.WriteLine(post.Title);
}`,
        },
      ],
    },
    {
      id: "collections-patterns",
      title: "Collections & Patterns",
      sections: [
        {
          heading: "Collection expressions (C# 12)",
          description: "Unified [] syntax works for arrays, Lists, Spans, and any collection type.",
          language: "csharp",
          code: `// C# 12 collection expressions
int[]         arr  = [1, 2, 3];
List<string>  list = ["HTML", "CSS", "JS"];
Span<int>     span = [10, 20, 30];

// Spread operator
int[] a = [1, 2];
int[] b = [3, 4];
int[] c = [..a, ..b, 5]; // [1, 2, 3, 4, 5]`,
        },
        {
          heading: "Pattern matching",
          description: "switch expressions and pattern matching make complex conditional logic readable.",
          language: "csharp",
          code: `// Switch expression
string Describe(object obj) => obj switch
{
    int n when n < 0  => "negative",
    int n when n == 0 => "zero",
    int                => "positive",
    string s           => $"string of length {s.Length}",
    null               => "null",
    _                  => "unknown"
};

// Property pattern
bool IsAdmin(User user) => user is { Role: "admin", Active: true };

// List pattern (C# 11)
bool StartsWithOne(int[] arr) => arr is [1, ..];`,
        },
      ],
    },
  ],
};
