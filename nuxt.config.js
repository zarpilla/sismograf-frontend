export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: process.env.TITLE || "Sismògraf",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    script: [
      {
        src: "/vendor/scrolloverflow/scrolloverflow.min.js",
      },
    ],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    "@/assets/fonts/stylesheet.css",
    "@/assets/css/works.scss",
    "@/assets/css/bg.scss",
    "@/assets/css/main.css",
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    "@/plugins/bootstrap-vue",
    "@/plugins/statistics",
    { src: "~/plugins/vue-ellipse-progress.js", mode: "client" },
    "@/plugins/axios",
    { src: "~/plugins/download-excel.js", mode: "client" },    
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
    "@nuxtjs/auth",
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    baseURL: process.env.API_URL,
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},
  markdownit: {
    preset: "default",
    linkify: true,
    breaks: true,
    injected: true,
  },
  i18n: {
    locales: [
      {
        code: "en",
        file: "en.js",
      },
      {
        code: "ca",
        file: "ca.js",
      },
      {
        code: "es",
        file: "es.js",
      },
    ],
    defaultLocale: "ca",
    detectBrowserLanguage: false,
    seo: false,
    strategy: "prefix_except_default",
    lazy: true,
    langDir: "lang/",
    zvueI18n: {
      fallbackLocale: "en",
      messages: {
        en: {
          welcome: "Welcome",
          Start: "Start!",
          "Successfully saved":
            "Successfully saved. Thank you very much for participating!",
          "Select labels": "We want to start knowing more about you...",
          Init: "Start",
          "Send and view Results": "View the results",
        },
        ca: {
          welcome: "Benvingudes",
          Start: "Començar",
          Domains: "Què treballarem?",
          Principles: "Principis",
          Next: "Següent",
          Indicators: "Indicadors",
          Save: "Guardar",
          Init: "Inici",
          "Successfully saved":
            "Guardat correctament. Moltes gràcies per la teva participació!",
          Organization: "Organització",
          "Send and view Results": "Veure els resultats!",
          Send: "Enviar",
          Results: "Resultats",
          "Select labels": "Volem començar sabent de tu...",
          "Date:": "Data:",
          "Organization:": "Organització:",
          "This poll is completely anonymous but if you want to answer:":
            "*Aquesta enquesta és totalment anònima, però si vols que t’enviem els resultats a la teva bústia, ens pots deixar un correu electrònic.",
          "If you want to receive information and results directly, you can leave us an email":
            "Si vols rebre informació i els resultats directament, ens pots deixar un correu electrònic",
          "Are you part of a formal or informal organization / group / company ?":
            "Formes part d’alguna organització / col·lectiu / grup formal o informal / empresa ?",
        },
        es: {
          welcome: "Bienvenidas",
          Start: "Empezar",
          Domains: "¿Que trabajaremos?",
          Principles: "Principios",
          Next: "Siguiente",
          Indicators: "Indicadores",
          Save: "Guardar",
          Init: "Inicio",
          "Successfully saved":
            "Guardado correctamente. ¡Muchas gracias por participar!",
          Organization: "Organitzación",
          "Send and view Results": "Ver los resultados",
          Send: "Enviar",
          Results: "Resultados",
          "Select labels": "Queremos empezar conociendo más sobre ti...",
          "Date:": "Fecha:",
          "Organization:": "Organitzación:",
          "This poll is completely anonymous but if you want to answer:":
            "Esta encuesta es completamente anónima pero si quieres responder:",
          "If you want to receive information and results directly, you can leave us an email":
            "Si quieres recibir información y los resultados directamente, puedes dejarnos un correo electrónico",
          "Are you part of a formal or informal organization / group / company ?":
            "¿Formas parte de alguna organización / colectivo / grupo formal o informal / empresa ?",
        },
      },
    },
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
    localStorage: false,
    strategies: {
      local: {
        token: {
          property: "jwt",
          global: true,
        },
        endpoints: {
          login: {
            url: "auth/local",
            method: "post",
            propertyName: "jwt",
          },
          user: {
            url: "users/me",
            method: "get",
            propertyName: false,
          },
          logout: false,
        },
      },
    },
  },
  server: {
    port: process.env.PORT || 3000,
  },
  env: {
    apiToken: process.env.API_TOKEN,
    apiBase: process.env.API_BASE,
    apiUrl: process.env.API_URL,
    // organization: process.env.ORG,
    language: process.env.LANG,
    // emptyEmail: process.env.EMPTY_EMAIL,
    // questionnaire: process.env.QUESTIONNAIRE,
    application: process.env.APPLICATION,
  },
};
