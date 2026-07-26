export default {
  topics: [
    {
      id: "hooks",
      title: "Core Hooks",
      sections: [
        {
          heading: "useState",
          description: "Add local state to a function component.",
          language: "javascript",
          code: `const [count, setCount] = useState(0);

<button onClick={() => setCount((c) => c + 1)}>
  {count}
</button>`,
        },
        {
          heading: "useEffect",
          description: "Run side effects after render, with optional cleanup.",
          language: "javascript",
          code: `useEffect(() => {
  const id = setInterval(() => setTick((t) => t + 1), 1000);
  return () => clearInterval(id);
}, []);`,
        },
        {
          heading: "useMemo",
          description: "Memoize an expensive calculation between renders.",
          language: "javascript",
          code: `const sorted = useMemo(
  () => items.slice().sort(compareFn),
  [items]
);`,
        },
      ],
    },
    {
      id: "patterns",
      title: "Component Patterns",
      sections: [
        {
          heading: "Controlled input",
          description: "Bind an input's value to state so React owns the source of truth.",
          language: "javascript",
          code: `<input
  value={query}
  onChange={(e) => setQuery(e.target.value)}
/>`,
        },
        {
          heading: "Conditional rendering",
          description: "Render different UI based on state, without extra wrapper components.",
          language: "javascript",
          code: `{isLoading ? <Spinner /> : <ResultsList data={data} />}`,
        },
      ],
    },
  ],
};
