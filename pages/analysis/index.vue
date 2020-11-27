<template>
  <section class="section">
    <div class="columns">
      <div
        class="column zcard"
        v-for="template in templates"
        v-bind:key="template.id"
      >
        <nuxt-link
          v-if="template.analysis && template.analysis.id"
          :to="localePath('/analysis/' + template.slug)"
          exact-active-class="is-active"
        >
          <h2 class="title is-3">
            {{ template.analysis.name_ca }}
          </h2>

          <div class="zcard" v-html="template.analysis.description_ca">            
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
      // title:
      //   this.article && this.article[`seo_${this.$i18n.locale}`]
      //     ? this.article[`seo_${this.$i18n.locale}`].meta_title + ' | ' + this.t('meta-company')
      //     : this.article[this.title_] + this.t('meta-company'),
      // meta: [
      // hid is used as unique identifier. Do not use `vmid` for it as it will not work
      // {
      //   hid: "description",
      //   name: "description",
      //   content: this.article[`seo_${this.$i18n.locale}`]
      //     ? this.article[`seo_${this.$i18n.locale}`].meta_description
      //     : "",
      // },
      // {
      //   hid: "og:title",
      //   name: "og:title",
      //   content: this.article[`seo_${this.$i18n.locale}`]
      //     ? this.article[`seo_${this.$i18n.locale}`].meta_title
      //     : this.article[`title_${this.$i18n.locale}`]
      // },
      // {
      //   hid: "og:description",
      //   name: "og:description",
      //   content: this.article[`seo_${this.$i18n.locale}`]
      //     ? this.article[`seo_${this.$i18n.locale}`].meta_description
      //     : ""
      // },
      // {
      //   hid: "og:image",
      //   name: "og:image",
      //   content:
      //     (this.article[`seo_${this.$i18n.locale}`] &&
      //     this.article[`seo_${this.$i18n.locale}`].og_image
      //       ? this.api_url + this.article[`seo_${this.$i18n.locale}`].og_image.formats.medium.url
      //       : null),
      // },
      // {
      //   hid: "robots",
      //   name: "robots",
      //   content: this.article[`seo_${this.$i18n.locale}`] != null
      //     ? ( this.article[`seo_${this.$i18n.locale}`].meta_index ? 'index' : 'noindex' )
      //     : 'all'
      // },
      //],
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
