const path = require('path')
const resolve = (dir) => path.join(__dirname, dir)
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const ChangeNginxConfig = require(resolve(
	'./loadersPlugins/pluginTranslateNginxConfig'
))
const NodeserverUpload = require(resolve('./loadersPlugins/pluginLanguage'))
const px2rem = require('postcss-px2rem')
const postcss = px2rem({
	remUnit: 16,
})
//内存泄漏
require('events').EventEmitter.defaultMaxListeners = 0
const BASE_IP = 'http://rise-gateway-runtime.apps.vmocp-test.csvw.com'
module.exports = {
	publicPath: process.env.VUE_APP_PUBLICPATH,
	outputDir: 'dist',
	assetsDir: 'static',
	lintOnSave: false,
	productionSourceMap: false,
	parallel: require('os').cpus().length > 1,
	chainWebpack: (config) => {
		//定义全局别名
		config.resolve.alias
			.set('@', resolve('src'))
			.set('pages', resolve('src/views'))
		if (process.env.NODE_ENV == 'dev') {
			config.optimization.splitChunks({
				chunks: 'initial',
				cacheGroups: {
					vendors: {
						name: 'vendors',
						test: /[\\/]node_modules[\\/]/,
						priority: -10,
						reuseExistingChunk: true,
					},
					commons: {
						name: 'commons',
						priority: -11,
						reuseExistingChunk: true,
					},
				},
			})
		} else {
			config.optimization.splitChunks({
				chunks: 'all',
				maxAsyncRequests: 5,
				minChunks: 2,
				minSize: 30000,
				automaticNameDelimiter: '_',
				maxInitialRequests: 3,
				name: true,
				cacheGroups: {
					vendors: {
						name: 'vendors',
						test: /[\\/]node_modules[\\/]/,
						priority: -10,
						reuseExistingChunk: true,
					},
					commons: {
						name: 'commons',
						priority: -11,
						reuseExistingChunk: true,
					},
				},
			})
		}
	},
	configureWebpack: (config) => {
		config.plugins.forEach((val) => {
			if (val['__pluginConstructorName'] === 'HtmlWebpackPlugin') {
				val.options.CDN_HOST = process.env.CDN_HOST
			}
		})
		//为生产环境移除console debugger 代码压缩
		if (process.env.NODE_ENV !== 'dev') {
			config.plugins.push(
				new UglifyJsPlugin({
					uglifyOptions: {
						compress: {
							drop_debugger: true,
							drop_console: true,
							pure_funcs: ['console.log', 'console.warn'],
						},
					},
					sourceMap: false,
					parallel: true,
				}),
				//环境代码
				process.env.NODE_ENV == 'dev' ? '' : new ChangeNginxConfig()
			)
			config.plugins.push(
				new CompressionPlugin({
					algorithm: 'gzip',
					test: new RegExp('\\.(' + ['js', 'css'].join('|') + ')$'),
					threshold: 5120,
					minRatio: 0.8,
					cache: true,
					deleteOriginalAssets: false,
				})
			)
		}
		config['externals'] = {
			vue: 'Vue',
			vuex: 'Vuex',
			'vue-router': 'VueRouter',
			axios: 'axios',
			moment: 'moment',
			'element-ui': 'ELEMENT',
			'vue-i18n': 'VueI18n',
			i18n: 'i18n',
			Ellipsis: 'Ellipsis',
			html2canvas: 'html2canvas',
		}
		//开启gizp压缩
	},
	//引入全局css变量
	css: {
		//是否开起css分离
		extract: false,
		sourceMap: false,
		loaderOptions: {
			sass: {
				implementation: require('sass'),
				additionalData: `@import "@/assets/style/global/variables.scss";`,
			},
			postcss: {
				plugins: {
					postcss,
				},
			},
		},
	},
	//本地server配置
	devServer: {
		open: true,
		host: 'localhost',
		port: 8080,
		https: false,
		hot: true,
		clientLogLevel: 'none',
		proxy: {
			'/eklApi': {
				// target: 'http://10.122.17.38:8043/riseekl',
				target: `${BASE_IP}/riseekl`,
				changeOrigin: true,
				pathRewrite: {
					'^/eklApi': '',
				},
			},
			'/mtzApi': {
				// target: 'http://10.122.17.38:8046/mtz',
				target: `${BASE_IP}/mtz`,
				changeOrigin: true,
				pathRewrite: {
					'^/mtzApi': '',
				},
			},
			'/commonApi': {
				target: `${BASE_IP}/common`,
				changeOrigin: true,
				pathRewrite: {
					'^/commonApi': '',
				},
			},
			'/sourcingApi': {
				target: `${BASE_IP}/sourcing`,
				changeOrigin: true,
				pathRewrite: {
					'^/sourcingApi': '',
				},
			},
			'/usercenterApi': {
				target: `${BASE_IP}/usercenter`,
				changeOrigin: true,
				logLevel: 'info',
				pathRewrite: {
					'^/usercenterApi': '',
				},
			},
			'/projectApi': {
				target: `${BASE_IP}/projectmgt`,
				changeOrigin: true,
				pathRewrite: {
					'^/projectApi': '',
				},
			},
			'/priceledgerApi': {
				target: `${BASE_IP}/priceledger`,
				changeOrigin: true,
				pathRewrite: {
					'^/priceledgerApi': '',
				},
			},
			'/aonApi': {
				target: `${BASE_IP}/aon`,
				changeOrigin: true,
				pathRewrite: {
					'^/aonApi': '',
				},
			},
			'/partsProcureApi': {
				// target: 'http://10.122.17.38:8018',
				target: `${BASE_IP}/procurementrequirement/`,
				changeOrigin: true,
				pathRewrite: {
					'^/partsProcureApi': '',
				},
			},
			// '/toolingApi': {
			// 	target: 'http://10.122.17.38:8022', //	vmsit
			// 	changeOrigin: true,
			// 	pathRewrite: {
			// 		'^/toolingApi': '',
			// 	},
			// },
			[process.env.VUE_APP_TOOLING]: {
				target: `${BASE_IP}/tooling/web`,
				changeOrigin: true,
				pathRewrite: {
					['^' + process.env.VUE_APP_TOOLING]: '',
				},
			},
			'/partApi': {
				// target: 'http://10.122.17.38:8788',
				target: `${BASE_IP}/parts/`,
				changeOrigin: true,
				pathRewrite: {
					'^/partApi': '',
				},
			},
			'/approvalApi': {
				target: `${BASE_IP}/approval`,
				changeOrigin: true,
				pathRewrite: {
					'^/approvalApi': '',
				},
			},
			[process.env.VUE_APP_MAIL]: {
				target: `${BASE_IP}/risemessage`,
				changeOrigin: true,
				pathRewrite: {
					['^' + process.env.VUE_APP_MAIL]: '',
				},
			},
			[process.env.VUE_APP_PURCHASE]: {
				changeOrigin: true,
				target: `${BASE_IP}/executionoperation/web`,
				pathRewrite: {
					['^' + process.env.VUE_APP_PURCHASE]: '',
				},
			},
			// 主数据
			[process.env.VUE_APP_BASE_INFO]: {
				// target: `http://rise-nginx-internal.apps.vmocp-dev.csvw.com/baseinfo`,
				target: `${BASE_IP}/baseinfo`,
				changeOrigin: true,
				pathRewrite: {
					['^' + process.env.VUE_APP_BASE_INFO]: '',
				},
			},
			'/fileApi': {
				target: `${BASE_IP}/fileud/`,
				changeOrigin: true,
				pathRewrite: {
					'^/fileApi': '',
				},
			},
			'/biddingApi': {
				target: `${BASE_IP}/bidding`,
				changeOrigin: true,
				pathRewrite: {
					'^/biddingApi': '',
				},
			},
			'/baseinfo': {
				target: `${BASE_IP}/baseinfo`,
				changeOrigin: true,
				pathRewrite: {
					'^/baseinfo': '',
				},
			},
			'/supplierservice': {
				target: `${BASE_IP}/supplier/overall`,
				changeOrigin: true,
			},
			'/supplier': {
				target: `${BASE_IP}/supplier/overall`,
				changeOrigin: true,
			},
			[process.env.VUE_APP_BIZLOG]: {
				target: `${BASE_IP}/bizlog`,
				changeOrigin: true,
				pathRewrite: {
					['^' + process.env.VUE_APP_BIZLOG]: '',
				},
			},
			'/prApi': {
				target: `${BASE_IP}/partProcureApi/web`,
				changeOrigin: true,
				pathRewrite: {
					'^/prApi': '',
				},
			},
		},
	},
}
