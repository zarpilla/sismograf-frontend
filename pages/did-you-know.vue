<template>
  <section class="section text-left">
    <b-container>
      <b-row>
        <b-col md="5" offset-md="2">
          <div class="more-info">
            <h5 v-t="'sabies-que'"></h5>
            <h2
              v-t="
                'el-sismograf-mes-antic-del-mon-utilitzava-dracs-i-granotes-en-comptes-d-agulles-i-pendols'
              "
            ></h2>
            <div v-html="$t('vuit-dracs')"></div>
          </div>
        </b-col>
      </b-row>
    </b-container>
    <div class="next-container text-right">
      <nuxt-link
        :to="localePath({ name: '/', query: query })"
        class="button button-4"
        v-t="'tornar'"
      >
      </nuxt-link>
    </div>
  </section>
</template>
<script>
export default {
  data() {
    return {
      query: null
    };
  },
  asyncData({isDev, route, store, env, params, query, req, res, redirect, error}) {
    if (route.query.org) {
      const query = { org: route.query.org }
      return { query }
    }
  },
  mounted() {
    const el = document.getElementById("full-page-container");
    console.log("el", el);
    el.classList.add("bg02");
    el.classList.remove("bg01");
    el.classList.remove("bgnone");
  },
};
</script>
<style scoped>
h2 {
  font-weight: 700;
  font-size: 40px;
  line-height: 40px;
  margin-bottom: 3rem;
}
h3 {
  font-weight: 300;
  font-size: 30px;
  line-height: 35px;
  margin-top: 3rem;
}
h3.title a {
  color: #020034;
  font-size: 30px;
  text-decoration: none !important;
}
h5 {
  margin-top: 15vh;
  font-weight: 900;
  font-size: 15px;
  line-height: 19px;
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-bottom: 2rem;
}

@media (max-width: 1024px) {
  h2 {
    font-size: 7.06666666666661vw;
    line-height: 9.325vw;
  }
}
</style>