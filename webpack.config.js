const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const optimization = () => {
    const config = {
        splitChunks: {
            chunks: 'all'
        }
    }

    if (isProd) {
        config.minimizer = [
            new CssMinimizerPlugin(),
            new TerserPlugin(),
        ]
    }
    return config
}

const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`;

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',      
    entry: {
        main: './js/index.js'
    },

    output: {                              
        filename: `./js/${filename('js')}`,
        path: path.resolve(__dirname, 'dist'),
        publicPath: '',
        clean: true
    },
    resolve: {
        extensions: ['.js', '.json', '.jsx'],
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    },
    target: process.env.NODE_ENV === "development" ? "web" : "browserslist",
    devtool: isDev ? 'source-map' : false,
    optimization: optimization(),
    devServer: {
        historyApiFallback: true,
        open: true,
        compress: true,
        hot: isDev,
        port: 3000
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/index.html'),
            filename: 'index.html',
            minify: {
                collapseWhitespace: isProd
            }
        }),
        new MiniCssExtractPlugin({
            filename: `./css/${filename('css')}`
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    noErrorOnMissing: true,     
                    from: path.resolve(__dirname, 'src/assets'), 
                    to: path.resolve(__dirname, 'dist/assets') 
                }
            ]
        }),
    ],

    module: {
        rules: [ 
            // {
            //     test: /\.html$/,
            //     loader: 'html-loader',
            // },
            {
                test: /\.css$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                }, 'css-loader',
                {
                    loader: 'postcss-loader',
                    options: {
                        postcssOptions: {
                            plugins: [
                                [
                                    "postcss-preset-env",
                                    {
                                        autoprefixer: {grid: true}
                                    },
                                ],
                            ],
                        }
                    }
                },
            ]
            },
            {
                test: /\.s[ac]ss$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        publicPath: '../'
                    }
                },
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        "postcss-preset-env",
                                        {
                                            autoprefixer: {grid: true}
                                        },
                                    ],
                                ],
                            }
                        }
                    },
                    'sass-loader'
                ],
            },
            {
                test: /\.(png|jpg|svg|gif)$/,
                use: [
                    
                    `file-loader?name=./img/[name].[ext]`,
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            pngquant: {
                                quality: [0.75, 0.90],
                                speed: 4
                            },
                            mozjpeg: {
                                progressive: true,
                            },
                            gifsicle: {
                                interlaced: false,
                            },
                            webp: {
                                quality: 75
                            }
                        },
                    }],
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                use: [`file-loader?name=./fonts/${filename('[ext]')}`],
            },

            {
                test: /\.(mp4|webm)$/,
                use: [`file-loader?name=./video/${filename('[ext]')}`]
            },
            {
                test: /\.(mjs|js|jsx)$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        
                    }
                },
            },
        ]
    }
}