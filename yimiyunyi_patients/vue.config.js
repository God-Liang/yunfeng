// vue.config.js

const port = 8080 // dev port

module.exports = {
  publicPath: process.env.NODE_ENV === 'development' ? '/' : './',
  outputDir: 'dist',
  assetsDir: 'static',
  devServer: {
    port: port,
    open: true,
    disableHostCheck: true,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      // change xxx-api/login => mock/login
      // detail: https://cli.vuejs.org/config/#devserver-proxy
      [process.env.VUE_APP_BASE_API]: {
        target: `http://localhost:${port}/mock`,
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_API]: ''
        }
      }
    }
  },
  css: {
    sourceMap: true,
    loaderOptions: {
      sass: {
        prependData: `
    @import "@/assets/styles/variable.scss";
    `
      }
    }
  }
}
