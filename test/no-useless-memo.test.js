import noUselessMemo from "../rules/no-useless-memo";
import { RuleTester } from "eslint";

const ruleTester = new RuleTester({
  parser: require.resolve("@typescript-eslint/parser"),
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
});

const errors = [
  { message: "Avoid useMemo with no dependencies, prefer extracting" },
];

ruleTester.run("no-useless-memo", noUselessMemo, {
  valid: [
    {
      code: `
const styles = { color: 'red' }
function Component() {
  return <Box sx={styles} />
}
`,
    },
  ],
  invalid: [
    {
      code: `
function Component() {
  const styles = useMemo(() => ({ color: 'red' }), [])
  return <Box sx={styles} />
}
  `,
      errors,
    },
  ],
});
