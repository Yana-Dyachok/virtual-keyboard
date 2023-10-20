const path=require('path');
const MiniCssExtractPlugin=require('mini-css-extract-plugin');
const HtmlWebpackPlugin=require('html-webpack-plugin');
const CopyPlugin=require('copy-webpack-plugin');
module.exports = {
    entry: {
      app: './src/index.js',
    },
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: 'main.js',
    },
    devServer: {
        overlay:true,
    },
    module: {
        rules:[
             {
              test:/\.(?:ico|gif|png|jpg|jpeg|svg)$/i,
              type:'asset/resource',
            },
            {
              test:/\.(woff(2)?|eot|ttf|otf|svg)$/i,
              type:'asset/resource',
            },
            {
              test:/\.css$/i,
              use:[MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
              test:/\.s(ac)ss$/i,
              use:[MiniCssExtractPlugin.loader, 'css-loader','sass-loader']
            },
            {
              test: /\.js$/,
              exclude: /node_modules/,
              use: {
                loader: 'babel-loader',
              },
            },
        ]
      },
      plugins: [
        new HtmlWebpackPlugin({
          template: './src/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'style.css',
        }),
        new CopyPlugin ({
          patterns: [
            {from: './public'}
          ]
        }),
    ]
}