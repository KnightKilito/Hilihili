module.exports = {
    // publicPath: './',
    // 项目打包时去除map文件
    // productionSourceMap: false,
    devServer: {
        open: true,
        host: '127.0.0.1',
        port: 8081,
        disableHostCheck: true,
        https: false,
        //以上的ip和端口是我们本机的;下面为需要跨域的
        proxy: {//配置跨域
            '/api': {
                target: 'http://localhost:8889',//这里后台的地址模拟的;应该填写你们真实的后台接口
                ws: true,
                changOrigin: true,//允许跨域
                pathRewrite: {
                    '^/api': ''//请求的时候使用这个api就可以
                }
            }
            
        }
    }
}