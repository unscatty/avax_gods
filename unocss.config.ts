import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  shortcuts: [
    ['btn', 'px-4 py-1 rounded inline-block bg-teal-700 text-white cursor-pointer hover:bg-teal-800 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50'],
    ['icon-btn', 'inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 hover:text-teal-600'],
  ],
  theme: {
    colors: {
      siteblack: '#131519',
      siteDimBlack: '#191d23',
      siteViolet: '#7f46f0',
      siteWhite: '#9eacc7',
    },
    backgroundImage: {
      astral: 'url("/images/background/astral.jpg")',
      saiman: 'url("/images/background/saiman.jpg")',
      eoaalien: 'url("/images/background/eoaalien.jpg")',
      panight: 'url("/images/background/panight.jpg")',
      heroImg: 'url("/images/background/hero-img.jpg")',
      landing: 'url("/images/background/landing.jpg")',
    },
  },
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      warn: true,
    }),
    presetTypography(),
    presetWebFonts({
      fonts: {
        rajdhani: {
          name: 'Rajdhani',
          provider: 'google',
          weights: [300, 400, 500, 600, 700],
        },
      },
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
  safelist: 'prose prose-sm m-auto text-left'.split(' '),
})
