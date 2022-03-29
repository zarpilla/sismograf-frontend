<template>
  <section class="section">
    <div class="z">
      <div
        class="column zcard"
        v-for="organization in organizations"
        v-bind:key="organization.id"
      >
      <h1>{{ organization.attributes.name }}</h1>
      <p v-if="organization.attributes.description" class="more" v-html="$md.render(organization.attributes.description)"></p>
      
        
        <div
          class="zcard mt-5"
          v-for="questionnaire in organization.attributes.questionnaires.data.filter(q => q.attributes && q.attributes.visible)"
          v-bind:key="questionnaire.id"
        >
          <p v-if="questionnaire.attributes.description" class="more" v-html="$md.render(questionnaire.attributes.description)"></p>
          <nuxt-link
            :to="
              localePath({
                name: 'template-slug',
                params: {
                  slug: questionnaire.attributes.template.data.attributes.slug,
                },
                query: { q: questionnaire.attributes.slug },
              })
            "
            @click.prevent.stop="$i18n.setLocale(template.attributes.locale)"
            exact-active-class="is-active"
            class="mt-5 btn btn-sismograf btn-next"
          >
            <span v-t="questionnaire.attributes.buttonText || questionnaire.attributes.name" />
            <font-awesome-icon :icon="fas.faLongArrowAltRight" />
          </nuxt-link>
          <div class="org-img" v-if="questionnaire.attributes.image && questionnaire.attributes.image.data && questionnaire.attributes.image.data.attributes">
            <img :src="questionnaireImage(questionnaire)" class="img-responsive">
          </div>
        </div>

      </div>
    </div>
  </section>
</template>
<script>
import _ from "lodash";
import { fas } from "@fortawesome/free-solid-svg-icons";

export default {
  data() {
    return {
      organizations: [],      
      apiUrl: process.env.API_URL
    };
  },
  computed: {},
  head() {
    return {};
  },  
  async asyncData({ $axios, app, error, store }) {
    let slug = app.context.route.params.slug;
    try {
      const headers = {
        headers: {
          Authorization: `Bearer ${process.env.API_TOKEN}`,
        },
      };
      var { data } = await $axios.get(
        `/organizations?filters[slug][$eq]=${slug}&locale=${app.i18n.locale}&populate=questionnaires&populate=questionnaires.template&populate=questionnaires.image&token=${process.env.API_TOKEN}`,
        headers
      );
      let organizations = data.data;

      if (data.length == 0) {
        error({ statusCode: 404, message: "Page not found" });
      }

      // let templates = data.data;
      console.log("organizations", organizations);

      return {
        organizations: organizations,
      };
    } catch (e) {
      console.error("asyncData error");
      console.error(e);
    }
  },
  methods: {
    fas() {
      return fas;
    },
    questionnaireImage(questionnaire) {
      return (this.apiUrl + questionnaire.attributes.image.data.attributes.url).replace('/api/', '/')
    }
  },
};
</script>
<style scoped>
h2.title {
  color: #fff;
  text-align: center;
  font-size: 80px;
  font-weight: bold;
  text-decoration: none !important;
}
a:hover {
  text-decoration: none !important;
}
h3.title {
  color: #fff;
  font-size: 30px;
  text-decoration: none !important;
}
.more{
  font-size: 16px;
}

.btn-sismograf {
  border: 0;
  background: rgb(85, 175, 184);
  color: #333;

  background: #fff;
  color: #333;
  border-radius: 6px;
  padding: 10px 20px;
  font-size: 16px;
  margin-bottom: 15px;
  cursor: pointer;
  /* text-transform: capitalize; */
}
</style>