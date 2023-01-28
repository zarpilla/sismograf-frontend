<template>
  <section class="section text-center granota">
    <div class="punts"></div>
    <div class="know">
      <nuxt-link :to="localePath({ name: 'did-you-know', query: query })">
        <img class="know-icon" src="~@/assets/images/know.svg" />
      </nuxt-link>
    </div>
    <h1 v-t="'el-sismograf'"></h1>
    <b-container>
      <b-row>
        <b-col md="10" offset-md="1">
          <div class="more-info">
            <h2
              v-t="
                'saps-en-quin-estat-esta-la-teva-organitzacio-o-projecte-quins-aspectes-li-cal-treballar'
              "
            ></h2>
            <h3
              v-t="
                'el-sismograf-es-una-eina-de-diagnosi-per-poder-evaluar-el-grau-de-resiliencia-de-la-teva-organitzacio-o-projecte-si-es-el-primer-cop-t-expliquem-com-funciona-sino-ja-pots-comencar'
              "
            ></h3>

            <div
              class="d-block d-md-flex flex-row justify-content-center buttons"
            >
              <div class="p-3">
                <nuxt-link
                  :to="localePath({ name: 'how-it-works', query: query })"
                  class="button button-1"
                  v-t="'com-funciona-1'"
                >
                </nuxt-link>
              </div>
              <div class="p-3">
                <nuxt-link
                  :to="localePath({ name: 'templates', query: query })"
                  class="button button-2"
                  v-t="'comencar-el-queestionari'"
                >
                </nuxt-link>
              </div>
            </div>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>
<script>
import _ from "lodash";

export default {
  middleware: ['language'],
  layout: 'home',
  data() {
    return {
      query: null,
    };
  },
  asyncData({
    isDev,
    route,
    store,
    env,
    params,
    query,
    req,
    res,
    redirect,
    error,
  }) {
    if (route.query.org) {
      const query = { org: route.query.org };
      return { query };
    }
  },
  mounted() {
    const el = document.getElementById("full-page-container");
    el.classList.add("bg01");
    el.classList.remove("bg02");
    el.classList.remove("bgnone");    
    document.body.classList.remove("bg-domain-0");
    document.body.classList.remove("bg-domain-1");
    document.body.classList.remove("bg-domain-2");
    document.body.classList.remove("bg-domain-3");
    document.body.classList.remove("bg-domain-content-0");
    document.body.classList.remove("bg-domain-content-1");
    document.body.classList.remove("bg-domain-content-2");
    document.body.classList.remove("bg-domain-content-3");
    document.body.classList.remove("bg-result");
  },
};
</script>
<style scoped>
.punts {
  background: url("~@/assets/images/punts.svg") no-repeat bottom center;
  padding-top: 235px;
  height: 80px;
}
h1 {
  font-size: 60px;
  font-weight: 700;
  line-height: 70px;
}
h2 {
  font-weight: 300;
  font-size: 40px;
  line-height: 45px;
  margin-top: 3rem;
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
.know {
  position: absolute;
  top: 3rem;
  right: 3rem;
}
.know-icon {
  background: url("~@/assets/images/know.svg") no-repeat bottom center;
  width: 60px;
  height: 60px;
  display: block;
}
@media (max-width: 1024px) {
  h1 {
    font-size: 10.1vw;
    line-height: 12.61666666666667vw;
    margin-top: 5vh;
  }
  h2 {
    font-size: 7.06666666666661vw;
    line-height: 9.325vw;
  }
  h3 {
    font-size: 4.55vw;
    line-height: 5.8vw;
  }

  h3.title a {
    font-size: 1.55vw;
  }
  .know {
    top: 1rem;
    right: 1rem;
  }
  .punts {
    padding-top: 3vh;
  }
}
@media (min-width: 1025px) and (max-width: 1919px) {
  h1 {
    font-size: 3.1vw;
    line-height: 3.61666666666667vw;
  }
  h2 {
    font-size: 2.06666666666661vw;
    line-height: 2.325vw;
  }
  h3 {
    font-size: 1.55vw;
    line-height: 1.8vw;
  }
  .punts {
    padding-top: 12.14vw;
  }
  h3.title a {
    font-size: 1.55vw;
  }
}
</style>