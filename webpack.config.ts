import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import * as MiniCssExtractPlugin from 'mini-css-extract-plugin';
import * as path from 'path';
import {Configuration} from 'webpack';
import {CleanWebpackPlugin} from "clean-webpack-plugin";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const config: Configuration & Record<string, any> = {
    mode: 'development',
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle-[hash].js',
    },
    target: ['web', 'es2017'],
    resolve: {
        extensions: ['.ts', '.js', '.css'],
        alias: {
            'handlebars': 'handlebars/dist/handlebars.min.js',
        },
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'public'),
        },
        liveReload: true,
        compress: true,
        port: 3000,
        hot: false,
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
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader",
                ],
            },
            {
                test: /\.hbs$/, loader: "handlebars-loader", options: {
                    runtime: "handlebars/dist/handlebars.min.js",
                }
            },
            // {
            //     test: /\.hbs$/,
            //     loader: "handlebars-template-loader",
            // },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            filename: 'index.html',
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
            },
        }),
        new MiniCssExtractPlugin({
            filename: 'style-[hash].css',
        }),
    ],
};

export default config;
