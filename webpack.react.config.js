const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractCssChunks = require("extract-css-chunks-webpack-plugin");

const rootPath = path.resolve(__dirname)

module.exports = {
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    mainFields: ["main", "module", "browser"],
  },
  entry: "./src/app.tsx",
  target: "electron-renderer",
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.(js|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        use: [
          ExtractCssChunks.loader,
          'css-loader',
          'postcss-loader'
        ],
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|webp)$/,
        loader: 'url-loader'
      }
    ],
  },
  devServer: {
    contentBase: path.join(rootPath, "dist/renderer"),
    historyApiFallback: true,
    compress: true,
    hot: true,
    port: 4000,
    publicPath: "/",
  },
  output: {
    path: path.resolve(rootPath, "dist/renderer"),
    filename: "js/[name].js",
    publicPath: './'
  },
  plugins: [new HtmlWebpackPlugin({
    template: path.resolve(rootPath, 'index.html')
  }), new ExtractCssChunks()],
};