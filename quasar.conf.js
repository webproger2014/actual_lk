// Configuration for your app
// https://quasar.dev/quasar-cli/quasar-conf-js

module.exports = function (ctx) {
  return {
    // app boot file (/src/boot)
    // --> boot files are part of "main.js"
    // https://quasar.dev/quasar-cli/cli-documentation/boot-files
    boot: [
      'axios',
      'filters',
      'notify',
      'lodash',
      'auth',
      'updatelkinfo',
      'handlers',
      'form',
    ],

    // https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-css
    css: [
      'app.sass'
    ],

    // https://github.com/quasarframework/quasar/tree/dev/extras
    extras: [
      // 'ionicons-v4',
      // 'mdi-v4',
    //'fontawesome-v5',
      // 'eva-icons',
      // 'themify',
      // 'roboto-font-latin-ext', // this or either 'roboto-font', NEVER both!

      'roboto-font', // optional, you are not bound to it
      'material-icons' // optional, you are not bound to it
    ],

    // https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-framework
    framework: {
      // iconSet: 'ionicons-v4', // Quasar icon set
      // lang: 'de', // Quasar language pack

      // Possible values for "all":
      // * 'auto' - Auto-import needed Quasar components & directives
      //            (slightly higher compile time; next to minimum bundle size; most convenient)
      // * false  - Manually specify what to import
      //            (fastest compile time; minimum bundle size; most tedious)
      // * true   - Import everything from Quasar
      //            (not treeshaking Quasar; biggest bundle size; convenient)
      all: 'auto',
      lang: 'ru',
      components: [
        'QLayout',
        'QPageContainer',
        'QPage',
        'QHeader',
        'QFooter',
        'QDrawer',
        'QVideo',
        'QPageSticky',
        'QPageScroller',
        'QCarousel',
        'QCarouselControl',
        'QCarouselSlide',
        'QTable',
        'QInfiniteScroll',
        'QVirtualScroll',
        'QDialog',
        'QTabPanels',
        'QTabPanel',
      ],
      directives: ['ClosePopup', 'Scroll'],

      // Quasar plugins
      plugins: ['Notify','LocalStorage', 'Cookies']
    },

    // https://quasar.dev/quasar-cli/cli-documentation/supporting-ie
    supportIE: true,

    // https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-build
    build: {
      scopeHoisting: true,
      vueRouterMode: 'history',
      // showProgress: false,
      // gzip: true,
      // analyze: true,
      // preloadChunks: false,
      // extractCSS: false,

      // https://quasar.dev/quasar-cli/cli-documentation/handling-webpack
      extendWebpack (cfg) {
        cfg.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /node_modules/,
          options: {
            formatter: require('eslint').CLIEngine.getFormatter('stylish'),
            fix: true
          }
        })
      }
    },

    // https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-devServer
    devServer: {
  //    https: true,
      open: true // opens browser window automatically
    },

    // animations: 'all', // --- includes all animations
    // https://quasar.dev/options/animations
    animations: ['fadeIn', 'fadeOut', 'slideInUp', 'slideInLeft', 'bounce'],

    // https://quasar.dev/quasar-cli/developing-ssr/configuring-ssr
    ssr: {
      pwa: false
    },

    // https://quasar.dev/quasar-cli/developing-pwa/configuring-pwa
    pwa: {
      // workboxPluginMode: 'InjectManifest',
      // workboxOptions: {}, // only for NON InjectManifest
      workboxOptions: {
        skipWaiting: true,
        clientsClaim: true
      },
      manifest: {
        name: 'Веванта',
        short_name: 'Веванта',
        description: 'Центр загородного строительства',
        display: 'standalone',
        start_url: '.',
        orientation: 'any',
        background_color: '#ffffff',
        theme_color: '#2e6992',
        icons: [
          {
              "src": "statics/icons/icon-36x36.png",
              "sizes": "36x36",
              "type": "image/png"
          },
          {
              "src": "statics/icons/icon-48x48.png",
              "sizes": "48x48",
              "type": "image/png"
          },
          {
              "src": "statics/icons/icon-72x72.png",
              "sizes": "72x72",
              "type": "image/png"
          },
          {
              "src": "statics/icons/icon-96x96.png",
              "sizes": "96x96",
              "type": "image/png"
          },
          {
            'src': 'statics/icons/icon-128x128.png',
            'sizes': '128x128',
            'type': 'image/png'
          },
          {
              "src": "statics/icons/icon-144x144.png",
              "sizes": "144x144",
              "type": "image/png"
          },
          {
            'src': 'statics/icons/icon-192x192.png',
            'sizes': '192x192',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-256x256.png',
            'sizes': '256x256',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-384x384.png',
            'sizes': '384x384',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-512x512.png',
            'sizes': '512x512',
            'type': 'image/png'
          }
        ]
      }
    },

    // https://quasar.dev/quasar-cli/developing-cordova-apps/configuring-cordova
    cordova: {
      // id: 'org.cordova.quasar.app',
      // noIosLegacyBuildFlag: true, // uncomment only if you know what you are doing
    },

    // https://quasar.dev/quasar-cli/developing-electron-apps/configuring-electron
    electron: {
      // bundler: 'builder', // or 'packager'

      extendWebpack (cfg) {
        // do something with Electron main process Webpack cfg
        // chainWebpack also available besides this extendWebpack
      },

      packager: {
        // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options

        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',

        // Windows only
        // win32metadata: { ... }
      },

      builder: {
        // https://www.electron.build/configuration/configuration

        // appId: 'crm_client'
      }
    }
  }
}
