module.exports = {
  "root": true,
  "extends": [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/eslint-config-typescript/recommended",
    "@vue/eslint-config-prettier"
  ],
  "parserOptions": {
    "ecmaVersion": "latest"
  },
  "rules": {
    "prettier/prettier": ['error'],
    "vue/multi-word-component-names": "off",
    "arrow-body-style": [2, 'as-needed'],
    "no-console": 1,
  }
}
