export default {
  testEnvironment: 'node',
  transform: {}, // Disable transformation for ES modules
  testMatch: ['**/tests/**/*.test.js'], // Specify the folder for your test files
  collectCoverage: true, // Optional: collect test coverage
};
