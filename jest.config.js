module.exports = {
  globals: {
    'ts-jest': {
      allowSyntheticDefaultImports: true,
      diagnostics: false
    }
  },
  transform: {
    '^.+\\.js$': 'babel-jest'
  }
};
