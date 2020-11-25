module.exports = [
  // Add support for native node modules
  {
    test: /\.node$/,
    use: 'node-loader',
  },
  {
    test: /\.(m?js|node)$/,
    parser: { amd: false },
    use: {
      loader: '@marshallofsound/webpack-asset-relocator-loader',
      options: {
        outputAssetBase: 'native_modules',
      },
    },
  },
  {
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    use: {
      loader: "babel-loader"
    }
  },
  {
    test: /\.(png|jpg)$/,
    loader: 'url-loader'
  },
  {
    test: /\.scss$/,
    loaders : [ "style-loader", "css-loader", "sass-loader" ]
  }
];
