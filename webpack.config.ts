import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import {Configuration} from 'webpack';
import {CleanWebpackPlugin} from "clean-webpack-plugin";

const path = require('path');
const isProductionBuild = process.env.NODE_ENV === 'production';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const config: Configuration & Record<string, any> = {
    mode: 'development',
    entry: {
        path: path.resolve(__dirname, 'src', 'index.ts')
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    target: ['web', 'es2017'],
    resolve: {
        fallback: {crypto: false},
        extensions: ['.tsx', '.ts', '.jsx', '.js', 'json', '...'],
    },
    performance: {
        hints: false
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'public'),
        },
        host: 'localhost',
        historyApiFallback: true,
        port: 3000,
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            configFile: path.resolve(__dirname, 'tsconfig.json'),
                        },
                    },
                ],
                exclude: /(node_modules)/
            },
            {
                test: /\.s[ac]ss$/i,
                include: path.resolve(__dirname, 'src'),
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader",
                ],
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: 'asset',
            },
            {
                test: /\.hbs$/i,
                loader: "handlebars-template-loader",
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: '**/*',
                    context: path.resolve(__dirname, 'src', 'assets'),
                    to: './assets',
                },
            ],
        }),
        new HtmlWebpackPlugin({
            template: 'src/index.html',
        }),
        new MiniCssExtractPlugin({
            filename: 'style-[hash].css',
        }),
    ],
};

module.exports = () => {
    config.mode = isProductionBuild ? 'production' : 'development';
    return config;
};

