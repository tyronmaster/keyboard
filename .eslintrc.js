module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "airbnb-base",
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    semi: ["error", "always"],
    quotes: ["error", "double", { allowTemplateLiterals: true }],
    "linebreak-style": ["error", process.platform === "win32" ? "windows" : "unix"],
    allowShortCircuit: 0,
    allowTernary: 0,
    "no-param-reassign": [2, { props: false }],
  },
};
