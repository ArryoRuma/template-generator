// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";
import eslintConfigPrettier from "eslint-config-prettier";

export default withNuxt([
  // Your custom configs here

  // Disable all ESLint rules that conflict with Prettier
  eslintConfigPrettier,
]);
