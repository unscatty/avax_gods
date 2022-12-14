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
    // ['btn', 'px-4 py-1 rounded inline-block bg-teal-700 text-white cursor-pointer hover:bg-teal-800 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50'],
    [
      'icon-btn',
      'inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 hover:text-teal-600',
    ],

    // Utils CSS shortcuts
    {
      // general
      'head-text': 'font-rajdhani font-bold text-white sm:text-6xl text-4xl',
      'normal-text': 'font-rajdhani font-normal text-[24px] text-site-white',
      'footer-text': 'font-rajdhani font-medium text-base text-white',
      'info-text':
        'font-rajdhani font-medium text-lg text-site-violet cursor-pointer my-5',

      // glassmorphism
      'glass-effect': 'bg-white backdrop-filter backdrop-blur-lg bg-opacity-10',

      // hoc page
      'hoc-container': 'min-h-screen flex xl:flex-row flex-col relative',
      'hoc-content-box':
        'flex flex-1 justify-between bg-site-black py-8 sm:px-12 px-8 flex-col',
      'hoc-logo': 'w-[160px] h-[52px] object-contain cursor-pointer',
      'hoc-body-wrapper': 'flex-1 flex justify-center flex-col xl:mt-0 my-16',

      // join battle page
      'join-head-text': 'font-rajdhani font-semibold text-2xl text-white mb-3',
      'join-container': 'flex flex-col gap-3 mt-3 mb-5',
      'join-battle-title': 'font-rajdhani font-normal text-xl text-white',
      'join-loading': 'font-rajdhani font-normal text-xl text-white',

      // battleground page
      'battleground-container': 'min-h-screen bg-landing flex-col py-12 px-4',
      'battle-grounds-wrapper': 'flex-wrap mt-10 max-w-[1200px]',
      'battle-ground-card':
        'sm:w-[420px] w-full h-[260px] p-2 glass-morphism m-4 rounded-lg cursor-pointer battle-card',
      'battle-ground-card-img': 'w-full h-full object-cover rounded-md',
      'battle-ground-card-text':
        'font-rajdhani font-semibold text-2xl text-white',

      // Game page
      'game-container':
        'w-screen min-h-screen bg-cover bg-no-repeat bg-center flex-col',
      'game-move-box':
        'sm:w-20 w-14 sm:h-20 h-14 rounded-full cursor-pointer border-[2px]',
      'game-move-icon': 'w-1/2 h-1/w-1/2 object-contain',

      // player info component
      'player-img': 'w-14 h-14 object-contain rounded-full',
      'player-health':
        'flex flex-row bg-white rounded-md p-2 sm:min-w-[512px] min-w-[312px] sm:min-h-[48px] min-h-[40px] bg-opacity-10 backdrop-filter backdrop-blur-lg mx-3',
      'player-health-bar': 'sm:w-4 w-2 sm:h-8 h-6 rounded-sm',
      'player-mana':
        'w-14 h-14 rounded-full text-white font-rajdhani font-extrabold text-2xl cursor-pointer',
      'player-info': 'font-rajdhani font-medium',
      'player-info-span': 'font-extrabold text-white',

      // card component
      'card-container':
        'relative sm:w-[260px] w-[220px] sm:h-[335px] h-[280px] z-0 transition-all',
      'card-img': 'w-full h-full object-contain',
      'card-point-container':
        'absolute sm:w-[40px] w-[32px] sm:h-[40px] h-[32px] rounded-[25px] bottom-[31.4%]',
      'card-point': 'font-rajdhani text-[20px] font-bold',
      'card-text-container': 'absolute w-full bottom-[13.5%] left-3',
      'card-text': 'font-rajdhani text-[26px] font-bold text-white',

      // custom button component
      btn: 'px-4 py-2 rounded-lg bg-site-violet w-fit text-white font-rajdhani font-bold',

      // custom input component
      'form-label': 'font-rajdhani font-semibold text-2xl text-white mb-3',
      'form-input':
        'bg-site-dim-black text-white outline-none focus:outline-site-violet p-4 rounded-md sm:max-w-[50%] max-w-full',

      // gameload component
      'game-load-container':
        'absolute inset-0 z-10 w-full h-screen gameload flex-col',
      'game-load-btn-box': 'w-full flex justify-end px-8',
      'game-load-head-text': 'head-text',
      'game-load-text':
        'font-rajdhani text-site-white text-2xl mt-5 text-center',
      'game-load-players-box': 'flex justify-evenly items-center mt-20',
      'game-load-player-img':
        'md:w-36 w-24 md:h-36 h-24 object-contain rounded-full drop-shadow-lg',
      'game-load-player-text':
        'mt-3 font-rajdhani text-white md:text-xl text-base',
      'game-load-vs':
        'font-rajdhani font-extrabold text-site-violet text-7xl mx-16',

      // gameInfo component
      'game-info-icon-box': 'absolute right-2 top-1/2',
      'game-info-icon': 'bg-site-violet w-10 h-10 rounded-md cursor-pointer',
      'game-info-icon-img': 'w-3/5 h-3/5 object-contain invert',
      'game-info-sidebar':
        'absolute p-6 right-0 top-0 h-screen rounded-md flex-col transition-all ease-in duration-300',
      'game-info-sidebar-close-box': 'flex justify-end mb-8',
      'game-info-sidebar-close':
        'w-10 h-10 rounded-md bg-site-violet text-white font-rajdhani font-extrabold text-xl cursor-pointer',
      'game-info-heading': 'font-rajdhani font-bold text-white text-3xl',
      'game-info-text': 'font-rajdhani font-medium text-white text-xl mb-2',

      // common
      'flex-center': 'flex items-center justify-center',
      'flex-end': 'flex justify-end items-end',
      'flex-between': 'flex justify-between items-center',

      // alert
      info: 'text-blue-700 bg-blue-100 dark:bg-blue-200 dark:text-blue-800',
      success:
        'text-green-700 bg-green-100 dark:bg-green-200 dark:text-green-800',
      failure:
        'text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800',
      'alert-container': 'absolute z-10 top-5 left-0 right-0',
      'alert-wrapper': 'p-4 rounded-lg font-rajdhani font-semibold text-lg ',
      'alert-icon': 'flex-shrink-0 inline w-6 h-6 mr-2',

      // modal
      'modal-text':
        'font-rajdhani font-bold text-3xl text-white mb-6 text-center',
    },
  ],
  theme: {
    colors: {
      siteBlack: '#131519',
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
  transformers: [transformerDirectives(), transformerVariantGroup()],
  safelist: 'prose prose-sm m-auto text-left'.split(' '),
})
