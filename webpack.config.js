const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const src = path.join(__dirname, 'src');

module.exports = {
  entry: './src/pages/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/pages/index.html"
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader'
        }
      },{
        test: /\.js$/,
        enforce: 'pre',
        loader: 'source-map-loader'
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: true }
          }
        ]
      },
      {
        test: /\.less$/,
        include: [src],
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true 
            }
          },
          'postcss-loader',
          'less-loader'
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'url-loader?limit=8192&name=./image/[name].[ext]?[hash]'
        // [name] 图片的文件名
        // [ext] 图片文件的扩展名
        // [hash] 图片文件的哈希值
        // limit 后面跟的是数字, 加上这个参数, 图片文件大小 (单位为byte) 小于该参数值的文件会被转换为 base64 编码的格式
        // name 表示文件被处理之后再 build 目录中的路径和图片生成规则
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 8005,
    host: '0.0.0.0',
  }
};