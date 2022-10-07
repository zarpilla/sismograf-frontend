export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: process.env.TITLE || "Resilience earth",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    "@/plugins/bootstrap-vue",
    "@/plugins/statistics",
    { src: "~/plugins/vue-ellipse-progress.js", mode: "client" },
    "@/plugins/axios",
    { src: "~/plugins/download-excel.js", mode: "client" }
    // { src: '@/plugins/vue-html2pdf', mode: 'client' }
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: ["@nuxtjs/dotenv"],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/buefy
    //'nuxt-buefy',
    "nuxt-i18n",
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    // https://github.com/alvarotrigo/vue-fullpage.js/#usage-with-nuxtjs
    "nuxt-fullpage.js",
    "@nuxtjs/markdownit",
    "nuxt-fontawesome",
    "@nuxtjs/auth"
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    baseURL: process.env.API_URL
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},
  markdownit: {
    preset: "default",
    linkify: true,
    breaks: true,
    injected: true
  },
  i18n: {
    locales: ["en", "ca", "es"],
    defaultLocale: "en",
    detectBrowserLanguage: false,
    seo: false,
    strategy: "prefix_except_default",
    vueI18n: {
      fallbackLocale: "en",
      messages: {
        en: {
          welcome: "Welcome",
          Start: "Start!",
          "Successfully saved":
            "Successfully saved. Thank you very much for participating!",
            "Select labels": "We want to start knowing more about you...",
          Init: "Start",
        },
        ca: {
          welcome: "Benvingudes",
          Start: "Començar",
          Domains: "Dominis",
          Principles: "Principis",
          Next: "Següent",
          Indicators: "Indicadors",
          Save: "Guardar",
          Init: "Inici",
          "Successfully saved":
            "Guardat correctament. Moltes gràcies per la teva participació!",
          Organization: "Organització",
          "Send and view Results": "Guardar i veure resultats",
          Send: "Enviar",
          Results: "Resultats",
          "Select labels": "Volem començar sabent de tu...",
          "Date:": "Data:",
          "Organization:": "Organització:",
          "This poll is completely anonymous but if you want to answer:": "Aquesta enquesta és totalment anònima però si vols respondre:",
          "If you want to receive information and results directly, you can leave us an email": "Si vols rebre informació i els resultats directament, ens pots deixar un correu electrònic",
          "Are you part of a formal or informal organization / group / company ?": "Formes part d’alguna organització / col·lectiu / grup formal o informal / empresa ?"
        },
        es: {
          welcome: "Bienvenidas",
          Start: "Empezar",
          Domains: "Dominios",
          Principles: "Principios",
          Next: "Siguiente",
          Indicators: "Indicadores",
          Save: "Guardar",
          Init: "Inicio",
          "Successfully saved":
            "Guardado correctamente. ¡Muchas gracias por participar!",
          Organization: "Organitzación",
          "Send and view Results": "Guardar y ver resultados",
          Send: "Enviar",
          Results: "Resultados",
          "Select labels": "Queremos empezar conociendo más sobre ti...",
          "Date:": "Fecha:",
          "Organization:": "Organitzación:",
          "This poll is completely anonymous but if you want to answer:": "Esta encuesta es completamente anónima pero si quieres responder:",
          "If you want to receive information and results directly, you can leave us an email": "Si quieres recibir información y los resultados directamente, puedes dejarnos un correo electrónico",
          "Are you part of a formal or informal organization / group / company ?": "¿Formas parte de alguna organización / colectivo / grupo formal o informal / empresa ?"
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
          property: "jwt",
          global: true
        },
        endpoints: {
          login: {
            url: "auth/local",
            method: "post",
            propertyName: "jwt"
          },
          user: {
            url: "users/me",
            method: "get",
            propertyName: false
          },
          logout: false
        }
      }
    }
  },
  server: {
    port: process.env.PORT || 3000,
  },
  env: {
    apiToken: process.env.API_TOKEN,
    organization: process.env.ORG,
    language: process.env.LANG,
    emptyEmail: process.env.EMPTY_EMAIL
  }
};
