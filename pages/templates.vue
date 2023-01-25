<template>
  <section class="section text-center section-main granota">
    
    <h2 class="main">A quin àmbit correspon el teu projecte?</h2>

    <div class="d-zflex flex-row justify-content-center buttons">
      <div class="p-3" v-for="template in templates" v-bind:key="template.id">
        <nuxt-link
          :to="
            localePath(
              {
                name: 'template-slug',
                params: { slug: template.attributes.slug },
              },
              template.attributes.locale
            )
          "
          class="button button-3 uppercase"
        >
          {{ template.attributes.name }}
        </nuxt-link>
      </div>
    </div>
  </section>
</template>
<script>
import _ from "lodash";

export default {
  data() {
    return {
      templates: [],
    };
  },
  computed: {},
  head() {
    return {};
  },
  async asyncData({ $axios, app, error, store }) {
    try {
      const headers = {
        headers: {
          Authorization: `Bearer ${process.env.apiToken}`,
        },
      };
      var { data } = await $axios.get(
        `/templates?locale=${app.i18n.locale}&token=${process.env.apiToken}`,
        headers
      );
      let templates = data.data;

      return {
        templates,
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
};
</script>
<style scoped>
.section-main {
  padding-top: 235px;
}
.buttons > div {
  display: inline-block;
}

@media (max-width: 1024px)  {
  .section-main{
    padding-top: 3vh;
  }
}

@media (min-width: 1025px) and (max-width: 1919px) {
  .section-main{
    padding-top: 12.14px;
  }
}
</style>