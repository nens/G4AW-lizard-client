const path = require("path");
const webpack = require("webpack");

const libraryName = "G4AWLizardClient";

const definePlugin = new webpack.DefinePlugin({
  "process.env": {
    NODE_ENV: '"production"'
  }
});

const config = {
  context: path.join(__dirname, "src"),
  entry: [__dirname + "/src/index.js"],
  devtool: false,
  output: {
    path: __dirname + "/dist/scripts",
    filename: libraryName + ".js",
    publicPath: "/scripts/",
    library: libraryName,
    libraryTarget: "umd",
    umdNamedDefine: true
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader?modules", "postcss-loader"]
      },
      {
        test: /(\.jsx|\.js)$/,
        loader: "babel-loader",
        exclude: /(node_modules|bower_components)/
      },
      {
        test: /\.js$/,
        loader: "eslint-loader",
        exclude: /node_modules|LizardApiClient/
      },
      {
        test: /\.(png|jpg|svg|woff|eot|ttf|otf)$/,
        loader: "url-loader?limit=100000"
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: '"production"'
      }
    })
  ]
};

module.exports = config;
