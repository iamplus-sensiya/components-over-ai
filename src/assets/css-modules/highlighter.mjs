// TODO make sure the polyfills is added conditionally
// polyfill fot css paint API
import('https://unpkg.com/css-paint-polyfill/dist/css-paint-polyfill.js');

// register progress variable for animated transition
// TODO this doesn't work
if ('registerProperty' in CSS) {
  CSS.registerProperty({
    name: '--highlighter-progress',
    syntax: '<number>',
    inherits: false,
    initialValue: 0.5
  })
}

// add the highlighter module
if ('paintWorklet' in CSS) {
  CSS.paintWorklet
    .addModule('/assets/css-modules/highlighter-worklet.js');
}
