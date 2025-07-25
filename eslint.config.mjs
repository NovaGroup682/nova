import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

const eslintConfig = [
  ...compat.config({
    env: {
      browser: true,
      es2021: true,
    },
    extends: [
      "prettier",
      "eslint:recommended",
      "plugin:import/typescript",
      "plugin:prettier/recommended",
      "plugin:@typescript-eslint/recommended",
      "next",
    ],
    plugins: [
      "@typescript-eslint",
      "prettier",
      "jsx-a11y",
      "simple-import-sort",
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
      ecmaVersion: "latest",
      sourceType: "module",
      project: ["./tsconfig.json"],
    },
    rules: {
      "jsx-quotes": [2, "prefer-single"],
      "react/react-in-jsx-scope": "off",
      "react/jsx-no-useless-fragment": "off",
      "no-param-reassign": "off",
      "import/prefer-default-export": "off",
      "arrow-body-style": ["error", "as-needed"],
      "react/require-default-props": "off",
      "react/jsx-props-no-spreading": "off",
      "no-case-declarations": "off",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/naming-convention": "off",
      "import/no-cycle": "error",
      "@typescript-eslint/ban-ts-comment": [
        "error",
        { "ts-ignore": "allow-with-description" },
      ],
      "react/function-component-definition": [
        2,
        { "namedComponents": "arrow-function" },
      ],
      "no-console": [
        "warn",
        {
          allow: ["warn", "error"],
        },
      ],
      "consistent-return": "off",
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            ["^react", "^@?\\w"],
            ["^@emotion", "^@chakra"],
            ["routes"],
            [
              "^hooks",
              "^store",
              "^store/hooks",
              "^store/actions",
              "^store/reducers",
            ],
            ["^helpers", "^utils"],
            ["^constants", "^types", "^content"],
            ["^assets"],
            ["^validators"],
            ["^styles"],
            [
              "^(@|components)(/.*|$)",
              "^(@|ui)(/.*|$)",
              "^./components",
              "^./ui",
              "^\\.\\.(?!/?$)",
              "^\\.\\./?$",
              "^\\./(?=.*/)(?!/?$)",
              "^\\.(?!/?$)",
              "^\\./?$",
            ],
            ["^\\u0000"],
            ["^.+\\.?(schema)$"],
          ],
        },
      ],
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          args: "all",
          argsIgnorePattern: "^_",
          caughtErrors: "all",
          caughtErrorsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
    },
    overrides: [
      {
        files: [
          "./src/store/**/*.ts",
          "./src/api/*",
          "./src/actions/user.ts",
          "./src/actions/auth.ts",
        ],
        rules: {
          "import/no-cycle": "off",
        },
      },
    ],
  }),
];

export default eslintConfig;
