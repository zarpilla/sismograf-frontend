<template>
  <section class="section text-center section-main granota">
    <b-container>
    <h2 class="main" v-if="organization">{{ organization.attributes.name }}</h2>
    <div class="org-desc" v-if="organization && organization.attributes.description" v-html="$md.render(organization.attributes.description)"></div>
    <h2 v-else class="main" v-t="'a-quin-ambit-correspon-el-teu-projecte'">A quin àmbit correspon el teu projecte?</h2>
    
    
      <div class="d-zflex flex-row justify-content-center buttons">
        <div class="p-3" v-for="questionnaire in questionnaires" v-bind:key="questionnaire.id">
          <nuxt-link
            :to="
              localePath(
                {
                  name: 'template-template-q',
                  params: { template: questionnaire.attributes.template.data.attributes.slug, q: questionnaire.attributes.slug },
                  query
                },
                questionnaire.attributes.template.data.attributes.locale
              )
            "
            class="button button-1 uppercase"
          >
            {{ questionnaire.attributes.buttonText || questionnaire.attributes.name }}
          </nuxt-link>
        </div>
      </div>
    </b-container>
  </section>
</template>
<script>
import _ from "lodash";

export default {
  data() {
    return {
      questionnaires: [],
      organization: null,
      query: null
    };
  },
  async asyncData({ $axios, app, route }) {
    try {
      const headers = {
        headers: {
          Authorization: `Bearer ${process.env.apiToken}`,
        },
      };
      var { data } = await $axios.get(
        `/applications?filters[slug][$eq]=${process.env.application}-${app.i18n.locale}&populate=questionnaires&populate=questionnaires.template&populate=guide_more_image&locale=${app.i18n.locale}`,
        headers
      );
      const application = data.data[0];

      const questionnaires = application.attributes.questionnaires.data.filter(q => q.attributes.visible)

      if (route.query.org) {
        var { data } = await $axios.get(
          `/organizations?filters[slug][$eq]=${route.query.org}&locale=${app.i18n.locale}&populate=logo&populate=questionnaires&populate=questionnaires.template&populate=questionnaires.image&token=${process.env.apiToken}`,
          headers
        );
        const organization = data.data[0]
        const query = { org: route.query.org };      

        return {
          questionnaires: organization.attributes.questionnaires.data.filter(q => q.attributes.visible),
          organization,
          query
        };
      }

      return {
        questionnaires,
      };
    } catch (e) {
      console.error("asyncData error");
      console.error(e);
    }
  },
  mounted() {
    const el = document.getElementById("full-page-container");
    el.classList.add("bg01");
    el.classList.remove("bg02");
    el.classList.remove("bgnone");
  },
  nuxtI18n: {
    paths: {
      ca: "/ambits",
      en: "/start",
      es: "/empieza",
    },
  },
};
</script>
<style scoped>
.section-main {
  padding-top: 235px;
}
.section-main {
  padding-top: 10vh;
}
.buttons > div {
  display: inline-block;
}
.org-desc{
  margin-top: 2rem;
}

@media (max-width: 1024px) {
  .section-main {
    padding-top: 3vh;
  }
}

@media (min-width: 1025px) and (max-width: 1919px) {
  .section-main {
    padding-top: 12.14px;
  }
}
</style>