module.exports = {
    preset: 'ts-jest', // Use ts-jest to transpile TypeScript
    testEnvironment: 'node', // Test environment
    transform: {
        '^.+\\.tsx?$': 'ts-jest', // Transform TypeScript files
    },
    moduleFileExtensions: ['ts', 'tsx', 'js'], // Recognized extensions
    testMatch: ['**/tests/**/*.test.ts'], // Path for test files
};
