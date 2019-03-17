import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';

export const config: Config = {
  namespace: 'oai',
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
      // {
      //   injectGlobalPaths: [
      //     'src/styles/abstracts/index.scss'
      //   ]
      // }
    )
  ],
  copy: [
    { src: 'assets' }
  ],
  devServer: {
    openBrowser: false
  },
  bundles: [
    { components: ['oai-side-drawer'] },
    { components: ['oai-progress-indicator'] },
    { components: ['oai-button'] },
  ]
};
