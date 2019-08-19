import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';

export const config: Config = {
  namespace: 'overaiComponents',
  outputTargets: [
    { type: 'dist' },
    { type: 'docs-readme' },
    {
      type: 'www',
      serviceWorker: {
        globPatterns: [
          '**/*.{js,css,json,html,ico,png}'
        ]
      }
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
    { components: ['oai-application-layout'] },
    { components: ['oai-button'] },
    { components: ['oai-toolbar'] },
    { components: ['oai-progress-indicator'] },
    { components: ['oai-drawer-stack', 'oai-drawer'] },
    { components: ['oai-segments', 'oai-resizer'] },
    { components: ['oai-tabs', 'oai-tab'] },
    { components: ['oai-ripple'] },
    { components: ['oai-include'] },
    { components: ['oai-lazy-content'] },
  ]
};
