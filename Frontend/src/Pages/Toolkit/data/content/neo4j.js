export default {
  topics: [
    {
      id: "cypher-basics",
      title: "Cypher Basics",
      sections: [
        {
          heading: "Creating nodes & relationships",
          description: "Cypher is Neo4j's query language. Nodes are in (), relationships in -[]->, properties in {}.",
          language: "javascript",
          code: `// Using the official Neo4j JavaScript driver
const { driver, auth } = require("neo4j-driver");
const d = driver("bolt://localhost:7687", auth.basic("neo4j", "password"));
const session = d.session();

// CREATE nodes
await session.run(\`
  CREATE (u:User {id: $id, name: $name, email: $email})
  RETURN u
\`, { id: 1, name: "Vineet", email: "v@devcheats.in" });

// CREATE relationship
await session.run(\`
  MATCH  (a:User {id: $fromId})
  MATCH  (b:User {id: $toId})
  CREATE (a)-[:FOLLOWS {since: date()}]->(b)
\`, { fromId: 1, toId: 2 });`,
        },
        {
          heading: "MATCH — reading the graph",
          description: "MATCH finds patterns in the graph. WHERE adds filters; RETURN selects output.",
          language: "javascript",
          code: `// Find a node
const result = await session.run(\`
  MATCH (u:User {email: $email})
  RETURN u
\`, { email: "v@devcheats.in" });

const user = result.records[0]?.get("u").properties;

// Find relationships
await session.run(\`
  MATCH (a:User)-[:FOLLOWS]->(b:User)
  WHERE a.id = $id
  RETURN b.name AS following
\`, { id: 1 });

// Count
await session.run(\`
  MATCH (u:User)-[:FOLLOWS]->(other)
  RETURN u.name, COUNT(other) AS followingCount
  ORDER BY followingCount DESC
  LIMIT 10
\`);`,
        },
        {
          heading: "MERGE — upsert pattern",
          description: "MERGE matches a pattern or creates it if not found — the graph equivalent of upsert.",
          language: "javascript",
          code: `// Create user if not exists
await session.run(\`
  MERGE (u:User {email: $email})
  ON CREATE SET u.name = $name, u.createdAt = datetime()
  ON MATCH  SET u.lastSeen = datetime()
  RETURN u
\`, { email: "v@devcheats.in", name: "Vineet" });

// Ensure relationship exists
await session.run(\`
  MATCH (a:User {id: $fromId}), (b:User {id: $toId})
  MERGE (a)-[r:FOLLOWS]->(b)
  ON CREATE SET r.since = date()
  RETURN r
\`, { fromId: 1, toId: 2 });`,
        },
      ],
    },
    {
      id: "patterns",
      title: "Graph Patterns",
      sections: [
        {
          heading: "Path queries",
          description: "Variable-length paths use * to traverse multiple hops. Perfect for friends-of-friends.",
          language: "javascript",
          code: `// Direct friends
await session.run(\`
  MATCH (u:User {id: $id})-[:FOLLOWS]->(friend:User)
  RETURN friend.name
\`, { id: 1 });

// Friends of friends (2 hops)
await session.run(\`
  MATCH (u:User {id: $id})-[:FOLLOWS*2]->(fof:User)
  WHERE NOT (u)-[:FOLLOWS]->(fof) AND fof.id <> $id
  RETURN DISTINCT fof.name
\`, { id: 1 });

// Shortest path between two nodes
await session.run(\`
  MATCH p = shortestPath(
    (a:User {id: $from})-[:FOLLOWS*]-(b:User {id: $to})
  )
  RETURN length(p) AS hops, [n IN nodes(p) | n.name] AS path
\`, { from: 1, to: 5 });`,
        },
        {
          heading: "Recommendations",
          description: "Graph traversal naturally produces content and people recommendations.",
          language: "javascript",
          code: `// People you might know (followed by people you follow)
await session.run(\`
  MATCH (me:User {id: $id})-[:FOLLOWS]->(friend)-[:FOLLOWS]->(suggestion)
  WHERE NOT (me)-[:FOLLOWS]->(suggestion)
    AND suggestion.id <> $id
  RETURN suggestion.name, COUNT(friend) AS mutuals
  ORDER BY mutuals DESC
  LIMIT 10
\`, { id: 1 });

// Content recommendations based on tags
await session.run(\`
  MATCH (me:User {id: $id})-[:INTERESTED_IN]->(tag:Tag)
        <-[:TAGGED]-(post:Post)
  WHERE NOT (me)-[:READ]->(post)
  RETURN post.title, COUNT(tag) AS relevance
  ORDER BY relevance DESC
  LIMIT 20
\`, { id: 1 });`,
        },
      ],
    },
    {
      id: "indexes-neo4j",
      title: "Indexes & Constraints",
      sections: [
        {
          heading: "Creating indexes",
          description: "Create indexes on properties used in MATCH WHERE clauses for performance.",
          language: "javascript",
          code: `// Node property index
await session.run("CREATE INDEX user_email IF NOT EXISTS FOR (u:User) ON (u.email)");
await session.run("CREATE INDEX post_id    IF NOT EXISTS FOR (p:Post) ON (p.id)");

// Composite index
await session.run(\`
  CREATE INDEX user_name_email IF NOT EXISTS
  FOR (u:User) ON (u.name, u.email)
\`);

// Full-text index (for search)
await session.run(\`
  CREATE FULLTEXT INDEX post_search IF NOT EXISTS
  FOR (p:Post) ON EACH [p.title, p.body]
\`);

// Search using full-text
await session.run(\`
  CALL db.index.fulltext.queryNodes("post_search", "react hooks")
  YIELD node, score
  RETURN node.title, score
  ORDER BY score DESC
\`);`,
        },
        {
          heading: "Constraints",
          description: "Constraints enforce data integrity — uniqueness and existence — at the database level.",
          language: "javascript",
          code: `// Unique constraint
await session.run(\`
  CREATE CONSTRAINT user_email_unique IF NOT EXISTS
  FOR (u:User) REQUIRE u.email IS UNIQUE
\`);

// Property existence constraint (Enterprise)
await session.run(\`
  CREATE CONSTRAINT user_name_exists IF NOT EXISTS
  FOR (u:User) REQUIRE u.name IS NOT NULL
\`);

// List all constraints
await session.run("SHOW CONSTRAINTS");`,
        },
      ],
    },
  ],
};
