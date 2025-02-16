// @ts-check
import eslint from "@eslint/js";
import jestPlugin from "eslint-plugin-jest";
import prettierRecommended from "eslint-plugin-prettier/recommended";
import tseslint from "typescript-eslint";

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  prettierRecommended,
  {
    plugins: {
      jest: jestPlugin
    },
    rules: {
      "prettier/prettier": [
        "warn",
        {
          trailingComma: "none",
          endOfLine: "auto"
        }
      ],
      "no-console": [
        "warn",
        {
          allow: ["warn", "error"]
        }
      ],
      "no-debugger": ["warn"],
      "jest/no-focused-tests": "error",
      "jest/no-commented-out-tests": "warn",
      "jest/no-disabled-tests": "warn"
    }
  },
  {
    files: ["**/*.ts?(x)"],
    rules: {
      "@typescript-eslint/no-empty-function": [
        "error",
        {
          allow: ["private-constructors"]
        }
      ]
    }
  }
);
