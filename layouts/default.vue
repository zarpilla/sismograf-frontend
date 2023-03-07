<template>
  <div class="full-page-container" id="full-page-container">
    <div class="fake-container">
      <div class="xalign">
        <nuxt />
      </div>
    </div>
    <div class="zfooter">
      <Footer></Footer>
    </div>
  </div>
</template>
<script>
import Footer from "~/components/Footer";

export default {
  components: {
    Footer,
  },
  head() {
    return {
      title:
        this.application &&
        this.application.attributes &&
        this.application.attributes.name
          ? this.application.attributes.name
          : process.env.TITLE,
    };
  },
  data() {
    return {
      application: null,
    };
  },
  async fetch() {
    var { data } = await this.$axios.get(
      `/applications?filters[slug][$eq]=${process.env.application}-${this.$i18n.locale}&populate=footer&populate=footer.logo1&populate=footer.logo2&populate=guide_more_image&locale=${this.$i18n.locale}`,
      {}
    );
    this.application = data.data[0];
  },
  fetchOnServer: true,
};
</script>
<style scoped>
.navbar-abs {
  position: absolute;
  z-index: 10;
}
.navbar-abs img {
  margin-top: 5px;
  margin-left: 5px;
}
.full-page-container {
  background: #FBF7EB;
  min-height: 100vh;
}

.bg01 {
  background: #FBF7EB url("~@/assets/images/bg01_1920.png") no-repeat top center;
}

.bg02 {
  background: #FBF7EB url("~@/assets/images/bg02_1920.png") no-repeat top center;
}
.bgnone {
  background: #FBF7EB;
}
.xalign {
  color: #020034;
  padding-bottom: 120px;
}

@media (max-width: 1024px)  {
  .xalign {
    padding-bottom: 2rem;
  }
  
}
</style>