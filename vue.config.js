const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // //백엔드 쪽
  // outputDir:"../airDnS/src/main/resources/static",
  //
  // devServer: {
  //   proxy: {
  //     '/': {
  //       target: "http://localhost:8080",
  //       changeOrigin: true,
  //     }
  //   }
  // },
  pluginOptions: {
    vuetify: {
			// https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
		}
  }
})
