export default {
  topics: [
    {
      id: "dataframes",
      title: "DataFrames & Series",
      sections: [
        {
          heading: "Creating DataFrames",
          description: "DataFrames are 2D labeled tables. Series are 1D labeled arrays.",
          language: "python",
          code: `import pandas as pd

# From dict
df = pd.DataFrame({
    "name":  ["Alice", "Bob", "Carol"],
    "age":   [28, 34, 29],
    "score": [92.5, 87.0, 95.5],
})

# From list of dicts
records = [{"id": 1, "city": "Mumbai"}, {"id": 2, "city": "Delhi"}]
df2 = pd.DataFrame(records)

# From CSV / JSON / Excel
df = pd.read_csv("data.csv", parse_dates=["date"])
df = pd.read_json("data.json")

# Basic info
df.shape           # (rows, cols)
df.dtypes          # column types
df.describe()      # stats summary
df.head(10)        # first 10 rows`,
        },
        {
          heading: "Selection",
          description: "loc uses labels; iloc uses integer positions. [] is a shorthand for columns.",
          language: "python",
          code: `# Select columns
df["name"]              # Series
df[["name", "score"]]  # DataFrame

# loc — label-based
df.loc[0]               # row by index label
df.loc[0:2, "name":"score"]   # row/col slices

# iloc — integer position
df.iloc[0]              # first row
df.iloc[1:3, 0:2]      # rows 1-2, cols 0-1

# Boolean mask
df[df["score"] > 90]
df[(df["age"] > 25) & (df["score"] > 90)]

# query() — readable filters
df.query("age > 25 and score > 90")`,
        },
      ],
    },
    {
      id: "manipulation",
      title: "Manipulation",
      sections: [
        {
          heading: "Adding & removing",
          description: "Prefer assign() for chaining; drop() removes rows or columns.",
          language: "python",
          code: `# Add column
df["grade"] = df["score"].apply(lambda s: "A" if s >= 90 else "B")

# Rename
df = df.rename(columns={"score": "final_score"})

# Drop column
df = df.drop(columns=["grade"])

# Drop rows by index
df = df.drop(index=[0, 2])

# Chained with assign()
df = (
    df
    .assign(grade=lambda d: d.score.apply(lambda s: "A" if s >= 90 else "B"))
    .assign(full_name=lambda d: d.name.str.upper())
    .drop(columns=["name"])
)`,
        },
        {
          heading: "Apply & map",
          description: "apply() runs a function along rows or columns; map() transforms a Series element-by-element.",
          language: "python",
          code: `# map — element-wise on a Series
df["name_upper"] = df["name"].map(str.upper)

# apply — along a column (axis=0) or row (axis=1)
df["adjusted"] = df["score"].apply(lambda s: min(s + 5, 100))

# apply on rows (axis=1)
df["summary"] = df.apply(
    lambda row: f"{row['name']}: {row['score']:.1f}",
    axis=1
)

# Vectorised string operations
df["name_len"] = df["name"].str.len()
df["email_domain"] = df["email"].str.split("@").str[1]`,
        },
      ],
    },
    {
      id: "groupby",
      title: "GroupBy & Aggregation",
      sections: [
        {
          heading: "GroupBy basics",
          description: "GroupBy splits data into groups, applies a function, and combines results.",
          language: "python",
          code: `# Group by one column
grouped = df.groupby("city")

grouped["score"].mean()       # mean score per city
grouped["score"].agg(["mean", "min", "max"])

# Multiple group keys
df.groupby(["city", "grade"])["score"].mean()

# Named aggregations (pandas 0.25+)
result = df.groupby("city").agg(
    avg_score=("score", "mean"),
    count=("name", "count"),
    max_age=("age", "max"),
)`,
        },
        {
          heading: "Pivot tables & merge",
          description: "pivot_table is GroupBy with a cross-tab layout; merge is SQL-style joining.",
          language: "python",
          code: `# Pivot table
pivot = df.pivot_table(
    values="score",
    index="city",
    columns="grade",
    aggfunc="mean",
    fill_value=0,
)

# Merge (SQL join)
users  = pd.DataFrame({"id": [1, 2], "name": ["Alice", "Bob"]})
orders = pd.DataFrame({"user_id": [1, 1, 2], "amount": [50, 30, 80]})

merged = users.merge(orders, left_on="id", right_on="user_id", how="left")`,
        },
      ],
    },
    {
      id: "io",
      title: "I/O & Cleaning",
      sections: [
        {
          heading: "Reading & writing data",
          description: "Pandas handles CSV, JSON, Excel, Parquet, and SQL out of the box.",
          language: "python",
          code: `# Read
df = pd.read_csv("data.csv", parse_dates=["date"], index_col="id")
df = pd.read_excel("data.xlsx", sheet_name="Sheet1")
df = pd.read_parquet("data.parquet")

# Write
df.to_csv("output.csv", index=False)
df.to_json("output.json", orient="records", indent=2)
df.to_parquet("output.parquet", compression="snappy")

# SQL
import sqlalchemy as sa
engine = sa.create_engine("postgresql://user:pass@host/db")
df = pd.read_sql("SELECT * FROM users WHERE active = true", engine)
df.to_sql("users_clean", engine, if_exists="replace", index=False)`,
        },
        {
          heading: "Cleaning data",
          description: "Handle missing values, duplicates, and type coercions before analysis.",
          language: "python",
          code: `# Missing values
df.isnull().sum()               # count NaNs per column
df.dropna()                     # drop rows with any NaN
df.dropna(subset=["email"])     # drop only if email is NaN
df.fillna({"score": 0, "city": "Unknown"})

# Duplicates
df.duplicated().sum()
df = df.drop_duplicates(subset=["email"], keep="first")

# Type conversion
df["age"] = df["age"].astype(int)
df["date"] = pd.to_datetime(df["date"])
df["score"] = pd.to_numeric(df["score"], errors="coerce")`,
        },
      ],
    },
  ],
};
