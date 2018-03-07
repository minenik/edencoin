const path = require(`path`);
const ExtractTextPlugin = require(`extract-text-webpack-plugin`);

module.exports = {
  entry: `./src/renderer/resources.js`,
  module: {
    rules: [
      {
        test: (file) => file.endsWith(`.scss`),
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: `css-loader`,
            },
            {
              loader: `sass-loader`,
            },
          ],
        }),
      },
      {
        include: (file) => file.endsWith(`.json`) ||
          file.endsWith(`.svg`) ||
          file.endsWith(`.ico`) ||
          file.endsWith(`.jpg`) ||
          file.endsWith(`.png`),
        use: [
          {
            loader: `file-loader`,
            options: {
              name: `[ext]/[name].[ext]`,
            },
          },
        ],
      },
      {
        test: (file) => file.endsWith(`.html`),
        use: [
          {
            loader: `file-loader`,
            options: {
              name: `[name].html`,
            },
          },
        ],
      },
    ],
  },
  output: {
    filename: `bundle.js`,
    path: path.join(__dirname, `dist/renderer`),
  },
  plugins: [new ExtractTextPlugin(`css/styles.css`)],
};