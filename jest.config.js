module.exports = async () => {
  return {
    rootDir: '.',
    setupFiles: ['<rootDir>/src/configs/set-environments.config.js'],
    reporters: ['default', 'jest-junit'],
  };
};
