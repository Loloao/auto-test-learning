module.exports = {
  roots: ['<rootDir>/src'],
  // 代码测试覆盖率是根据哪些文件生成的
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}', '!src/**/*.d.ts'],
  // 解决一些测试上的兼容上的问题
  setupFiles: ['react-app-polyfill/jsdom'],
  // 当测试环境搭建好后做的事情
  setupFilesAfterEnv: [
    '<rootDir>/src/setupTests.js',
    './node_modules/jest-enzyme/lib/index.js',
  ],
  // 哪些测试文件会被执行
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}',
    '<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}',
  ],
  // 测试运行的环境，下面的配置项会模拟浏览器底层 dom 上的一些方法
  testEnvironment: 'jest-environment-jsdom-fourteen',
  // 它会在引入 key 表示的文件的时候
  // 再通过 value 表示的插件进行转换
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
    '^.+\\.css$': '<rootDir>/config/jest/cssTransform.js',
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)':
      '<rootDir>/config/jest/fileTransform.js',
  },
  // 如果是以下文件就会忽略文件的 transform
  transformIgnorePatterns: [
    '[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$',
    // 防止 css module 干扰测试
    '^.+\\.module\\.(css|sass|scss)$',
  ],
  // 当引入第三方库的时候除了 node_modules 还从哪里引入
  modulePaths: [],
  moduleNameMapper: {
    '^react-native$': 'react-native-web',
    // value 是一个第三方库
    // 它会把 css module 转换为一个 js 对象，它的 key value 都相同
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
  },
  // 当忽略文件后缀时按权重引入文件
  moduleFileExtensions: [
    'web.js',
    'js',
    'web.ts',
    'ts',
    'web.tsx',
    'tsx',
    'json',
    'web.jsx',
    'jsx',
    'node',
  ],
  // 当使用 jest -w 的 watch 模式时有下面这些插件供我们使用
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
}
