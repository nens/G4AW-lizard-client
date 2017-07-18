const path = require("path");
const webpack = require("webpack");
const OfflinePlugin = require("offline-plugin");
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
    new OfflinePlugin({
      externals: [
        "/",
        "https://fonts.gstatic.com/s/materialicons/v22/2fcrYFNaTjcS6g4U3t-Y5RV6cRhDpPC5P4GCEJpqGoc.woff",
        "https://fonts.googleapis.com/icon?family=Material+Icons",
        "https://fonts.gstatic.com/s/roboto/v16/ty9dfvLAziwdqQ2dHoyjphkAz4rYn47Zy2rvigWQf6w.woff2",
        "https://fonts.gstatic.com/s/roboto/v16/frNV30OaYdlFRtH2VnZZdhkAz4rYn47Zy2rvigWQf6w.woff2",
        "https://fonts.gstatic.com/s/roboto/v16/gwVJDERN2Amz39wrSoZ7FxkAz4rYn47Zy2rvigWQf6w.woff2",
        "https://fonts.gstatic.com/s/roboto/v16/aZMswpodYeVhtRvuABJWvBkAz4rYn47Zy2rvigWQf6w.woff2",
        "https://fonts.gstatic.com/s/roboto/v16/VvXUGKZXbHtX_S_VCTLpGhkAz4rYn47Zy2rvigWQf6w.woff2",
        "https://fonts.gstatic.com/s/roboto/v16/e7MeVAyvogMqFwwl61PKhBkAz4rYn47Zy2rvigWQf6w.woff2",
        "https://fonts.gstatic.com/s/roboto/v16/2tsd397wLxj96qwHyNIkxHYhjbSpvc47ee6xR_80Hnw.woff2",
        "https://fonts.gstatic.com/s/roboto/v16/0eC6fl06luXEYWpBSJvXCIX0hVgzZQUfRDuZrPvH3D8.woff2",
        "https://fonts.gstatic.com/s/roboto/v16/Fl4y0QdOxyyTHEGMXX8kcYX0hVgzZQUfRDuZrPvH3D8.woff2",
        "https://fonts.gstatic.com/s/roboto/v16/-L14Jk06m6pUHB-5mXQQnYX0hVgzZQUfRDuZrPvH3D8.woff2",
        "https://fonts.gstatic.com/s/roboto/v16/I3S1wsgSg9YCurV6PUkTOYX0hVgzZQUfRDuZrPvH3D8.woff2",
        "https://fonts.gstatic.com/s/roboto/v16/NYDWBdD4gIq26G5XYbHsFIX0hVgzZQUfRDuZrPvH3D8.woff2",
        "https://fonts.gstatic.com/s/roboto/v16/Pru33qjShpZSmG3z6VYwnYX0hVgzZQUfRDuZrPvH3D8.woff2",
        "https://fonts.gstatic.com/s/roboto/v16/Hgo13k-tfSpn0qi1SFdUfZBw1xU1rKptJj_0jans920.woff2",
        "https://fonts.gstatic.com/s/roboto/v16/sTdaA6j0Psb920Vjv-mrzH-_kf6ByYO6CLYdB4HQE-Y.woff2",
        "https://fonts.gstatic.com/s/roboto/v16/uYECMKoHcO9x1wdmbyHIm3-_kf6ByYO6CLYdB4HQE-Y.woff2",
        "https://fonts.gstatic.com/s/roboto/v16/tnj4SB6DNbdaQnsM8CFqBX-_kf6ByYO6CLYdB4HQE-Y.woff2",
        "https://fonts.gstatic.com/s/roboto/v16/_VYFx-s824kXq_Ul2BHqYH-_kf6ByYO6CLYdB4HQE-Y.woff2",
        "https://fonts.gstatic.com/s/roboto/v16/NJ4vxlgWwWbEsv18dAhqnn-_kf6ByYO6CLYdB4HQE-Y.woff2",
        "https://fonts.gstatic.com/s/roboto/v16/Ks_cVxiCiwUWVsFWFA3Bjn-_kf6ByYO6CLYdB4HQE-Y.woff2",
        "https://fonts.gstatic.com/s/roboto/v16/oMMgfZMQthOryQo9n22dcuvvDin1pK8aKteLpeZ5c0A.woff2",
        "https://fonts.gstatic.com/s/roboto/v16/ZLqKeelYbATG60EpZBSDy4X0hVgzZQUfRDuZrPvH3D8.woff2",
        "https://fonts.gstatic.com/s/roboto/v16/oHi30kwQWvpCWqAhzHcCSIX0hVgzZQUfRDuZrPvH3D8.woff2",
        "https://fonts.gstatic.com/s/roboto/v16/rGvHdJnr2l75qb0YND9NyIX0hVgzZQUfRDuZrPvH3D8.woff2",
        "https://fonts.gstatic.com/s/roboto/v16/mx9Uck6uB63VIKFYnEMXrYX0hVgzZQUfRDuZrPvH3D8.woff2",
        "https://fonts.gstatic.com/s/roboto/v16/mbmhprMH69Zi6eEPBYVFhYX0hVgzZQUfRDuZrPvH3D8.woff2",
        "https://fonts.gstatic.com/s/roboto/v16/oOeFwZNlrTefzLYmlVV1UIX0hVgzZQUfRDuZrPvH3D8.woff2",
        "https://fonts.gstatic.com/s/roboto/v16/RxZJdnzeo3R5zSexge8UUZBw1xU1rKptJj_0jans920.woff2",
        "https://fonts.gstatic.com/s/roboto/v16/77FXFjRbGzN4aCrSFhlh3oX0hVgzZQUfRDuZrPvH3D8.woff2",
        "https://fonts.gstatic.com/s/roboto/v16/isZ-wbCXNKAbnjo6_TwHToX0hVgzZQUfRDuZrPvH3D8.woff2",
        "https://fonts.gstatic.com/s/roboto/v16/UX6i4JxQDm3fVTc1CPuwqoX0hVgzZQUfRDuZrPvH3D8.woff2",
        "https://fonts.gstatic.com/s/roboto/v16/jSN2CGVDbcVyCnfJfjSdfIX0hVgzZQUfRDuZrPvH3D8.woff2",
        "https://fonts.gstatic.com/s/roboto/v16/PwZc-YbIL414wB9rB1IAPYX0hVgzZQUfRDuZrPvH3D8.woff2",
        "https://fonts.gstatic.com/s/roboto/v16/97uahxiqZRoncBaCEI3aW4X0hVgzZQUfRDuZrPvH3D8.woff2",
        "https://fonts.gstatic.com/s/roboto/v16/d-6IYplOFocCacKzxwXSOJBw1xU1rKptJj_0jans920.woff2",
        "https://fonts.gstatic.com/s/roboto/v16/s7gftie1JANC-QmDJvMWZoX0hVgzZQUfRDuZrPvH3D8.woff2",
        "https://fonts.gstatic.com/s/roboto/v16/3Y_xCyt7TNunMGg0Et2pnoX0hVgzZQUfRDuZrPvH3D8.woff2",
        "https://fonts.gstatic.com/s/roboto/v16/WeQRRE07FDkIrr29oHQgHIX0hVgzZQUfRDuZrPvH3D8.woff2",
        "https://fonts.gstatic.com/s/roboto/v16/jyIYROCkJM3gZ4KV00YXOIX0hVgzZQUfRDuZrPvH3D8.woff2",
        "https://fonts.gstatic.com/s/roboto/v16/phsu-QZXz1JBv0PbFoPmEIX0hVgzZQUfRDuZrPvH3D8.woff2",
        "https://fonts.gstatic.com/s/roboto/v16/9_7S_tWeGDh5Pq3u05RVkoX0hVgzZQUfRDuZrPvH3D8.woff2",
        "https://fonts.gstatic.com/s/roboto/v16/mnpfi9pxYH-Go5UiibESIpBw1xU1rKptJj_0jans920.woff2",
        "https://fonts.gstatic.com/s/roboto/v16/WxrXJa0C3KdtC7lMafG4dRkAz4rYn47Zy2rvigWQf6w.woff2",
        "https://fonts.gstatic.com/s/roboto/v16/OpXUqTo0UgQQhGj_SFdLWBkAz4rYn47Zy2rvigWQf6w.woff2",
        "https://fonts.gstatic.com/s/roboto/v16/1hZf02POANh32k2VkgEoUBkAz4rYn47Zy2rvigWQf6w.woff2",
        "https://fonts.gstatic.com/s/roboto/v16/cDKhRaXnQTOVbaoxwdOr9xkAz4rYn47Zy2rvigWQf6w.woff2",
        "https://fonts.gstatic.com/s/roboto/v16/K23cxWVTrIFD6DJsEVi07RkAz4rYn47Zy2rvigWQf6w.woff2",
        "https://fonts.gstatic.com/s/roboto/v16/vSzulfKSK0LLjjfeaxcREhkAz4rYn47Zy2rvigWQf6w.woff2",
        "https://fonts.gstatic.com/s/roboto/v16/vPcynSL0qHq_6dX7lKVByXYhjbSpvc47ee6xR_80Hnw.woff2",
        "https://fonts.googleapis.com/css?family=Roboto:100,300,400,400i,500,700,900&amp;subset=vietnamese",
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.3/leaflet.css"
      ],
      ServiceWorker: {
        navigateFallbackURL: "/"
      }
    }),

    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: '"production"'
      }
    })
  ]
};

module.exports = config;
