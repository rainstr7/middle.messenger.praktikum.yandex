import HtmlWebpackPlugin from 'html-webpack-plugin';
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
        path: path.resolve(__dirname, 'dist'),
    },
    target: ['web', 'es2017'],
    resolve: {
        fallback: {crypto: false},
        extensions: ['.tsx', '.ts', '.jsx', '.js', 'json', '...'],
        alias: {
            utils: path.resolve(__dirname, './src/utils'),
            components: path.resolve(__dirname, './src/components'),
            pages: path.resolve(__dirname, './src/pages'),
            styles: path.resolve(__dirname, './src/styles'),
            api: path.resolve(__dirname, './src/api'),
        },
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'public'),
        },
        liveReload: true,
        compress: true,
        port: 3002,
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
        new HtmlWebpackPlugin({
            template: 'src/index.html',
        }),
        new MiniCssExtractPlugin({
            filename: 'style-[hash].css',
        }),
    ],
};

module.exports = () => {
    if (isProductionBuild) {
        config.mode = 'production';


    } else {
        config.mode = 'development';
    }
    return config;
};

// export default config;