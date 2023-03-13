module.exports = {
  env: {
    browser: true,
  },
  extends: ['airbnb', 'airbnb/hooks'],
  plugins: ['react', 'react-hooks'],
  rules: {
    'func-names': 0,
    'import/no-unresolved': [
      'error',
    ],
    'import/order': [
      'error',
      {
        alphabetize: { order: 'asc' },
        groups: [
          ['builtin', 'external'],
          ['sibling', 'parent', 'internal'],
          'index',
        ],
        'newlines-between': 'always',
        pathGroups: [
          {
            pattern: './*.scss',
            group: 'index',
          },
          {
            pattern: '../*.scss',
            group: 'index',
          },
        ],
      },
    ],
    indent: ['error', 2, { ignoredNodes: ['ImportDeclaration'] }],
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['to'],
        aspects: ['noHref', 'invalidHref', 'preferButton'],
      },
    ],
    'jsx-a11y/click-events-have-key-events': [1],
    'jsx-a11y/label-has-associated-control': 'off',
    'lines-between-class-members': [
      'error',
      'always',
      {
        exceptAfterSingleLine: true,
      },
    ],
    'max-len': [2, 80, 4],
    'no-underscore-dangle': [
      'error',
      {
        allow: ['_isMounted'],
      },
    ],
    'no-unused-expressions': [
      'error',
      {
        allowTernary: true,
      },
    ],
    'react/destructuring-assignment': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'react/forbid-prop-types': [2, { forbid: ['any'] }],
    'react/jsx-props-no-spreading': 'off',
    'react/require-default-props': [1],
    'react/static-property-placement': ['off', 'property assignment'],
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: [
          '.js',
          '.jsx',
          '.ts',
          '.tsx',
        ],
        moduleDirectory: ['src', 'node_modules'],
      },
    },
  },
};
