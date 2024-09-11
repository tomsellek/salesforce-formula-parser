/*
*                      Copyright 2023 Salto Labs Ltd.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with
* the License.  You may obtain a copy of the License at
*
*     http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

module.exports = {
    globals: {
        'ts-jest': {
            isolatedModules: true
        }
    },
    preset: 'ts-jest',
    verbose: true,
    testEnvironment: 'node',
    testMatch: [
        '<rootDir>/test/**/*.test.ts'
    ],
    testRunner: "jest-circus/runner",
    collectCoverage: true,
    coverageReporters: ['json', 'lcov', 'text', 'clover', 'json-summary'],
    name: 'salesforce-formula-parser',
    displayName: 'salesforce-formula-parser',
    rootDir: `${__dirname}`,
    collectCoverageFrom: [
        '**/*.ts',
        '**/*.tsx',
        '!**/*.d.ts',
        '!**/node_modules/**',
        '!*.config.ts',
        '!coverage/**',
        '!test/**',
        '!e2e_test/**',
      '!<rootDir>/index.ts',
    ],
    coverageThreshold: {
      'global': {
        branches: 83,
        functions: 97,
        lines: 96,
        statements: 97,
      },
    },
    setupFilesAfterEnv: ["jest-extended/all"],
}
