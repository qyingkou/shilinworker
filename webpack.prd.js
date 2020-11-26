/*
* 生产环境：
* HMR/server/
* */

const AnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CleanPlugin = require('clean-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const {VueLoaderPlugin} = require('vue-loader');

const config = {
	devtool : '#hidden-source-map',
	entry: {
		index:path.join(__dirname,'src/index.js'),
		materialList:path.join(__dirname,'src/materialList.js'),
		materialExcel:path.join(__dirname,'src/materialExcel.js'),
		materialUltraExcel:path.join(__dirname,'src/materialUltraExcel.js')
	},
	output: {
		filename: "[name].[chunkhash:8].js",
		path:path.join(__dirname,'dist')
	},
	mode : 'production',
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: "babel-loader"
			},
			{
				test:/\.vue$/,
				exclude: /node_modules/,
				loaders:[
					'vue-loader'
				]
			},
			{
				test: /\.(gif|jpg|jpeg|png|svg)$/,
				exclude: /node_modules/,
				use: {
					loader: 'url-loader',
					options: {
						limit: 1024,
						name: '[name].[hash:8].[ext]',
						outputPath: './images'
					}
				}
			},
			{
				test:/\.(sc|c)ss$/,
				exclude: /node_modules/,
				use:[
					MiniCssExtractPlugin.loader,
					// 'style-loader',
					'css-loader',
					'sass-loader'
				]
			}
		]
	},
	plugins: [
		new CleanPlugin(['dist']),
		new VueLoaderPlugin(),
		// css分离
		new MiniCssExtractPlugin({
			filename:'[name].[hash].css',
			chunkFilename:'[id].css'
		}),
		new AnalyzerPlugin(),
		// html入口
		new HtmlPlugin({
			title:'tools homepage',
			filename: 'index.html',
			chunks:['index','venders'],
			template:'./src/template/index.html',
			inject:'body'
		}),
		// 清单图片生成器
		new HtmlPlugin({
			title:'MaterialPage Maker',
			filename: 'materialList.html',
			chunks:['materialList','venders'],
			template:'./src/template/pc.html',
			inject:'body'
		}),
		// 表格图片生成器
		new HtmlPlugin({
			title:'MaterialExcel Maker',
			filename: 'materialExcel.html',
			chunks:['materialExcel','venders'],
			template:'./src/template/pc.html',
			inject:'body'
		}),
		// 复杂表格图片生成器
		new HtmlPlugin({
			title:'复杂表格图片生成器',
			filename: 'materialUltraExcel.html',
			chunks:['materialUltraExcel','venders'],
			template:'./src/template/pc.html',
			inject:'body'
		})
	],
	optimization : {
		minimize:true,	// 压缩
		splitChunks : {
			chunks: 'all',		// initial/async/all(default)
			minSize: 30000,	// 压缩前最小体积为该值（byte）即匹配，(default)
			minChunks: 1,		// 被引用次数小于等于该值即匹配，1（default）
			maxAsyncRequests: 5,	// 在按需加载模式时，请求数量达到该值即匹配（5 default）
			maxInitialRequests: 3,	// 在初始化加载模式时，引用次数达到该值即匹配（1 default）
			automaticNameDelimiter:'_',	// 自动命名时的块名称之间的连接符号
			name: true,			// 拆出来的文件名字，默认由块名+hash值组成
			// 缓存组继承自以上属性，但可以对他们进行改写
			cacheGroups:{
				commons:{
					test:/[\\/]node_modules[\\/]/,
					name:'venders'
				}
			}
		}
	}
};

module.exports = config;