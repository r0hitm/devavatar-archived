---
title: "React + TypeScript + Vite: Configuring ESLint & Prettier for Production-level App"
description: Integrate ESLint and Prettier in a React + TypeScript project for enhanced code quality and streamlined development. Catch and fix errors earlier while maintaining a consistent code style across all files for improved efficiency!
pubDatetime: 2024-03-19T09:30:00Z
tags:
  - tutorial
  - web
---

This will be a short post on how to set up linting and (auto-) formatting in a React project that uses Vite as the bundler.

**Bootstrap the project:**

```sh
npm create vite@latest   # then follow the prompts
# OR
npm create vite@latest your-react-ts-app -- --template react-ts

# cd your-react-ts-app
# npm install
```

Now, both of the above commands will generate a minimal `.eslintrc.cjs` at the root of the project. We'll update this config to enable type-aware lint rules, React-specific linting rules, and Prettier as the formatter. Some of these rules are already installed as dev package dependencies because `vite` adds them; we just have to update `.eslintrc.cjs`. (Note: `README.md` also contains some of the instructions for this)

**Install react and prettier eslint rules:**

```sh
npm install -D eslint-plugin-react eslint-config-prettier
```

**Note:** You may come across articles that also install `eslint-plugin-prettier`. This is no longer needed. [Know more](https://prettier.io/docs/en/integrating-with-linters.html).

**Updating the `.eslintrc.cjs`:**

```js
module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended-type-checked",
    "plugin:@typescript-eslint/stylistic-type-checked",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "prettier",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs", "vite.config.ts"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json", "./tsconfig.node.json"],
    tsconfigRootDir: __dirname,
  },
  plugins: ["react-refresh"],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "react/react-in-jsx-scope": "off",
  },
};
```

And we are done!

In wrapping up, with these configurations in place, your React project is now equipped with robust linting and formatting tools, ensuring cleaner code and smoother development processes.
