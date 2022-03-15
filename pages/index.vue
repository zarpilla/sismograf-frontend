<template>
  <section class="section">
    <div class="columns">
      <div
        class="column zcard"
        v-for="template in templates"
        v-bind:key="template.id"
      >
        <nuxt-link
          v-if="template && template.id"
          :zto="localePath('/template/' + template.attributes.slug, template.attributes.locale)"
          :to="localePath({ name: 'template-slug', params: { slug: template.attributes.slug } },  template.attributes.locale)"
          @click.prevent.stop="$i18n.setLocale(template.attributes.locale)"
          exact-active-class="is-active"
        >
          <h3 class="title is-3">
            {{ template.attributes.name }}
          </h3>

          <!-- <div class="zcard" v-html="template.attributes.description">            
          </div> -->
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
      //api_url: process.env.strapiBaseUri
    };
  },
  computed: {},
  head() {
    return {
    };
  },
  async asyncData({ $axios, app, error, store }) {
    try {
      const headers = {
        headers: {
          'Authorization': `Bearer ${process.env.API_TOKEN}`
        }
      }
      var { data } = await $axios.get(`/templates?locale=es&token=${process.env.API_TOKEN}`, {});
      let templates = data.data;

      var { data } = await $axios.get(`/templates?locale=ca&token=${process.env.API_TOKEN}`, {});

      templates = _.concat(templates, data.data)

      // if (data.length == 0) {
      //   error({ statusCode: 404, message: "Page not found" });
      // }

      // let templates = data.data;

      return {
        templates: templates,
      };
    }
    catch (e) {
      console.error('asyncData error')
      console.error(e)
    }    
  },
};
</script>
<style scoped>
h2.title{
  color:#fff;
  text-align: center;
  font-size: 80px;
  font-weight: bold;
  text-decoration: none !important;
}
a:hover{
  text-decoration: none !important;
}
h3.title{
  color:#fff;
  font-size: 30px;
  text-decoration: none !important;
}
</style>