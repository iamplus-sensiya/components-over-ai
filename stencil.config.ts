import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';

export const config: Config = {
  namespace: 'overaiComponents',
  outputTargets: [
    { type: 'dist' },
    { type: 'docs-readme' },
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
          'src/utils/theme/fallback-variables.scss'
        ]
      }
    )
  ],
  copy: [
    { src: 'assets' },
    { src: 'sections' }
  ],
  devServer: {
    openBrowser: false
  },
  bundles: [
    { components: ['oai-button'] },
    { components: ['oai-toolbar'] },
    { components: ['oai-progress-indicator'] },
    { components: ['oai-drawer-stack', 'oai-drawer'] },
    { components: ['oai-select'/*, 'oai-select-bind'*/] },
    { components: ['oai-include'] },
    { components: ['oai-lazy-content'] },
  ]
};
