export default {
  topics: [
    {
      id: "schema",
      title: "Schema Definition",
      sections: [
        {
          heading: "Types & fields",
          description: "The SDL (Schema Definition Language) describes your data graph. ! means non-null.",
          language: "javascript",
          code: `const typeDefs = \`
  type User {
    id:       ID!
    name:     String!
    email:    String!
    posts:    [Post!]!
    role:     Role!
  }

  enum Role {
    USER
    ADMIN
  }

  type Post {
    id:        ID!
    title:     String!
    body:      String
    author:    User!
    createdAt: String!
  }

  type Query {
    user(id: ID!): User
    users:         [User!]!
    post(id: ID!): Post
  }
\`;`,
        },
        {
          heading: "Input types",
          description: "Input types are separate from object types — they're used exclusively as mutation arguments.",
          language: "javascript",
          code: `const typeDefs = \`
  input CreatePostInput {
    title:    String!
    body:     String
    authorId: ID!
  }

  input UpdatePostInput {
    title: String
    body:  String
  }

  type Mutation {
    createPost(input: CreatePostInput!): Post!
    updatePost(id: ID!, input: UpdatePostInput!): Post
    deletePost(id: ID!): Boolean!
  }
\`;`,
        },
      ],
    },
    {
      id: "queries",
      title: "Queries",
      sections: [
        {
          heading: "Basic query",
          description: "The client specifies exactly which fields it needs — no over/under-fetching.",
          language: "javascript",
          code: `// Client query
const GET_USER = \`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      name
      email
      posts {
        id
        title
      }
    }
  }
\`;

// With variables
const { data } = await client.query({
  query: GET_USER,
  variables: { id: "42" },
});`,
        },
        {
          heading: "Fragments",
          description: "Fragments are reusable field selections — avoid repeating the same fields in multiple queries.",
          language: "javascript",
          code: `fragment UserFields on User {
  id
  name
  email
}

query GetUsers {
  users {
    ...UserFields
    role
  }
}

query GetPost($id: ID!) {
  post(id: $id) {
    id
    title
    author {
      ...UserFields
    }
  }
}`,
        },
        {
          heading: "Aliases & directives",
          description: "Aliases rename fields in the response; @include / @skip conditionally fetch fields.",
          language: "javascript",
          code: `query Dashboard($isAdmin: Boolean!) {
  # Alias — fetch same field twice with different args
  published:   posts(filter: { published: true })  { id title }
  unpublished: posts(filter: { published: false }) { id title }

  # Directive — only include if isAdmin is true
  adminStats @include(if: $isAdmin) {
    totalUsers
    totalPosts
  }
}`,
        },
      ],
    },
    {
      id: "mutations",
      title: "Mutations",
      sections: [
        {
          heading: "Sending mutations",
          description: "Mutations modify server-side data. Always return the affected object so the client can update its cache.",
          language: "javascript",
          code: `const CREATE_POST = \`
  mutation CreatePost($input: CreatePostInput!) {
    createPost(input: $input) {
      id
      title
      createdAt
    }
  }
\`;

const { data } = await client.mutate({
  mutation: CREATE_POST,
  variables: {
    input: { title: "Hello GraphQL", authorId: "1" },
  },
});
console.log("Created:", data.createPost.id);`,
        },
        {
          heading: "Optimistic updates (Apollo)",
          description: "Provide optimisticResponse to update the UI instantly before the server confirms.",
          language: "javascript",
          code: `client.mutate({
  mutation: LIKE_POST,
  variables: { postId: "42" },
  optimisticResponse: {
    likePost: {
      __typename: "Post",
      id: "42",
      likesCount: currentPost.likesCount + 1,
    },
  },
});`,
        },
      ],
    },
    {
      id: "resolvers",
      title: "Resolvers",
      sections: [
        {
          heading: "Resolver map",
          description: "Resolvers are functions that fetch data for each field. They mirror the type structure in the schema.",
          language: "javascript",
          code: `const resolvers = {
  Query: {
    user:  (_, { id }, ctx) => ctx.db.users.findById(id),
    users: (_, __, ctx)     => ctx.db.users.findAll(),
  },

  Mutation: {
    createPost: async (_, { input }, ctx) => {
      if (!ctx.user) throw new Error("Unauthorized");
      return ctx.db.posts.create({ ...input, authorId: ctx.user.id });
    },
  },

  // Field-level resolver — runs for every User.posts request
  User: {
    posts: (user, _, ctx) => ctx.db.posts.findByAuthorId(user.id),
  },
};`,
        },
        {
          heading: "DataLoader — batching & caching",
          description: "DataLoader batches N+1 queries into a single DB call per request.",
          language: "javascript",
          code: `import DataLoader from "dataloader";

function createLoaders(db) {
  return {
    user: new DataLoader(async (ids) => {
      const users = await db.users.findByIds(ids);
      // Must return results in the same order as ids
      return ids.map((id) => users.find((u) => u.id === id));
    }),
  };
}

// In context (per-request):
const context = { db, loaders: createLoaders(db) };

// In resolver — one batched query for all users:
User: {
  posts: (user, _, { loaders }) => loaders.user.load(user.id),
}`,
        },
      ],
    },
  ],
};
