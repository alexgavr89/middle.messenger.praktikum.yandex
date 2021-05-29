module.exports = {
    extends: ["stylelint-config-standard",
        "stylelint-config-rational-order",
        "stylelint-prettier/recommended"],
    plugins: ["stylelint-order", "stylelint-scss"],
    rules: {},
    ignoreFiles: [
        "./node_modules/*",
        "./deploy/*",
        "./dist/*",
    ]
};
