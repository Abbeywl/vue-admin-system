module.exports = {
  devServer: {
    port: 8080,
    host: 'localhost',
    https: false,
    open: true,
    // headers: {
    //   "Access-Control-Allow-Origin": "*",
    //   "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
    // },
    proxy: { 
      '/api': {
        // target: 'http://47.103.110.240:8218/',
        target: 'http://192.168.1.73:802/',
        secure: false,
        changOrigin: true, 
      },
       '/test': {
        target: 'http://192.168.1.73:802/',
        secure: false,
        changOrigin: true, 
      },
    }
  },
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          'primary-color': '#13c2c2',
          'layout-color': '#9867f7'
        },
        javascriptEnabled: true
      }
    }
  },
}