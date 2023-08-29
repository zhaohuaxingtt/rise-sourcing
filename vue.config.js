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
// const BASE_IP = 'http://rise-gateway-runtime.apps.vmocp-uat.csvw.com'

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
						test: resolve('src/components'),
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
		host: '0.0.0.0',
		port: 8080,
		https: false,
		hot: true,
		clientLogLevel: 'none',
		proxy: {
			// ------------------ Mock end ------------------------------
			// ------------------ 树形图 start ----------------------------
			[process.env.VUE_APP_MATERIEL]: {
				// target: `http://rise-nginx-internal.apps.vmocp-dev.csvw.com/riseprocsApi`,
				target: `${BASE_IP}/riseprocs/`,
				changeOrigin: true,
				pathRewrite: {
					['^' + process.env.VUE_APP_MATERIEL]: '',
				},
			},
			[process.env.VUE_APP_PRICELEDGER]: {
				// target: `http://rise-nginx-internal.apps.vmocp-dev.csvw.com/priceledgerApi`,
				target: `${BASE_IP}/priceledger`,
				changeOrigin: true,
				pathRewrite: {
					['^' + process.env.VUE_APP_PRICELEDGER]: '',
				},
			},
			[process.env.VUE_APP_COMMON]: {
				target: `${BASE_IP}/common`,
				changeOrigin: true,
				pathRewrite: {
					['^' + process.env.VUE_APP_COMMON]: '',
				},
			},
			[process.env.VUE_APP_PURCHASE]: {
				changeOrigin: true,
				// target: 'http://10.173.48.113:8080/executionoperation/web',
				target: `${BASE_IP}/executionoperation/web`,
				pathRewrite: {
					['^' + process.env.VUE_APP_PURCHASE]: '',
				},
			},
			[process.env.VUE_APP_AEKO]: {
				target: `${BASE_IP}/procurementrequirement`,
				changeOrigin: true,
				pathRewrite: {
					['^' + process.env.VUE_APP_AEKO]: '',
				},
			},
			// 主数据
			[process.env.VUE_APP_BASE_INFO]: {
				// target: `http://rise-nginx-internal.apps.vmocp-dev.csvw.com/baseinfo`,
				target: `${BASE_IP}/baseinfo/`,
				changeOrigin: true,
				pathRewrite: {
					['^' + process.env.VUE_APP_BASE_INFO]: '',
				},
			},
			// 主数据
			[process.env.VUE_APP_DIC]: {
				// target: `http://rise-nginx-internal.apps.vmocp-dev.csvw.com/baseinfo`,
				target: `${BASE_IP}/baseinfo/web`,
				changeOrigin: true,
				pathRewrite: {
					['^' + process.env.VUE_APP_DIC]: '',
				},
			},
			// 主数据
			[process.env.VUE_APP_DIC_API]: {
				// target: `http://rise-nginx-internal.apps.vmocp-dev.csvw.com/baseinfo`,
				target: `${BASE_IP}/baseinfo`,
				changeOrigin: true,
				pathRewrite: {
					['^' + process.env.VUE_APP_DIC_API]: '',
				},
			},
			// 主数据
			[process.env.VUE_APP_DIC]: {
				// target: `http://rise-nginx-internal.apps.vmocp-dev.csvw.com/baseinfo`,
				target: `${BASE_IP}/baseinfo/web`,
				changeOrigin: true,
				pathRewrite: {
					['^' + process.env.VUE_APP_DIC]: '',
				},
			},
			// 主数据
			[process.env.VUE_APP_DIC_API]: {
				// target: `http://rise-nginx-internal.apps.vmocp-dev.csvw.com/baseinfo`,
				target: `${BASE_IP}/baseinfo`,
				changeOrigin: true,
				pathRewrite: {
					['^' + process.env.VUE_APP_DIC_API]: '',
				},
			},

			[process.env.VUE_APP_SOURCING]: {
				target: `${BASE_IP}/sourcing/web`,
				changeOrigin: true,
				pathRewrite: {
					['^' + process.env.VUE_APP_SOURCING]: '',
				},
			},

			// ------------------ 合同管理  api ----------------------------
			[process.env.VUE_APP_CONTRACT]: {
				target: `${BASE_IP}/contract/web`,
				changeOrigin: true,
				pathRewrite: {
					['^' + process.env.VUE_APP_CONTRACT]: '',
				},
			},

			// ------------------ ekl api ----------------------------
			[process.env.VUE_APP_EKLAPI]: {
				target: `${BASE_IP}/riseekl/`,
				changeOrigin: true,
				pathRewrite: {
					['^' + process.env.VUE_APP_EKLAPI]: '',
				},
			},

			[process.env.VUE_APP_MODELCAR]: {
				target: `${BASE_IP}/tooling/car/package`,
				changeOrigin: true,
				pathRewrite: {
					['^' + process.env.VUE_APP_MODELCAR]: '',
				},
			},
			[process.env.VUE_APP_TOOLING]: {
				target: `${BASE_IP}/tooling/web`,
				changeOrigin: true,
				pathRewrite: {
					['^' + process.env.VUE_APP_TOOLING]: '',
				},
			},
			[process.env.VUE_APP_KPI]: {
				target: `${BASE_IP}/supplier/overall/web`,
				changeOrigin: true,
				pathRewrite: {
					['^' + process.env.VUE_APP_KPI]: '',
				},
			},

			[process.env.VUE_APP_APPROVAL]: {
				target: `${BASE_IP}/approval/web`,
				// target: 'http://rise-nginx-internal.apps.vmocp-test.csvw.com/approvalApi',
				changeOrigin: true,
				pathRewrite: {
					['^' + process.env.VUE_APP_APPROVAL]: '',
				},
			},

			[process.env.VUE_APP_FIXEDASSETS]: {
				target: `${BASE_IP}/fixedasset`,
				changeOrigin: true,
				pathRewrite: {
					['^' + process.env.VUE_APP_FIXEDASSETS]: '',
				},
			},

			[process.env.VUE_APP_MAIL]: {
				target: `${BASE_IP}/risemessage`,
				changeOrigin: true,
				pathRewrite: {
					['^' + process.env.VUE_APP_MAIL]: '',
				},
			},

			[process.env.VUE_APP_OKM]: {
				// target: `http://10.122.17.38:8040/okm/web/okm`,
				target: `${BASE_IP}/okm/web/okm`,
				changeOrigin: true,
				pathRewrite: {
					['^' + process.env.VUE_APP_OKM]: '',
				},
			},

			[process.env.VUE_APP_BASE_UPLOAD_API]: {
				target: `${BASE_IP}/fileud/`,
				changeOrigin: true,
				pathRewrite: {
					['^' + process.env.VUE_APP_BASE_UPLOAD_API]: '',
				},
			},

			[process.env.VUE_APP_MTZ]: {
				target: `${BASE_IP}/mtz`,
				changeOrigin: true,
				pathRewrite: {
					['^' + process.env.VUE_APP_MTZ]: '',
				},
			},

			//------------------ 组织 start ----------------------------
			[process.env.VUE_APP_USER_CENTER_API]: {
				//   供应商
				target: `${BASE_IP}/usercenter/`,
				changeOrigin: true,
				pathRewrite: {
					['^' + process.env.VUE_APP_USER_CENTER_API]: '',
				},
			},

			[process.env.VUE_APP_ORGANIZATION]: {
				//   供应商
				target: `${BASE_IP}/usercenter/`,
				changeOrigin: true,
				pathRewrite: {
					['^' + process.env.VUE_APP_ORGANIZATION]: '',
				},
			},

			[process.env.VUE_APP_USER_CENTER]: {
				// target: `http://10.122.17.38:8015/usercenter/`,
				target: `${BASE_IP}/usercenter/`,
				changeOrigin: true,
				pathRewrite: {
					['^' + process.env.VUE_APP_USER_CENTER]: '',
				},
			},

			//------------------- 业务日志 ---------------------
			[process.env.VUE_APP_BIZLOG]: {
				target: `${BASE_IP}/bizlog/`,
				changeOrigin: true,
				pathRewrite: {
					['^' + process.env.VUE_APP_BIZLOG]: '',
				},
			},

			//------------------- projectApi ---------------------
			[process.env.VUE_APP_PROJECTMGT]: {
				target: `${BASE_IP}/projectmgt/web`,
				changeOrigin: true,
				pathRewrite: {
					['^' + process.env.VUE_APP_PROJECTMGT]: '',
				},
			},

			//------------------- prApi ---------------------
			[process.env.VUE_APP_PR]: {
				target: `${BASE_IP}/procurementrequirement/web/`,
				changeOrigin: true,
				pathRewrite: {
					['^' + process.env.VUE_APP_PR]: '',
				},
			},

			// ------------------ 上传 ----------------------------
			[process.env.VUE_APP_FILEAPI]: {
				target: `${BASE_IP}/fileud`,
				changeOrigin: true,
				pathRewrite: {
					['^' + process.env.VUE_APP_FILEAPI]: ''
				}
			},

			// ------------------ 零件服务 ----------------------------
			[process.env.VUE_APP_PART]: {
				target: `${BASE_IP}/parts/web`,
				changeOrigin: true,
				pathRewrite: {
					['^' + process.env.VUE_APP_PART]: ''
				}
			},
			// ------------------ 零件服务 api ----------------------------
			[process.env.VUE_APP_PART_API]: {
				target: `${BASE_IP}/parts/`,
				changeOrigin: true,
				pathRewrite: {
					['^' + process.env.VUE_APP_PART_API]: ''
				}
			},
			// ------------------ aonApi ----------------------------
			[process.env.VUE_APP_POWEBI_KPI]: {
				target: `${BASE_IP}`,
				changeOrigin: true,
				pathRewrite: {
					['^' + process.env.VUE_APP_POWEBI_KPI]: ''
				}
			},
			// ------------------ TP服务 api ----------------------------
			[process.env.VUE_APP_PARTS]: {
				target: `${BASE_IP}/sourcing/web`,
				changeOrigin: true,
				pathRewrite: {
					['^' + process.env.VUE_APP_PARTS]: ''
				}
			},
			// -----------------ws3 供应商---------------------------
			[process.env.VUE_APP_SUPPLIER]: {
              //   供应商
              // target: `http://${BASE_IP}:8066/supplier/overall`,
              target: `${BASE_IP}/supplier/overall/web`,
              // target:'http://rise-gateway-runtime.apps.vmocp-uat.csvw.com/supplierservice/',
              changeOrigin: true,
              pathRewrite: {
				['^' + process.env.VUE_APP_SUPPLIER]: ''
              }
			},
			[process.env.VUE_APP_BIDDING]: {
              target: `${BASE_IP}/bidding/`,
              changeOrigin: true,
              pathRewrite: {
				['^' + process.env.VUE_APP_BIDDING]: ''
              }
			},
			[process.env.VUE_APP_PARTSPROCURE]: {
              target: `${BASE_IP}/parts/web`,
              changeOrigin: true,
              pathRewrite: {
				['^' + process.env.VUE_APP_PARTSPROCURE]: ''
              }
			},
			
		},
	},
}
