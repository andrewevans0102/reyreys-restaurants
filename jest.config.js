module.exports = {
  globals: {
    'ts-jest': {
      allowSyntheticDefaultImports: true,
      diagnostics: false
    },
    'jest-cli-option': ['--runInBand']
  },
  transform: {
    '^.+\\.js$': 'babel-jest'
  }
};
