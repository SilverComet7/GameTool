module.exports = {
  extends: [require.resolve('@umijs/fabric/dist/eslint')],
  rules: {
    'react/jsx-first-prop-new-line': 'error',
    semi: ['error', 'never'],
    indent: ['error', 2, { SwitchCase: 1 }],
    'no-plusplus': 'off',
    'react/sort-comp': 'off',
    'no-unused-expressions': 'off',
  },
}
