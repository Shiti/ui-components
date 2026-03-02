import { defineConfig } from 'cypress'

import webpackConfig from './webpack.config'

export default defineConfig({
  allowCypressEnv: false,
  experimentalWebKitSupport: true,
  chromeWebSecurity: false,
  component: {
    devServer: {
      framework: 'react',
      bundler: 'webpack',
      webpackConfig,
    },
  },
})
