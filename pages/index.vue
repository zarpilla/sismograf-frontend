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
          :to="localePath('/template/' + template.id)"
          exact-active-class="is-active"
        >
          <h2 class="title is-3">
            {{ template.attributes.name }}
          </h2>

          <div class="zcard" v-html="template.attributes.description">            
          </div>
        </nuxt-link>
      </div>
    </div>
  </section>
</template>
<script>
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
      const { data } = await $axios.get(`/templates?token=${process.env.API_TOKEN}`, headers);

      if (data.length == 0) {
        error({ statusCode: 404, message: "Page not found" });
      }

      let templates = data.data;

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
</style>