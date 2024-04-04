module.exports = {
    env: {
        browser: true,
        es2021: true,
        jest: true,
    },
    extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:@typescript-eslint/recommended'],
    settings: {
        react: {
            version: 'detect',
        },
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: ['react', '@typescript-eslint'],
    rules: {
        indent: ['error', 4],
        quotes: [
            'error',
            'single',
            {
                allowTemplateLiterals: true,
            },
        ],
        semi: ['error', 'always'],
        'react/react-in-jsx-scope': 'off',
        '@typescript-eslint/no-explicit-any': 0,
        '@typescript-eslint/no-unused-vars': 0,
        '@typescript-eslint/explicit-module-boundary-types': 0,
        '@typescript-eslint/no-non-null-assertion': 0,
        '@typescript-eslint/ban-types': 'off',
        'react/no-render-return-value': 'off',
        'linebreak-style': ['error', require('os').EOL === '\r\n' ? 'windows' : 'unix'],
    },
};
