import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';

export const config: Config = {
  namespace: 'overaiComponents',
  outputTargets: [
    { type: 'dist' },
    { type: 'docs' },
    {
      type: 'www',
      serviceWorker: null // disable service workers
    }
  ],
  globalStyle: 'src/styles/app.scss',
  plugins: [
    sass(
      {
        injectGlobalPaths: [
          // 'src/styles/abstracts/index.scss'
          'src/utils/components-utils.scss'
        ]
      }
    )
  ],
  copy: [
    { src: 'assets' }
  ],
  devServer: {
    openBrowser: false
  },
  bundles: [
    { components: ['oai-progress-indicator'] },
    { components: ['oai-button'] },
    { components: ['oai-anchor'] },
  ]
};
