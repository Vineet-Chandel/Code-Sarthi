export default {
  title: "REST API",
  description: "A standard architectural style for designing networked applications and web services.",
  topics: [
    {
      id: "basics",
      title: "Basics of REST",
      subtopics: [
        {
          id: "what-is-rest",
          title: "What is REST?",
          description: "REST (Representational State Transfer) is an architectural style that defines a set of constraints to be used for creating web services.",
          code: `// An example of a simple RESTful GET request
fetch('https://api.example.com/users')
  .then(response => response.json())
  .then(data => console.log(data));`
        },
        {
          id: "http-methods",
          title: "HTTP Methods",
          description: "REST uses standard HTTP methods: GET (read), POST (create), PUT/PATCH (update), and DELETE (remove).",
          code: `// A POST request to create a new user
fetch('https://api.example.com/users', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ name: 'John Doe' })
});`
        }
      ]
    },
    {
      id: "best-practices",
      title: "Best Practices",
      subtopics: [
        {
          id: "status-codes",
          title: "Status Codes",
          description: "Always return the appropriate HTTP status codes (e.g., 200 OK, 201 Created, 400 Bad Request, 404 Not Found, 500 Internal Server Error).",
          code: `// Example Express handler returning proper status code
app.get('/users/:id', (req, res) => {
  const user = db.find(req.params.id);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.status(200).json(user);
});`
        }
      ]
    }
  ]
};
