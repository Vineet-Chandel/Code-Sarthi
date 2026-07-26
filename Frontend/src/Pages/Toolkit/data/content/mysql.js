export default {
  topics: [
    {
      id: "crud",
      title: "CRUD Operations",
      sections: [
        {
          heading: "SELECT",
          description: "Retrieve rows with filtering, sorting, and limiting. Always use WHERE to avoid full-table scans.",
          language: "sql",
          code: `-- Basic select
SELECT * FROM users;
SELECT id, name, email FROM users;

-- Filtering
SELECT * FROM users WHERE active = 1 AND role = 'admin';

-- Pattern matching
SELECT * FROM users WHERE name LIKE 'Vineet%';

-- Sorting & limiting
SELECT * FROM posts ORDER BY created_at DESC LIMIT 10 OFFSET 20;

-- Distinct values
SELECT DISTINCT country FROM users;

-- Count
SELECT COUNT(*) AS total, role FROM users GROUP BY role;`,
        },
        {
          heading: "INSERT, UPDATE, DELETE",
          description: "Always use parameterised queries in application code to prevent SQL injection.",
          language: "sql",
          code: `-- Insert
INSERT INTO users (name, email, role)
VALUES ('Vineet', 'v@devcheats.in', 'admin');

-- Insert multiple rows
INSERT INTO tags (name) VALUES ('javascript'), ('typescript'), ('react');

-- Update
UPDATE users SET active = 0, updated_at = NOW() WHERE id = 42;

-- Upsert (insert or update on duplicate)
INSERT INTO stats (user_id, views) VALUES (1, 1)
ON DUPLICATE KEY UPDATE views = views + 1;

-- Delete
DELETE FROM sessions WHERE expires_at < NOW();`,
        },
      ],
    },
    {
      id: "joins",
      title: "Joins",
      sections: [
        {
          heading: "JOIN types",
          description: "INNER JOIN is the default — returns only matching rows. OUTER joins keep non-matching rows.",
          language: "sql",
          code: `-- INNER JOIN — only matching rows
SELECT u.name, p.title
FROM users u
INNER JOIN posts p ON u.id = p.author_id;

-- LEFT JOIN — all users, even with no posts
SELECT u.name, COUNT(p.id) AS post_count
FROM users u
LEFT JOIN posts p ON u.id = p.author_id
GROUP BY u.id, u.name;

-- Multiple joins
SELECT u.name, p.title, c.body
FROM users u
JOIN posts p ON u.id = p.author_id
JOIN comments c ON p.id = c.post_id
WHERE u.active = 1;`,
        },
        {
          heading: "Subqueries",
          description: "Subqueries can appear in SELECT, FROM, or WHERE. CTEs (WITH) are more readable for complex cases.",
          language: "sql",
          code: `-- Subquery in WHERE
SELECT * FROM posts
WHERE author_id IN (SELECT id FROM users WHERE role = 'admin');

-- Subquery in SELECT (correlated)
SELECT name,
  (SELECT COUNT(*) FROM posts WHERE author_id = u.id) AS post_count
FROM users u;

-- CTE — cleaner for multi-step logic
WITH active_users AS (
  SELECT id, name FROM users WHERE active = 1
),
user_stats AS (
  SELECT author_id, COUNT(*) AS posts FROM posts GROUP BY author_id
)
SELECT u.name, COALESCE(s.posts, 0) AS total_posts
FROM active_users u
LEFT JOIN user_stats s ON u.id = s.author_id;`,
        },
      ],
    },
    {
      id: "indexes",
      title: "Indexes & Performance",
      sections: [
        {
          heading: "Creating indexes",
          description: "Index columns used in WHERE, JOIN, and ORDER BY. Composite indexes must match query order.",
          language: "sql",
          code: `-- Single-column index
CREATE INDEX idx_users_email ON users(email);

-- Composite index (column order matters!)
CREATE INDEX idx_posts_author_date ON posts(author_id, created_at DESC);

-- Unique index (enforces uniqueness)
CREATE UNIQUE INDEX idx_users_email_unique ON users(email);

-- Full-text search index
CREATE FULLTEXT INDEX idx_posts_search ON posts(title, body);

-- Check existing indexes
SHOW INDEX FROM users;

-- Drop an index
DROP INDEX idx_users_email ON users;`,
        },
        {
          heading: "EXPLAIN — query analysis",
          description: "EXPLAIN shows how MySQL executes a query. Watch for type=ALL (full scan) and large rows.",
          language: "sql",
          code: `EXPLAIN SELECT * FROM posts WHERE author_id = 1 ORDER BY created_at DESC;

-- Output columns to check:
-- type:  system > const > ref > range > index > ALL (worst)
-- key:   which index was used (NULL = no index!)
-- rows:  estimated rows examined (lower is better)
-- Extra: "Using index" = good; "Using filesort" = may need index

-- Detailed analysis (MySQL 8+)
EXPLAIN ANALYZE SELECT ...;`,
        },
      ],
    },
    {
      id: "transactions",
      title: "Transactions & Schema",
      sections: [
        {
          heading: "Transactions",
          description: "Wrap multi-statement operations in transactions to maintain data integrity.",
          language: "sql",
          code: `-- Transfer money between accounts
START TRANSACTION;

UPDATE accounts SET balance = balance - 500 WHERE id = 1;
UPDATE accounts SET balance = balance + 500 WHERE id = 2;

-- Verify both updates succeeded
SELECT balance FROM accounts WHERE id IN (1, 2);

COMMIT;     -- make changes permanent
-- ROLLBACK; -- undo if something went wrong`,
        },
        {
          heading: "Schema operations",
          description: "Common DDL commands for creating and evolving tables.",
          language: "sql",
          code: `-- Create table
CREATE TABLE posts (
  id         INT         NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title      VARCHAR(200) NOT NULL,
  body       TEXT,
  author_id  INT         NOT NULL,
  created_at TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX      idx_author (author_id)
);

-- Alter table
ALTER TABLE users ADD COLUMN avatar_url VARCHAR(500);
ALTER TABLE users DROP COLUMN legacy_field;
ALTER TABLE users MODIFY COLUMN name VARCHAR(150) NOT NULL;`,
        },
      ],
    },
  ],
};
