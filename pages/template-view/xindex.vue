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
          :to="localePath('/analysis/' + template.slug)"
          exact-active-class="is-active"
        >
          <h2 class="title is-3">
            {{ template.name }}
          </h2>

          <div class="zcard" v-html="template.description">            
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
    };
  },
  computed: {},
  head() {
    return {
    };
  },
  async asyncData({ $axios, app, error, store }) {
    var { data } = await $axios.get(`/templates`);

    if (data.length == 0) {
      error({ statusCode: 404, message: "Page not found" });
    }

    let templates = data;

    return {
      templates: templates,
    };
  },
};
</script>
