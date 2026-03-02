// This file has been automatically migrated to valid ESM format by Storybook.
import { fileURLToPath } from 'node:url'

import type { StorybookConfig } from '@storybook/react-webpack5'
import path, { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(tsx)', '../docs/*.mdx'],
  addons: [
    '@espoc/storybook-addon-mock',
    {
      name: '@storybook/addon-docs',
      options: { transcludeMarkdown: true },
    },
    '@storybook/addon-webpack5-compiler-swc',
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  typescript: {
    // Overrides the default Typescript configuration to allow multi-package components to be documented via Autodocs.
    reactDocgen: 'react-docgen',
    check: false,
  },
  core: {
    disableTelemetry: true, // 👈 Disables telemetry
  },
  staticDirs: [
    '../public',
    {
      from: path.resolve(
        __dirname,
        '../node_modules/emoji-picker-element-data'
      ),
      to: 'node_modules/emoji-picker-element-data',
    },
  ],

  webpackFinal: async (config) => {
    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: true,
      syncWebAssembly: false,
    }

    return config
  },
}
export default config
