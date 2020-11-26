/*
* 开发环境：
* HMR/server/
* */

const HtmlPlugin = require('html-webpack-plugin');
const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const Webpack = require('webpack');

const config = {
	cache:true,
	devtool : '#cheap-module-eval-source-map',
	devServer : {
		host:'0.0.0.0',
		port:'8080',
		overlay:true,
		hot:true
	},
	entry: {
		index:path.join(__dirname,'src/index.js'),
		materialList:path.join(__dirname,'src/materialList.js'),
		materialExcel:path.join(__dirname,'src/materialExcel.js'),
		materialUltraExcel:path.join(__dirname,'src/materialUltraExcel.js'),
		test:path.join(__dirname,'src/test.js'),
	},
	output: {
		filename: "[name].js",
		path:path.join(__dirname,'dist')
	},
	mode : 'development',
	module: {
		rules: [
			{
				test:/\.vue$/,
				exclude: /node_modules/,
				loaders:[
					'vue-loader'
				]
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: "babel-loader"
			},
			{
				test:/\.(sc|c)ss$/,
				exclude: /node_modules/,
				use:[
					'style-loader',
					'vue-style-loader',
					'css-loader',
					'sass-loader'
				]
			},
			{
				test: /\.(gif|jpg|jpeg|png|svg)$/,
				exclude: /node_modules/,
				use: {
					loader: 'url-loader'
				}
			}
		]
	},
	plugins: [
		// 显示模块相对路径，比如HMR更新时显示的信息
		new Webpack.NamedModulesPlugin(),
		// 开启HMR
		new Webpack.HotModuleReplacementPlugin(),
		// vueloader
		new VueLoaderPlugin(),
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
			title:'表格图片生成器',
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
	]
};

module.exports = config;