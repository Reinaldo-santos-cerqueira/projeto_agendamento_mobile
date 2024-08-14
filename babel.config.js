module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: '.',
        alias: {
          '@components': './src/components',
          '@screen': './src/screen',
          '@utils': './src/utils',
          '@routes': './src/routes',
          '@assets': './src/assets',
          '@domain': './src/domain',
          '@redux': './src/redux',
          '@service': './src/service',
          '@hooks': './src/hooks',
        },
      },
    ],
  ],
};
