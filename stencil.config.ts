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
    sass()
  ],
  copy: [
    { src: 'assets' }
  ],
  devServer: {
    openBrowser: false
  },
  bundles: [
    { components: ['my-component'] },
    { components: ['oai-side-drawer'] },
    { components: ['oai-button'] },
  ]
};
