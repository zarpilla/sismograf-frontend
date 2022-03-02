export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'Resilience earth',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '@/plugins/bootstrap-vue',
    '@/plugins/statistics',
    '@/plugins/axios'
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    '@nuxtjs/dotenv'
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/buefy
    //'nuxt-buefy',
    'nuxt-i18n',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',   
    // https://github.com/alvarotrigo/vue-fullpage.js/#usage-with-nuxtjs 
    'nuxt-fullpage.js',
    "@nuxtjs/markdownit",
    'nuxt-fontawesome',
    '@nuxtjs/auth'
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    baseURL: process.env.API_URL
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
  },
  markdownit: {
    preset: "default",
    linkify: true,
    breaks: true,
    injected: true
  },
  i18n: {
    locales: ['en', 'ca', 'es'],
    defaultLocale: 'es',
    detectBrowserLanguage: false,
    seo: false,
    vueI18n: {
      fallbackLocale: 'es',      
      messages: {
        en: {
          welcome: 'Welcome'
        },
        ca: {
          welcome: 'Benvingudes'
        },
        es: {
          welcome: 'Bienvenidas'
        }
      }
    }
  },
  fontawesome: {    
    // imports: [
    //   //import whole set
    //   {
    //     set: '@fortawesome/free-solid-svg-icons',
    //     icons: ['fas']
    //   }
    // ]
  },
  router: {
    // middleware: 'guest'
  },
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            url: 'auth/local',
            method: 'post',
            propertyName: 'jwt'
          },
          user: {
            url: 'users/me',
            method: 'get',
            propertyName: false
          },
          logout: false
        }
      }
    }
  },
}
