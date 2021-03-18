
const path = require('path')
const resolve = dir => path.join(__dirname,dir)
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CompressionPlugin = require("compression-webpack-plugin");
const px2rem = require('postcss-px2rem')
const postcss = px2rem({
  remUnit: 16
})
module.exports = {
  outputDir: 'dist',
  assetsDir: 'static',
  filenameHashing: true,
  lintOnSave: process.env.NODE_ENV !== 'production',
  productionSourceMap: false,
  parallel: require("os").cpus().length > 1,
  chainWebpack:config =>{
    config.plugins.delete('preload')
    config.plugins.delete('prefetch')
    config.optimization.minimize(true)
    config.resolve.symlinks(true)
    //定义全局别名
    config.resolve.alias
            .set('@', resolve('src'))
            .set('pages',resolve('src/views'))

    config.optimization.splitChunks({
                chunks: 'all',
                cacheGroups: {
                  vendors: {
                        name: 'vendors',
                        test: /[\\/]node_modules[\\/]/,
                        priority: 10
                    },
                    commons: {
                        name: 'commons',
                        test: resolve('src/components'),
                        minChunks: 3, 
                        priority: 5,
                        reuseExistingChunk: true
                    }
                }
            })
    config.optimization.runtimeChunk('single')
  },
  configureWebpack:config =>{
        //为生产环境移除console debugger 代码压缩
        if(process.env.NODE_ENV == 'production'){
          config.plugins.push(
            new UglifyJsPlugin({
                uglifyOptions: {
                    compress: {
                        drop_debugger: true,
                        drop_console: true,
                        pure_funcs: ['console.log']
                    }
                },
                sourceMap: false,
                parallel: true
            })
        )
        }
        config["externals"] = {
          'vue':'Vue',
          'vuex':'Vuex',
          'vue-router':'VueRouter',
          'axios':'axios',
          "moment": "moment",
          'element-ui':'ELEMENT',
          'vue-i18n': 'VueI18n',
          'i18n': 'i18n',
          'Ellipsis': 'Ellipsis',
          'SockJS': 'SockJS',
          'Stomp': 'Stomp'
        };
        //开启gizp压缩
        config.plugins.push(new CompressionPlugin({
              algorithm: 'gzip',
              test: new RegExp("\\.(" + ["js", "css"].join("|") + ")$"),
              threshold: 5120,
              minRatio: 0.8,
              cache: true,
              deleteOriginalAssets:false
        }))
  },
  //引入全局css变量
  css:{
    //是否开起css分离
    extract: false,
    sourceMap:process.env.NODE_ENV !== 'production',
    requireModuleExtension:true,
    loaderOptions:{
      sass:{
        implementation: require('sass'),
        additionalData:`@import "@/assets/style/global/variables.scss";`
      },
      postcss:{
        plugins:{postcss}
      }
    }
  },
  //本地server配置
  devServer:{
    open: true,
    host: "0.0.0.0",
    port: 8080,
    https: false,
    hotOnly: true,
    proxy:{
      '/mock':{
        target:'https://www.fastmock.site/mock',
        changeOrigin:true,
        pathRewrite:{
          "^/mock": "/mock"
        }
      },
      '/tpInfoApi':{ //高攀弘服务地址
        target:'http://10.13.38.100:8023',
        changeOrigin:true,
        pathRewrite:{
          "^/tpInfoApi": ""
        }
      },
      '/commonApi':{ //向东，common模块的api地址
        target:'http://10.13.38.100:8083',
        changeOrigin:true,
        pathRewrite:{
          "^/commonApi": ""
        }
      },
      '/rfqApi':{ //周德华，rfq模块的api地址
        target:'http://10.13.38.100:8888',
        changeOrigin:true,
        pathRewrite:{
          "^/rfqApi": ""
        }
      },
      '/wsApi': {
        target: 'ws://10.160.137.37:8014',
        changeOrigin: true,
        ws: true,
        pathRewrite:{
          "^/wsApi": ""
        }
      }
    }
  }
}