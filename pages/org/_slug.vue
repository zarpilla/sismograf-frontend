<template>
  <section class="section">
    <div class="z">
      <div
        class="column zcard"
        v-for="organization in organizations"
        v-bind:key="organization.id"
      >
        {{ organization.attributes.name }}

        <div
          class="zcard"
          v-for="questionnaire in organization.attributes.questionnaires.data.filter(q => q.attributes && q.attributes.visible)"
          v-bind:key="questionnaire.id"
        >
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
          >
            <h3 class="title is-3">
              {{ questionnaire.attributes.template.data.attributes.name }}
            </h3>
          </nuxt-link>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import _ from "lodash";

export default {
  data() {
    return {
      organizations: [],
      //api_url: process.env.strapiBaseUri
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
        `/organizations?filters[slug][$eq]=${slug}&locale=${app.i18n.locale}&populate=questionnaires&populate=questionnaires.template&token=${process.env.API_TOKEN}`,
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
</style>