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
      '/mtzApi': {
        // target: 'http://10.122.17.38:8046',
        target: 'http://10.122.18.166:8046',
        changeOrigin: true,
        pathRewrite: {
          '^/mtzApi': '',
        },
      },
      '/tpInfoApi': {
        target: 'http://10.122.17.38:8023',
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
        target: 'http://10.122.17.38:8025',
        //target: 'http://10.122.18.166:8025',
        // target: 'http://10.160.143.3:8888',
        changeOrigin: true,
        pathRewrite: {
          '^/sourcingApi': '',
        },
      },
      '/usercenterApi': {
        target: 'http://10.122.17.38:8015/usercenter',
        changeOrigin: true,
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
        target: 'http://10.122.17.38:8036',
        changeOrigin: true,
        pathRewrite: {
          '^/aonApi': '',
        },
      },
      '/partsProcureApi': {
        target: 'http://10.122.17.38:8018',
        changeOrigin: true,
        pathRewrite: {
          '^/partsProcureApi': '',
        },
      },
      '/toolingApi': {
        target: 'http://10.122.17.38:8022',	//	vmsit
        changeOrigin: true,
        pathRewrite: {
          '^/toolingApi': '',
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
        target: 'http://10.122.17.38:8788',
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
          '^/purchaseApply': ''
        }
      },
      '/risemessage': {
        target: 'http://10.122.17.38:8044/risemessage',
        changeOrigin: true,
        pathRewrite: {
          '^/risemessage': '',
        },
      },
      '/fileud': {
        target: 'http://10.122.17.38:8034/fileud',
        changeOrigin: true,
        pathRewrite: {
          '^/fileud': '',
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
        target: 'http://10.122.17.38:8011/baseinfo',
        changeOrigin: true,
        pathRewrite: {
          '^/baseinfo': '',
        },
      },
      "/supplierservice": {
        target: "http://10.122.17.38:8010",
        changeOrigin: true,
      },
      "/supplier": {
        target: "http://10.122.17.38:8017",
        changeOrigin: true
      },
      [process.env.VUE_APP_BIZLOG]: {
        target: `http://10.122.17.38:8013/bizlog`,
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_BIZLOG]: ''
        }
      },
    },
  },
}
