const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const htmlWebpackPlugin = new HtmlWebpackPlugin({
    template: path.join(__dirname, 'demo/index.html'),
    filename: './index.html'
});
module.exports = {
    entry: path.join(__dirname, 'demo/index.js'),
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    plugins: [htmlWebpackPlugin],
    resolve: {
        extensions: ['.js', '.jsx']
    },
    devtool: 'cheap-eval-source-maps',
    stats: {
        colors: true,
        reasons: true,
        chunks: true
    },
    devServer: {
        port: 3001
    }
};
