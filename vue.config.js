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
				target: 'http://rise-gateway-runtime.apps.vmocp-test.csvw.com/riseekl/',
				changeOrigin: true,
				pathRewrite: {
					'^/eklApi': '',
				},
			},
			'/mtzApi': {
				// target: 'http://10.122.17.38:8046/mtz',
				target: 'http://rise-gateway-runtime.apps.vmocp-test.csvw.com/mtz',
				changeOrigin: true,
				pathRewrite: {
					'^/mtzApi': '',
				},
			},
			'/tpInfoApi': {
				target: 'http://10.122.17.38:8025',

				changeOrigin: true,
				pathRewrite: {
					'^/tpInfoApi': '',
				},
			},
			'/commonApi': {
				target: 'http://10.122.17.38:8014',
				changeOrigin: true,
				pathRewrite: {
					'^/commonApi': '',
				},
			},
			'/sourcingApi': {
				//   供应商
				// target: 'http://10.122.17.38:8025/sourcing/',
				target: 'http://rise-gateway-runtime.apps.vmocp-uat.csvw.com/sourcing',
				changeOrigin: true,
				pathRewrite: {
					'^/sourcingApi': '',
				},
			},
			'/usercenterApi': {
				// target: 'http://10.122.17.38:8015/usercenter',
				target:
					'http://rise-gateway-runtime.apps.vmocp-uat.csvw.com/usercenter/',
				changeOrigin: true,
				logLevel: 'info',
				pathRewrite: {
					'^/usercenterApi': '',
				},
			},
			'/dictionaryApi': {
				target: 'http://10.122.17.38:8011',
				changeOrigin: true,
				pathRewrite: {
					'^/dictionaryApi': '',
				},
			},
			'/projectApi': {
				target: 'http://10.122.17.38:8005/projectmgt',
				changeOrigin: true,
				pathRewrite: {
					'^/projectApi': '',
				},
			},
			'/priceledgerApi': {
				target: 'http://10.122.17.38:8028',
				changeOrigin: true,
				pathRewrite: {
					'^/priceledgerApi': '',
				},
			},
			'/supplierApi': {
				target: 'http://10.122.17.38:8010',
				changeOrigin: true,
				pathRewrite: {
					'^/supplierApi': '',
				},
			},
			'/aonApi': {
				// target: 'http://10.122.17.38:8036/aon/',
				target: 'http://rise-gateway-runtime.apps.vmocp-test.csvw.com/aon/',
				changeOrigin: true,
				pathRewrite: {
					'^/aonApi': '',
				},
			},
			'/partsProcureApi': {
				// target: 'http://10.122.17.38:8018',
				target:
					'http://rise-gateway-runtime.apps.vmocp-test.csvw.com/procurementrequirement/',
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
				target: `http://rise-gateway-runtime.apps.vmocp-test.csvw.com/tooling/web`,
				changeOrigin: true,
				pathRewrite: {
					['^' + process.env.VUE_APP_TOOLING]: '',
				},
			},
			'/newCommonApi': {
				target: 'http://10.122.17.38:8034',
				changeOrigin: true,
				pathRewrite: {
					'^/newCommonApi': '',
				},
			},
			'/partApi': {
				// target: 'http://10.122.17.38:8788',
				target: 'http://rise-gateway-runtime.apps.vmocp-test.csvw.com/parts/',
				changeOrigin: true,
				pathRewrite: {
					'^/partApi': '',
				},
			},
			'/approvalApi': {
				target: 'http://10.122.17.38:8012',
				changeOrigin: true,
				pathRewrite: {
					'^/approvalApi': '',
				},
			},
			'/purchaseApply': {
				target: 'http://10.122.17.38:8026',
				changeOrigin: true,
				pathRewrite: {
					'^/purchaseApply': '',
				},
			},
			[process.env.VUE_APP_MAIL]: {
				target: `http://rise-gateway-runtime.apps.vmocp-test.csvw.com/risemessage`,
				changeOrigin: true,
				pathRewrite: {
					['^' + process.env.VUE_APP_MAIL]: '',
				},
			},
			[process.env.VUE_APP_PURCHASE]: {
				changeOrigin: true,
				target:
					'http://rise-gateway-runtime.apps.vmocp-test.csvw.com/executionoperation/web',
				pathRewrite: {
					['^' + process.env.VUE_APP_PURCHASE]: '',
				},
			},
			// 主数据
			[process.env.VUE_APP_BASE_INFO]: {
				// target: `http://rise-nginx-internal.apps.vmocp-dev.csvw.com/baseinfo`,
				target: `http://rise-nginx-internal.apps.vmocp-test.csvw.com/baseApi`,
				changeOrigin: true,
				pathRewrite: {
					['^' + process.env.VUE_APP_BASE_INFO]: '',
				},
			},
			'/fileApi': {
				target: 'http://10.122.17.38:8034',
				target: 'http://rise-gateway-runtime.apps.vmocp-uat.csvw.com/fileud/',
				changeOrigin: true,
				pathRewrite: {
					'^/fileApi': '',
				},
			},
			'/biddingApi': {
				target: 'http://10.122.17.38:8056/bidding',
				changeOrigin: true,
				pathRewrite: {
					'^/biddingApi': '',
				},
			},
			'/baseinfo': {
				target: 'http://rise-gateway-runtime.apps.vmocp-test.csvw.com/baseinfo',
				changeOrigin: true,
				pathRewrite: {
					'^/baseinfo': '',
				},
			},
			'/supplierservice': {
				target: 'http://10.122.17.38:8010',
				changeOrigin: true,
			},
			'/supplier': {
				target: 'http://10.122.17.38:8017',
				changeOrigin: true,
			},
			[process.env.VUE_APP_BIZLOG]: {
				target: `http://10.122.17.38:8013/bizlog`,
				changeOrigin: true,
				pathRewrite: {
					['^' + process.env.VUE_APP_BIZLOG]: '',
				},
			},
			'/prApi': {
				target: 'http://10.122.17.38:8023',
				target:
					'http://rise-nginx-internal.apps.vmocp-test.csvw.com/partProcureApi/web',
				changeOrigin: true,
				pathRewrite: {
					'^/prApi': '',
				},
			},
		},
	},
}
