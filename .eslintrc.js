module.exports = {
  root: true,
  overrides: [
    {
      files: ['*.ts'],
      parserOptions: {
        project: ['./tsconfig.json'],
      },
    }
  ],
  parser: "@typescript-eslint/parser",
  rules: {
    "class-methods-use-this": "off",
    "no-param-reassign": "off",
    "no-restricted-syntax": "off",
  },
  plugins: ["@typescript-eslint"],
  extends: [
    "airbnb-typescript",
    "plugin:@typescript-eslint/recommended",
    "plugin:eslint-comments/recommended",
    "plugin:promise/recommended",
  ],
  "settings": {
    "react": {
      "version": "latest"
    }
  }
};
