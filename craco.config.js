const CracoAlias = require('craco-alias');
// const TailwindCSS = require('tailwindcss');
// const AutoPreFixer = require('autoprefixer');

module.exports = {
  style: {
    postcssOptions: {
      plugins: [require('tailwindcss'), require('autoprefixer')],
    },
  },
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: 'tsconfig',
        tsConfigPath: 'tsconfig.paths.json',
      },
    },
  ],
};
