/* eslint import/no-extraneous-dependencies: 0 */
const path = require("path");
const webpack = require("webpack");

module.exports = {
  mode: "development",
  watch: true,
  entry: ["@babel/polyfill", "./client/src/index.jsx"],
  output: {
    publicPath: "client/public/dist/",
    filename: "[name].js",
    path: path.resolve(__dirname, "client/public/dist"),
  },
  devtool: "inline-source-map",
  resolve: {
    extensions: [".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loaders: ["babel-loader"],
      },
      {
        test: /\.(sass|css)$/,
        use: [{ loader: "style-loader" }, { loader: "css-loader" }],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("development"),
      API_URL: JSON.stringify("http://localhost:5001/api/v1/"),
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.IgnorePlugin(/\.svg$/),
  ],
};
