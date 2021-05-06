module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
    mocha: true,
  },
  extends: ['airbnb-base'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 12,
  },
  ignorePatterns: ['node_modules/'],
  rules: {
    /**
     * This rule disallows the usage of the unary operators `++` and `--`.
     */
    'no-plusplus': 'off',
    /**
     * Detects cycles for ES6 imports.
     */
    'import/no-cycle': 'warn',
  },
};
