const VueSsrServerPlugin = require ('vue-server-renderer/server-plugin')
const VueSsrClientPlugin = require ('vue-server-renderer/client-plugin')
const nodeExternal = require('webpack-node-externals')
const merge = require('lodash.merge')
const TARGET_NODE=process.env.WEBPACK_TARGET==='node'
const target = TARGET_NODE?'server':'client'

module.exports={
    css:{
        extract:false
    },
    outputDir:`./dist/${target}`,
    configureWebpack:()=>({
        entry:`./src/entry-${target}.js`,
        devtool:'source-map',
        target:TARGET_NODE?'node':'web',
        node:TARGET_NODE?undefined:false,
        output:{
            libraryTarget:TARGET_NODE?'commonjs2':undefined
        },
        //依赖块加入白名单
        externals:TARGET_NODE?nodeExternal({allowlist:[/\.css$/]}):undefined,
        optimization:{
            splitChunks:false
        },
        plugins:[TARGET_NODE?new VueSsrServerPlugin():new VueSsrClientPlugin()]
    }),
    // chainWebpack:config=>{}
}
