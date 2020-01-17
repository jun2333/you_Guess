module.exports = {
    root: true,
    extends: ["plugin:vue/essential", "@vue/standard"],
    rules: {
        "no-trailing-spaces": 0,
        "space-before-function-paren": [0, "always"],
        "space-in-parens": [0, "never"],
        "space-before-blocks": [0, "always"],
        "space-in-parens": [0, "never"],
        indent: [2, 4], //缩进风格
        // allow async-await
        "generator-star-spacing": "off",
        // allow debugger during development
        "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
        "vue/no-parsing-error": [2, { "x-invalid-end-tag": false }],
        "no-undef": "off",
        camelcase: "off"
    },
    parserOptions: {
        parser: "babel-eslint"
    }
};
