<template>
  <div class="fullpage-container fullpage-container-guide">
    <div class="nav-guide"></div>
    <no-ssr>
      <full-page ref="fullpage" :options="options" id="fullpage">
        <div
          class="section zfp-auto-height-responsive how-it-works view-result bg-guide aligned"
        >
          <div class="sismo-text bread-guide">
            <div v-t="'guia-d-us-del-sismograf'"></div>
            <div v-t="'introduccio-1'"></div>
          </div>
          <div class="mt-10v">
            <b-container class="zpt-5">
              <b-row>
                <b-col md="6" offset-md="3">
                  <div class="punts"></div>
                  <h1 class="text-center sismo-title" v-t="'el-sismograf'">
                    El Sismògraf
                  </h1>
                  <h2
                    class="text-center sismo-subtitle"
                    v-t="'guia-d-us-i-diagnosi'"
                  ></h2>
                </b-col>
              </b-row>
            </b-container>
            <b-container class="mt-5 mb-3">
              <b-row>
                <video width="100%" height="auto" controls class="video-radius">
                  <source :src="`/videos/guia-${$i18n.locale}.mp4`" type="video/mp4" />
                </video>
              </b-row>
            </b-container>
            <b-container class="container-mb">
              <b-row>
                <b-col md="8" offset-md="2">
                  <div class="text-content">
                    <h3 class="mt-5 mb-5" v-t="'introduccio'"></h3>
                    <div
                      class="content"
                      :inner-html.prop="$md.render($t('introduccio-content'))"
                    ></div>
                  </div>
                </b-col>
              </b-row>
            </b-container>
            <div class="next-container text-right">
              <!-- <button class="button button-4 mr-auto previous" @click="prev">
                <span v-t="'prev'" />
              </button> -->
              <button class="button button-4 ml-auto" @click="next">
                <span v-t="'next'" />
              </button>
            </div>
          </div>
        </div>
        <div
          class="section zfp-auto-height-responsive how-it-works view-result bg-none aligned"
        >
          <div class="sismo-text bread-guide">
            <div v-t="'guia-d-us-del-sismograf'"></div>
            <div v-t="'espiral-regeneratiu'"></div>
          </div>
          <div class="bg-espiral">
            <b-container class="container-mt container-mb">
              <b-row>
                <b-col md="8" offset-md="2">
                  <div class="text-content">
                    <h3 class="mt-5 mb-5" v-t="'espiral-regeneratiu'"></h3>
                    <div
                      class="content"
                      :inner-html.prop="$md.render($t('espiral-content'))"
                    ></div>
                    <div class="mt-5">
                      <Espiral />
                    </div>
                  </div>
                </b-col>
              </b-row>
            </b-container>
            <div class="next-container text-right">
              <button class="button button-4 mr-auto previous" @click="prev">
                <span v-t="'prev'" />
              </button>
              <button class="button button-4 ml-auto" @click="next">
                <span v-t="'next'" />
              </button>
            </div>
          </div>
        </div>
        <div
          class="section zfp-auto-height-responsive how-it-works view-result aligned"
        >
          <div class="sismo-text bread-guide">
            <div v-t="'guia-d-us-del-sismograf'"></div>
            <div v-t="'tipus-de-paradigmes-1'"></div>
          </div>
          <div class="bg-guide-3">
            <b-container class="container-mt container-mb">
              <b-row>
                <b-col md="8" offset-md="2">
                  <div class="text-content">
                    <h3
                      class="mt-5 mb-5"
                      v-t="'tipus-de-paradigmes-culturals-dracs'"
                    ></h3>
                    <div
                      class="content"
                      :inner-html.prop="$md.render($t('dracs-content'))"
                    ></div>
                  </div>
                </b-col>
                <b-col md="2"></b-col>
              </b-row>
              <b-row class="zpt-5 mt-5">
                <b-col md="2">
                  <img src="~/assets/images/ellipses.svg" class="zellipses" />
                </b-col>
                <b-col md="2">
                  <div class="states text-center pt-5">
                    <div class="state-num" v-t="'3r-estat'">3r estat</div>
                    <h4
                      class="state-name"
                      v-t="'col-lectivisme'"
                      @mouseover="over('expo-1-content')"
                      @mouseout="out()"
                    >
                      Col·lectivisme
                    </h4>
                    <img
                      src="~/assets/images/state-arrow.svg"
                      class="state-arrow"
                    />

                    <div class="state-num" v-t="'2n-estat'">2n estat</div>
                    <h4
                      class="state-name"
                      v-t="'individualisme'"
                      @mouseover="over('expo-2-content')"
                      @mouseout="out()"
                    >
                      Individualisme
                    </h4>
                    <img
                      src="~/assets/images/state-arrow.svg"
                      class="state-arrow"
                    />

                    <div class="state-num" v-t="'1r-estat'">1r estat</div>
                    <h4
                      class="state-name"
                      v-t="'trauma'"
                      @mouseover="over('expo-3-content')"
                      @mouseout="out()"
                    >
                      Trauma
                    </h4>
                  </div>
                </b-col>
                <b-col md="3">
                  <div class="d-flex">
                    <div
                      class="dragons-list"
                      v-if="levelsDisplay && levelsDisplay.length"
                    >
                      <div
                        class="dragon-name dragon-name-1"
                        @mouseover="over('expo-1-desc')"
                        @mouseout="out()"
                      >
                        <Dragon color="#3B4174"></Dragon>
                        {{ levelsDisplay[0].name }}
                      </div>
                      <div
                        class="dragon-name dragon-name-2"
                        @mouseover="over('expo-2-desc')"
                        @mouseout="out()"
                      >
                        <Dragon color="#508DA8"></Dragon>
                        {{ levelsDisplay[1].name }}
                      </div>
                      <div
                        class="dragon-name dragon-name-3"
                        @mouseover="over('expo-3-desc')"
                        @mouseout="out()"
                      >
                        <Dragon color="#76B3A8"></Dragon>
                        {{ levelsDisplay[2].name }}
                      </div>
                      <img
                        src="~/assets/images/separator-hor.svg"
                        class="separator-hor"
                      />
                      <div
                        class="dragon-name dragon-name-4"
                        @mouseover="over('expo-4-desc')"
                        @mouseout="out()"
                      >
                        <Dragon color="#5F925F"></Dragon>
                        {{ levelsDisplay[3].name }}
                      </div>
                      <div
                        class="dragon-name dragon-name-5"
                        @mouseover="over('expo-5-desc')"
                        @mouseout="out()"
                      >
                        <Dragon color="#E1BB59"></Dragon>
                        {{ levelsDisplay[4].name }}
                      </div>
                      <div
                        class="dragon-name dragon-name-6"
                        @mouseover="over('expo-6-desc')"
                        @mouseout="out()"
                      >
                        <Dragon color="#DA8344"></Dragon>
                        {{ levelsDisplay[5].name }}
                      </div>
                      <img
                        src="~/assets/images/separator-hor.svg"
                        class="separator-hor"
                      />
                      <div
                        class="dragon-name dragon-name-7"
                        @mouseover="over('expo-7-desc')"
                        @mouseout="out()"
                      >
                        <Dragon color="#CE542E"></Dragon>
                        {{ levelsDisplay[6].name }}
                      </div>
                      <div
                        class="dragon-name dragon-name-8"
                        @mouseover="over('expo-8-desc')"
                        @mouseout="out()"
                      >
                        <Dragon color="#A71F1F"></Dragon>
                        {{ levelsDisplay[7].name }}
                      </div>
                    </div>
                  </div>
                </b-col>
                <b-col md="5" class="expo-content" :class="mouseOverClass">
                  <div
                    class="expo expo-1"
                    :inner-html.prop="$md.render($t('expo-1-content'))"
                  ></div>
                  <div
                    class="expo expo-2"
                    :inner-html.prop="$md.render($t('expo-2-content'))"
                  ></div>
                  <div
                    class="expo expo-3"
                    :inner-html.prop="$md.render($t('expo-3-content'))"
                  ></div>
                  <div
                    class="expo expo-1-desc"
                    :inner-html.prop="$md.render($t('expo-8-desc'))"
                  ></div>
                  <div
                    class="expo expo-2-desc"
                    :inner-html.prop="$md.render($t('expo-7-desc'))"
                  ></div>
                  <div
                    class="expo expo-3-desc"
                    :inner-html.prop="$md.render($t('expo-6-desc'))"
                  ></div>
                  <div
                    class="expo expo-4-desc"
                    :inner-html.prop="$md.render($t('expo-5-desc'))"
                  ></div>
                  <div
                    class="expo expo-5-desc"
                    :inner-html.prop="$md.render($t('expo-4-desc'))"
                  ></div>
                  <div
                    class="expo expo-6-desc"
                    :inner-html.prop="$md.render($t('expo-3-desc'))"
                  ></div>
                  <div
                    class="expo expo-7-desc"
                    :inner-html.prop="$md.render($t('expo-2-desc'))"
                  ></div>
                  <div
                    class="expo expo-8-desc"
                    :inner-html.prop="$md.render($t('expo-1-desc'))"
                  ></div>
                </b-col>
              </b-row>
            </b-container>
            <div class="next-container text-right">
              <button class="button button-4 mr-auto previous" @click="prev">
                <span v-t="'prev'" />
              </button>
              <button class="button button-4 ml-auto" @click="next">
                <span v-t="'next'" />
              </button>
            </div>
          </div>
        </div>
        <div
          class="section zfp-auto-height-responsive how-it-works mirades view-result aligned"
        >
          <div class="sismo-text bread-guide">
            <div v-t="'guia-d-us-del-sismograf'"></div>
            <div v-t="'tipus-de-patrons-1'"></div>
          </div>
          <div class="z">
            <b-container class="container-mt container-mb">
              <b-row>
                <b-col md="8" offset-md="2">
                  <div class="text-content">
                    <h3 class="mt-5 mb-5" v-t="'tipus-de-patrons-gripaus'"></h3>
                    <div
                      class="content"
                      :inner-html.prop="$md.render($t('gripaus-content'))"
                    ></div>
                  </div>
                </b-col>
                <b-col md="12">
                  <div class="mt-5">
                    <guide-wheel></guide-wheel>
                  </div>
                </b-col>
              </b-row>
            </b-container>
            <div class="next-container text-right">
              <button class="button button-4 mr-auto previous" @click="prev">
                <span v-t="'prev'" />
              </button>
              <button class="button button-4 ml-auto" @click="next">
                <span v-t="'next'" />
              </button>
            </div>
          </div>
        </div>
        <div
          class="section zfp-auto-height-responsive how-it-works view-result aligned"
        >
          <div class="sismo-text bread-guide">
            <div v-t="'guia-d-us-del-sismograf'"></div>
            <div v-t="'interpretacio-del-resultats-2'"></div>
          </div>
          <div class="z">
            <b-container class="container-mt">
              <b-row>
                <b-col md="8" offset-md="2">
                  <div class="text-content">
                    <h3
                      class="mt-5 mb-5"
                      v-t="'interpretacio-del-resultats-del-sismograf'"
                    ></h3>
                  </div>
                </b-col>
              </b-row>
            </b-container>

            <b-container fluid class="z">
              <b-row>
                <b-col md="9" offset-md="0">
                  <div class="mt-0">
                    <img
                      :src="`${apiBase}/api/analyses/wheel/questionnaire/?g1=17&description=true&locale=${$i18n.locale}`"
                      class="roda-img"
                    />
                  </div>
                </b-col>
                <b-col md="2">
                  <div class="mt-5">
                    <div class="dragons-list-cont">
                      <div
                        class="dragons-intro mb-5"
                        v-t="'llegenda-dels-paradigmes-dracs'"
                      ></div>
                      <dragons-list :levels="levels"></dragons-list>
                    </div>
                  </div>
                </b-col>
              </b-row>
            </b-container>
            <b-container class="container-mt-neg container-mb">
              <b-row>
                <b-col md="8" offset-md="2">
                  <div class="text-content">
                    <div
                      class="content"
                      :inner-html.prop="$md.render($t('interpretacio-content'))"
                    ></div>
                  </div>
                </b-col>
              </b-row>
            </b-container>
            <div class="next-container text-right">
              <button class="button button-4 mr-auto previous" @click="prev">
                <span v-t="'prev'" />
              </button>
            </div>
          </div>
        </div>
      </full-page>
    </no-ssr>
  </div>
</template>


<script>
import { mapGetters } from "vuex";
import _ from "lodash";
import GuideWheel from "../components/GuideWheel.vue";
import DragonsList from "../components/DragonsList.vue";

export default {
  layout: "full",
  components: { GuideWheel, DragonsList },
  data() {
    return {
      apiBase: process.env.apiBase,
      levels: [],
      mouseOverClass: "",
      options: {
        licenseKey: "7C5A62B9-9F4349E0-A45C66A1-437BB3A2",
        menu: "#menu",
        sectionsColor: "#FBF7EB",
        navigation: true,
        slidesNavigation: false,
        scrollOverflow: true,
        anchors: ["1", "2", "3", "4", "5"],
      },
    };
  },
  computed: {
    levelsDisplay() {
      return _.reverse(
        _.uniqWith(
          this.levels.map((l) => {
            return { name: l.attributes.name, code: l.attributes.code };
          }),
          _.isEqual
        )
      );
    },
  },
  async fetch() {
    var { data } = await this.$axios.get(
      `/resilience-levels?locale=${this.$i18n.locale}`,
      {}
    );
    this.levels = data.data;
  },
  fetchOnServer: true,
  mounted() {
    document.body.classList.add("bg-guide");
  },
  methods: {
    next: () => {
      var s = fullpage_api.getActiveSection();
      fullpage_api.moveTo(s.index + 2);
    },
    prev: () => {
      var s = fullpage_api.getActiveSection();
      console.log("x", s);
      fullpage_api.moveTo(s.index);
    },
    over(css) {
      this.mouseOverClass = "view-" + css;
    },
    out() {
      // this.mouseOverClass = ''
    },
  },
  nuxtI18n: {
    paths: {
      ca: "/guia",
      en: "/guide",
      es: "/guia",
    },
  },
};
</script>
<style lang="scss" scoped>
.fullpage-container-guide {
  font-weight: 300;
  font-size: 18px;
  line-height: 24px;
}
.sismo-title {
  margin-bottom: 1rem;
}
.sismo-subtitle {
  font-weight: 300;
  font-size: 40px;
  line-height: 45px;
  margin-bottom: 1rem;
}
.container-mt {
  margin-top: 10vh;
}
.container-mb {
  margin-bottom: 300px;
}
.container-mt-neg {
  margin-top: -150px;
}
.mt-10v {
  margin-top: 10vh;
}
.dragons-list {
  margin-top: 4rem !important;
  padding-left: 1rem;
}
.dragons-list-cont {
  margin-top: 12rem !important;
  padding-left: 1rem;
}
.separator-hor {
  margin-bottom: 1rem;
}
.expo-content {
  padding-top: 3rem;
}
.expo {
  padding-bottom: 2rem;
  display: none;
}
.expo:hover {
  opacity: 1;
}
.view-expo-1-content .expo-1 {
  display: block;
}
.view-expo-2-content .expo-2 {
  display: block;
}
.view-expo-3-content .expo-3 {
  display: block;
}
.view-expo-1-desc .expo-1-desc {
  display: block;
}
.view-expo-2-desc .expo-2-desc {
  display: block;
}
.view-expo-3-desc .expo-3-desc {
  display: block;
}
.view-expo-4-desc .expo-4-desc {
  display: block;
}
.view-expo-5-desc .expo-5-desc {
  display: block;
}
.view-expo-6-desc .expo-6-desc {
  display: block;
}
.view-expo-7-desc .expo-7-desc {
  display: block;
}
.view-expo-8-desc .expo-8-desc {
  display: block;
}
.state-name:hover {
  text-decoration: underline;
  cursor: help;
}
.dragon-name {
  padding-bottom: 1.2rem;
  font-weight: 400;
  font-size: 18px;
  line-height: 24px;

  svg {
    vertical-align: -6px;
    margin-right: 0.5rem;
  }
}
.dragon-name:hover {
  cursor: help;
}
.dragon-name-1:hover {
  color: #3b4174;
}
.dragon-name-2:hover {
  color: #508da8;
}
.dragon-name-3:hover {
  color: #76b3a8;
}
.dragon-name-4:hover {
  color: #5f925f;
}
.dragon-name-5:hover {
  color: #e1bb59;
}
.dragon-name-6:hover {
  color: #da8344;
}
.dragon-name-7:hover {
  color: #ce542e;
}
.dragon-name-8:hover {
  color: #a71f1f;
}
.roda-img {
  max-width: 100%;
  margin-top: -2rem;
}
.video-radius {
  border-radius: 15px;
}
.next-container {
  bottom: 200px;
  position: fixed;
}
.dragons-intro {
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;
  text-align: center;
  color: #e87a70;
}
.nav-guide {
  width: calc(100vw - 80px);
  background: #020034;
  height: 2px;
  position: absolute;
  right: 55px;
  left: 31px;
  top: calc(2rem - 2px);
  z-index: 10;
}
.bread-guide {
  position: absolute;
  top: 3rem;
  left: 31px;
  text-align: left;
}
</style>

  