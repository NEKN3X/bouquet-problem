/** @type {import("eslint").Linter.Config} */
const config = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
  plugins: ["@typescript-eslint", "neverthrow", "import", "unused-imports"],
  extends: [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended-type-checked",
    "plugin:@typescript-eslint/stylistic-type-checked",
    "plugin:import/recommended",
    "plugin:import/typescript",
  ],
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
    "import/resolver": {
      typescript: true,
      node: true,
    },
  },
  rules: {
    "@typescript-eslint/array-type": "off",
    "@typescript-eslint/consistent-type-definitions": "off",
    "@typescript-eslint/consistent-type-imports": [
      "error",
      {
        prefer: "type-imports",
        fixStyle: "separate-type-imports",
      },
    ],
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        argsIgnorePattern: "^_",
      },
    ],
    "@typescript-eslint/require-await": "off",
    "@typescript-eslint/no-misused-promises": [
      "error",
      {
        checksVoidReturn: {
          attributes: false,
        },
      },
    ],
    "unused-imports/no-unused-imports": "error",
    "import/order": [
      "error",
      {
        groups: [
          "builtin", // 組み込みモジュール
          "external", // npmでインストールした外部ライブラリ
          "internal", // 自作モジュール
          ["parent", "sibling"],
          "object",
          "type",
          "index",
        ],
        "newlines-between": "never",
        pathGroupsExcludedImportTypes: ["builtin"],
        alphabetize: {
          order: "asc", // 昇順にソート
          caseInsensitive: true, // 小文字大文字を区別する
        },
        pathGroups: [
          // 指定した順番にソートされる
          {
            pattern: "@/components/common",
            group: "internal",
            position: "before",
          },
          {
            pattern: "@/components/hooks",
            group: "internal",
            position: "before",
          },
        ],
      },
    ],
  },
};
module.exports = config;
