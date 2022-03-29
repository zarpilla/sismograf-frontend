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
    { src: '~/plugins/vue-ellipse-progress.js', mode: 'client' },
    '@/plugins/axios',
    { src: '~/plugins/download-excel.js', mode: 'client' },
    // { src: '@/plugins/vue-html2pdf', mode: 'client' }
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
    defaultLocale: 'en',
    detectBrowserLanguage: false,
    seo: false,
    strategy: 'prefix_except_default',
    vueI18n: {
      fallbackLocale: 'en',      
      messages: {
        en: {
          welcome: 'Welcome',
          Empezar: 'Empezar!',
          "Dominios": "Dominios"
        },
        ca: {
          welcome: 'Benvingudes',
          Empezar: 'Començar',
          "Dominios": "Dominis",
          Principios: "Principis",
          Siguiente: "Següent",
          Indicadores: "Indicadors",
          "Guardar análisis": "Guardar anàlisi",
          "Guardar": "Guardar",
          "Información opcional:": "",
          "Inicio": "Inici",
          "Guardado correctamente": "Guardat correctament. Moltes gràcies per la teva participació!",
          "Organización": "Organització",
          "Send and view Results": "Guardar i veure resultats",
          "Send": "Enviar",
          "Results": "Resultats"
        },
        es: {
          welcome: 'Bienvenidas',
          Empezar: 'Empezar',
          "Send and view Results": "Enviar i ver resultados",
          "Send": "Enviar",
          "Results": "Resultados"
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
        token: {
          property: 'jwt',
          global: true,
        },
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
