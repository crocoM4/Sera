/* eslint import/no-extraneous-dependencies: 0 */
const path = require("path");
const webpack = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const packageFile = require("./package.json");

const serverDependencies = ["express", "dotenv"];
const excludeServerDependencies = (dep) => !serverDependencies.includes(dep);

module.exports = {
  mode: "production",
  target: "web",
  name: "client",
  entry: {
    main: "./client/src/index.jsx",
    vendor: Object.keys(packageFile.dependencies).filter(
      excludeServerDependencies
    ),
  },
  output: {
    publicPath: "./client/public/dist/",
    filename: "[name].js",
    chunkFilename: "[name].js",
    path: path.resolve(__dirname, "client/public/dist"),
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor",
          chunks: "all",
        },
      },
    },
    minimizer: [
      new TerserPlugin({
        parallel: true,
      }),
      new OptimizeCSSAssetsPlugin({}),
    ],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loaders: ["babel-loader"],
        exclude: /node_modules/,
      },
      {
        test: /\.(sass|css)$/,
        use: [MiniCssExtractPlugin.loader, { loader: "css-loader" }],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production"),
      API_URL: JSON.stringify("https://sera-backend.herokuapp.com/api/v1/"),
    }),
    new webpack.HashedModuleIdsPlugin(),
    new webpack.IgnorePlugin(/\.svg$/),
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
  ],
};
