export default {
  extensions: {
    ts: 'module'
  },
  workerThreads: false,
  cache: false,
  require: ['jiti/register'],
  files: ['./packages/**/tests/*.spec.ts', './tests/**/*.spec.ts'],
  timeout: '3m',
  environmentVariables: {
    TS_NODE_PROJECT: './tsconfig.json',
  },
};
