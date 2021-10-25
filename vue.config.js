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
  filenameHashing: true,
  lintOnSave: process.env.NODE_ENV !== 'production',
  productionSourceMap: false,
  parallel: require('os').cpus().length > 1,
  chainWebpack: (config) => {
    //定义全局别名
    config.resolve.alias
      .set('@', resolve('src'))
      .set('pages', resolve('src/views'))
    if (process.env.NODE_ENV !== 'dev') {
      config.optimization.splitChunks({
        chunks: 'all',
        cacheGroups: {
          vendors: {
            name: 'vendors',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
          },
          commons: {
            name: 'commons',
            test: resolve('src/components'),
            minChunks: 3,
            priority: 5,
            reuseExistingChunk: true,
          },
        },
      })
      config.optimization.runtimeChunk('single')
      //移除预加载，确保浏览器在刷新url的时候，只存在我当前路由所涉及到的内容。
      config.plugins.delete('prefetch')
      config.plugins.delete('preload')
    }
  },
  configureWebpack: (config) => {
    //为生产环境移除console debugger 代码压缩
    if (process.env.NODE_ENV !== 'dev') {
      config.plugins.push(
        new UglifyJsPlugin({
          uglifyOptions: {
            compress: {
              drop_debugger: true,
              drop_console: true,
              pure_funcs: ['console.log'],
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
    }
    //开启gizp压缩
  },
  //引入全局css变量
  css: {
    //是否开起css分离
    extract: false,
    sourceMap: process.env.NODE_ENV == 'production',
    requireModuleExtension: true,
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
    proxy: {
      '/projectApi': {
        target: 'http://10.122.17.38:8005',
        // target: 'http://10.122.17.38:8005', //dev
        // target: 'http://10.160.141.116:10085',
        changeOrigin: true,
        pathRewrite: {
          '^/projectApi': '',
        },
      },
      '/approvalApi': {
        target: 'http://10.122.17.38:8012',
        changeOrigin: true,
        pathRewrite: {
          '^/approvalApi': '',
        },
      },
      '/api': {
        // target: 'http://10.160.138.38:8788',
        target: 'http://rise-gateway-runtime.apps.vmocp-dev.csvw.com/',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '',
        },
      },
      '/quotationApiDL': {
        // target: 'http://10.160.138.38:8788',
        target: 'http://10.122.17.38:8025',
        changeOrigin: true,
        pathRewrite: {
          '^/quotationApiDL': '',
        },
      },
      '/supplierApiDL': {
        // 供应商
        // target: 'http://10.160.138.216:9029',
        target: 'http://10.122.17.38:8025',
        changeOrigin: true,
        pathRewrite: {
          '^/supplierApiDL': '',
        },
      },
      '/supplierApiWdl': {
        //   供应商
        target: 'http://10.122.17.38:8025',
        changeOrigin: true,
        pathRewrite: {
          '^/supplierApiWdl': '',
        },
      },
      '/supplierApiXW': {
        //   供应商
        target: 'http://10.122.17.38:8025',
        changeOrigin: true,
        pathRewrite: {
          '^/supplierApiXW': '',
        },
      },
      '/sourcingApiBob': {
        //   供应商
        target: 'http://10.122.17.38:8025',
        changeOrigin: true,
        pathRewrite: {
          '^/sourcingApiBob': '',
        },
      },
      supplierApiMH: {
        target: 'http://10.122.17.38:8025',
        // target: 'http://192.168.50.50:8029/',
        changeOrigin: true,
        pathRewrite: {
          '^/supplierApiMH': '',
        },
      },
      supplierApiWDL: {
        target: 'http://10.122.17.38:8025',
        // target: 'http://10.160.137.16:8029/',
        changeOrigin: true,
        pathRewrite: {
          '^/supplierApiWDL': '',
        },
      },
      supplierApiTYP: {
        target: 'http://10.122.17.38:8025',
        // target: 'http://192.168.50.152:8029/',
        changeOrigin: true,
        pathRewrite: {
          '^/supplierApiTYP': '',
        },
      },
      procurementrequirementZZB: {
        target: 'http://10.122.17.38:8023',
        // target: 'http://10.160.141.45:8023/',
        // target: 'http://10.160.136.144:8023/',
        changeOrigin: true,
        pathRewrite: {
          '^/procurementrequirementZZB': '',
        },
      },
      '/supplierApiWJS': {
        //王洁松服务地址
        // target: 'http://192.168.50.89:8029',
        // target: 'http://192.168.50.239:8029',
        target: 'http://10.122.17.38:8025',
        changeOrigin: true,
        pathRewrite: {
          '^/supplierApiWJS': '',
        },
      },
      '/mock': {
        target: 'https://www.fastmock.site/mock',
        changeOrigin: true,
        pathRewrite: {
          '^/mock': '/mock',
        },
      },
      '/nego': {
        target: 'http://10.122.17.38:8025',
        changeOrigin: true,
        pathRewrite: {
          '^/nego': '/nego',
        },
      },
      '/tpInfoApi': {
        //高攀弘服务地址http://10.122.17.38:8023/
        target: 'http://10.122.17.38:8023',
        //target: 'http://10.160.143.194:8023',
        // target: 'http://10.160.141.45:8023',
        changeOrigin: true,
        pathRewrite: {
          '^/tpInfoApi': '',
        },
      },
      '/partProcureApi': {
        //赵文鹏服务地址
        target: 'http://10.122.17.38:8025',
        //target: 'http://10.160.137.254:8025',
        changeOrigin: true,
        pathRewrite: {
          '^/partProcureApi': '',
        },
      },
      '/commonApi': {
        //向东，common模块的api地址
        target: 'http://10.122.17.38:8014',
        changeOrigin: true,
        pathRewrite: {
          '^/commonApi': '',
        },
      },
      '/rfqApi': {
        //周德华，rfq模块的api地址
        target: 'http://10.122.17.38:8025',
        // target: 'http://10.160.143.190:8025',
        // target: 'http://rise-front-web.apps.vmocp-dev.csvw.com', // SIT
        // target: 'http://10.160.137.16:8029',  // 周德华
        // target: 'http://192.168.50.89:8029', // 王洁松
        // target: 'http://10.160.141.72:8029', // 李自豪
        // target: 'http://192.168.50.152:8029', // 谭易平
        // target: 'http://10.160.137.16:8029', // 马浩
        changeOrigin: true,
        pathRewrite: {
          '^/rfqApi': '',
          // "^/rfqApi": "/api"
        },
      },
      '/wsApi': {
        target: 'ws://10.122.17.38:8014',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/wsApi': '',
        },
      },
      '/dictionaryApi': {
        // 数据字典api地址
        target: 'http://10.122.17.38:8011',
        // target: 'http://10.122.17.38:8011',
        changeOrigin: true,
        pathRewrite: {
          '^/dictionaryApi': '',
        },
      },
      '/usercenterApi': {
        // usercenter.../唐开雄
        // target: 'http://10.122.18.166:8015',
        target: 'http://10.122.17.38:8015',
        // target:'http://10.160.137.165:8015',
        changeOrigin: true,
        pathRewrite: {
          '^/usercenterApi': '',
        },
      },
      '/partsProcureApi': {
        // partsProcure.../许睿
        target: 'http://10.122.17.38:8018',
        changeOrigin: true,
        pathRewrite: {
          '^/partsProcureApi': '',
        },
      },
      '/ws2Api': {
        // ws2Api.../ 王鹏霄
        // target: 'http://10.122.17.38:8022', //	dev
        target: 'http://10.122.17.38:8022',	//	vmsit
        // target: 'http://192.168.50.160:8022', // 圆圆
        // target: 'http://192.168.50.166:8022', // 立立
        // target: 'http://192.168.50.94:8022',// 永厚
        // target: 'http://140cc4e9da89.ngrok.io',
        changeOrigin: true,
        pathRewrite: {
          '^/ws2Api': '',
        },
      },
      '/supplierApiRfqlist': {
        //   供应商
        target: 'http://10.122.17.38:8025',
        changeOrigin: true,
        pathRewrite: {
          '^/supplierApiRfqlist': '',
        },
      },
      '/supplierApi': {
        //   供应商
        target: 'http://10.122.17.38:8010',
        changeOrigin: true,
        pathRewrite: {
          '^/supplierApi': '',
        },
      },
      '/quotationApi': {
        // 供应商报价
        // target: 'http://10.160.136.42:8021',
        target: 'http://10.122.17.38:8025/',
        // target: 'http://10.160.136.83:8021', // 智博
        // target: 'http://10.160.138.206:8093', // 顾晓炜
        // target: 'http://10.122.17.38:8093', // 高攀弘
        changeOrigin: true,
        pathRewrite: {
          '^/quotationApi': '',
        },
      },
      '/partApi': {
        target: 'http://10.160.138.31:8788',
        changeOrigin: true,
        pathRewrite: {
          '^/partApi': '',
        },
      },
      '/aonApi': {
        //  target: 'http://10.122.17.38:8036',
        // target: 'http://10.160.143.174:8036',
        target: 'http://10.122.17.38:8036',
        changeOrigin: true,
        pathRewrite: {
          '^/aonApi': '',
        },
      },
      '/risemessage': {
        target: 'http://10.122.17.38:8044/risemessage',
        changeOrigin: true,
        pathRewrite: {
          '^/risemessage': '',
        },
      },
      '/newCommonApi': {
        target: 'http://10.122.17.38:8034',
        changeOrigin: true,
        pathRewrite: {
          '^/newCommonApi': '',
        },
      },
      '/biddingApi': {
        target: 'http://10.122.17.38:8056',
        changeOrigin: true,
        pathRewrite: {
          '^/biddingApi': '',
        },
      },
      //cf组件代理
      '/baseInfo': {
        target: 'http://10.122.17.38:8011/baseinfo',
        changeOrigin: true,
        pathRewrite: {
          '^/baseInfo': '',
        },
      },
      '/bizlog': {
        //cf
        target: 'http://10.122.17.38:8013/bizlog',
        changeOrigin: true,
        pathRewrite: {
          '^/bizlog': '',
        },
      },
      '/supplierSpiApi': {
        target: 'http://10.122.17.38:8010',
        changeOrigin: true,
        pathRewrite: {
          '^/supplierSpiApi': '',
        },
      },
      '/lier': {
        target: 'http://10.160.142.130:8036',
        changeOrigin: true,
        pathRewrite: {
          '^/lier': '',
        },
      },
      '/priceledgerApi': {
        target: 'http://10.122.17.38:8028',
        changeOrigin: true,
        pathRewrite: {
          '^/priceledgerApi': '',
        },
      },
      '/fileud': {
        target: 'http://10.122.17.38:8034/fileud',
        changeOrigin: true,
        pathRewrite: {
          '^/fileud': '',
        },
      },
      '/changepriceApi': {
        // 采购订单
        //target: 'http://http://10.122.17.38:8026/',
        target: 'http://10.122.17.38:8026',
        changeOrigin: true,
        logLevel: 'debug',
        pathRewrite: {
          '^/changepriceApi': '',
        },
      },
      '/supplierApplication': {
        // 蒋林明供应商接口
        target: 'http://10.122.17.38:8010',
        changeOrigin: true,
        logLevel: 'debug',
        pathRewrite: {
          '^/supplierApplication': '',
        },
      },
      '/nominateRecord':{
        //龙行伟定点记录接口
        // target:'http://10.160.141.127:8888',
        target:'http://10.160.139.234:8888',
        changeOrigin:true,
        pathRewrite: {
          '^/nominateRecord':'',
        }
      }
    },
  },
}
