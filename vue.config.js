const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
    chainWebpack: config => {
        config.module
            .rule("i18n")
            .resourceQuery(/blockType=i18n/)
            .type('javascript/auto')
            .use("i18n")
            .loader("@kazupon/vue-i18n-loader")
            .end();
        config
          .plugin('html')
          .tap(args => {
              args[0].timestamp = +new Date()
              return args
          })
    },
    // 配置高于chainWebpack中关于 css loader 的配置
    css: {
        // 是否开启支持 foo.module.css 样式
        modules: false,

        // 是否使用 css 分离插件 ExtractTextPlugin，采用独立样式文件载入，不采用 <style> 方式内联至 html 文件中
        extract: true,

        // 是否构建样式地图，false 将提高构建速度
        sourceMap: false,

        // css预设器配置项
        loaderOptions: {
            css: {
                // options here will be passed to css-loader

                localIdentName: '[name]-[hash]',
                camelCase: 'only'
            },

            postcss: {
                // options here will be passed to postcss-loader
            },
            sass: {
                data: `@import "@/static/sass/mixins.sass","@/static/sass/theme.sass","@/static/sass/extends.sass";`
            }


        }
    },

    configureWebpack: {
        externals: {
            'AMap': 'AMap',
            'AMapUI': 'AMapUI'
        },
        resolve: {
            alias: {
                'vue$': 'vue/dist/vue.esm.js',
            }
        },
        plugins: [
            new CopyPlugin([
                {
                    from: path.join(__dirname, './config/*.json'),
                    to: path.join(__dirname, './dist/config/[name].js'),
                    transform (content) {
                        return `window.${process.env.VUE_APP_PAGE_CONFIG}=${content}`
                    }
                }
            ]),
        ]
    },

    // All options for webpack-dev-server are supported
    // https://webpack.js.org/configuration/dev-server/
    devServer: {
        open: true,

        host: '127.0.0.1',

        port: 3000,

        https: false,

        hotOnly: false,

        proxy: null,

        before: app => {}
    },
    // 构建时开启多进程处理 babel 编译
    parallel: require('os').cpus().length > 1,

    // https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
    pwa: {},

    // 第三方插件配置
    pluginOptions: {}
};