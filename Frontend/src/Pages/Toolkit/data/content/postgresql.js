export default {
  topics: [
    {
      id: "queries",
      title: "Queries & Filtering",
      sections: [
        {
          heading: "Core SQL",
          description: "PostgreSQL is ANSI SQL with powerful extensions. Use RETURNING to get the result of a mutation.",
          language: "sql",
          code: `-- Basic select with aliases
SELECT id, name AS full_name, created_at
FROM users
WHERE active = true
  AND created_at > NOW() - INTERVAL '30 days'
ORDER BY created_at DESC
LIMIT 20 OFFSET 0;

-- RETURNING — get the inserted/updated row
INSERT INTO posts (title, author_id)
VALUES ('Hello PG', 1)
RETURNING id, created_at;

UPDATE users SET active = false WHERE last_seen < NOW() - INTERVAL '1 year'
RETURNING id, name;

-- UPSERT with ON CONFLICT
INSERT INTO user_stats (user_id, views)
VALUES (1, 1)
ON CONFLICT (user_id)
DO UPDATE SET views = user_stats.views + EXCLUDED.views;`,
        },
        {
          heading: "JSON & JSONB",
          description: "JSONB stores binary JSON with indexing support — ideal for semi-structured data.",
          language: "sql",
          code: `-- Create table with JSONB column
CREATE TABLE events (
  id      SERIAL PRIMARY KEY,
  payload JSONB NOT NULL,
  created TIMESTAMPTZ DEFAULT NOW()
);

-- Insert JSON
INSERT INTO events (payload)
VALUES ('{"type": "user.created", "userId": 42, "meta": {"ip": "1.2.3.4"}}');

-- Query JSON fields
SELECT payload->>'type' AS event_type,
       (payload->>'userId')::int AS user_id
FROM events
WHERE payload->>'type' = 'user.created';

-- Nested access
SELECT payload->'meta'->>'ip' AS ip FROM events;

-- GIN index for fast JSON queries
CREATE INDEX idx_events_payload ON events USING GIN (payload);
SELECT * FROM events WHERE payload @> '{"type": "user.created"}';`,
        },
      ],
    },
    {
      id: "advanced-queries",
      title: "CTEs & Window Functions",
      sections: [
        {
          heading: "Common Table Expressions",
          description: "CTEs (WITH) break complex queries into readable named subqueries. Use RECURSIVE for hierarchical data.",
          language: "sql",
          code: `-- Multi-step CTE
WITH
  active AS (
    SELECT id, name FROM users WHERE active = true
  ),
  post_counts AS (
    SELECT author_id, COUNT(*) AS posts
    FROM posts
    WHERE published = true
    GROUP BY author_id
  )
SELECT u.name, COALESCE(p.posts, 0) AS published_posts
FROM active u
LEFT JOIN post_counts p ON u.id = p.author_id
ORDER BY published_posts DESC;

-- Recursive CTE — org chart / tree
WITH RECURSIVE org AS (
  SELECT id, name, manager_id, 0 AS level
  FROM employees WHERE manager_id IS NULL
  UNION ALL
  SELECT e.id, e.name, e.manager_id, o.level + 1
  FROM employees e JOIN org o ON e.manager_id = o.id
)
SELECT * FROM org ORDER BY level, name;`,
        },
        {
          heading: "Window functions",
          description: "Compute aggregates over a sliding window without collapsing rows.",
          language: "sql",
          code: `SELECT
  name,
  department,
  salary,
  -- Rank within department
  RANK() OVER (PARTITION BY department ORDER BY salary DESC) AS dept_rank,
  -- Running total
  SUM(salary) OVER (ORDER BY id ROWS UNBOUNDED PRECEDING) AS running_total,
  -- Moving average (last 3 rows)
  AVG(salary) OVER (ORDER BY id ROWS BETWEEN 2 PRECEDING AND CURRENT ROW) AS moving_avg,
  -- Lead/lag
  LAG(salary, 1) OVER (ORDER BY id) AS prev_salary,
  salary - LAG(salary, 1) OVER (ORDER BY id) AS salary_change
FROM employees;`,
        },
      ],
    },
    {
      id: "full-text",
      title: "Full-Text Search",
      sections: [
        {
          heading: "tsvector & tsquery",
          description: "PostgreSQL's built-in full-text search is powerful enough for many use cases without Elasticsearch.",
          language: "sql",
          code: `-- Add a search vector column
ALTER TABLE posts ADD COLUMN search_vector TSVECTOR;

-- Populate it
UPDATE posts
SET search_vector = to_tsvector('english', title || ' ' || COALESCE(body, ''));

-- GIN index for speed
CREATE INDEX idx_posts_search ON posts USING GIN(search_vector);

-- Search
SELECT id, title
FROM posts
WHERE search_vector @@ plainto_tsquery('english', 'react hooks')
ORDER BY ts_rank(search_vector, plainto_tsquery('english', 'react hooks')) DESC;

-- Auto-update via trigger
CREATE TRIGGER posts_search_update
BEFORE INSERT OR UPDATE ON posts
FOR EACH ROW EXECUTE FUNCTION
  tsvector_update_trigger(search_vector, 'pg_catalog.english', title, body);`,
        },
      ],
    },
    {
      id: "arrays-types",
      title: "Arrays & Special Types",
      sections: [
        {
          heading: "Arrays",
          description: "PostgreSQL arrays are first-class. Use ANY() and @> for containment queries.",
          language: "sql",
          code: `-- Create with array column
CREATE TABLE posts (
  id    SERIAL PRIMARY KEY,
  title TEXT,
  tags  TEXT[]
);

INSERT INTO posts (title, tags) VALUES ('Hello', ARRAY['react', 'typescript']);

-- Query arrays
SELECT * FROM posts WHERE 'react' = ANY(tags);
SELECT * FROM posts WHERE tags @> ARRAY['react', 'typescript'];  -- contains both

-- Update arrays
UPDATE posts SET tags = tags || ARRAY['new-tag'] WHERE id = 1;
UPDATE posts SET tags = array_remove(tags, 'old-tag') WHERE id = 1;`,
        },
        {
          heading: "Useful PostgreSQL types",
          description: "Leverage Postgres-specific types to avoid storing data as strings.",
          language: "sql",
          code: `CREATE TABLE sessions (
  id         UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    INT,
  ip_address INET,             -- stores IP addresses + validates
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  valid_until TIMESTAMPTZ,
  metadata   JSONB,
  tags       TEXT[]
);

-- UUID generation
SELECT gen_random_uuid();       -- built-in (pg 13+)

-- Interval arithmetic
SELECT NOW() + INTERVAL '7 days';
SELECT AGE(NOW(), created_at) FROM sessions;`,
        },
      ],
    },
  ],
};
