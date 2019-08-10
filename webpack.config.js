const path = require(`path`);

module.exports = {
  mode: `development`,
  entry: `./src/main.js`,
  output: {
    filename: `bundle.js`,
    path: path.join(__dirname, `public`),
  },
  devtool: `source-map`,
  devServer: {
    contentBase: path.join(__dirname, `public`),
    port: 8181,
    publicPath: `http://localhost:8181/`,
    compress: false,
    watchContentBase: true
  },
}
