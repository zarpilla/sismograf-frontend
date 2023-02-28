<template>
  <div class="footer" :class="`layout-${layout ? layout : 'default'}`">
    <div class="bv-cont-row" v-if="footer">
      <b-row>
        <b-col>
          <div class="back d-none d-md-flex" v-if="layout !== 'full'">
            <nuxt-link :to="localePath('index')" class="d-none d-md-flex">
            <img
              class="d-none d-md-block"
              src="~/assets/images/punts.svg"
            />
            <span
              class="copy-1"
              v-html="$t('el-sismograf')"
            ></span>
            <span class="copy-2" v-html="$t('copy-footer')"></span>
          </nuxt-link>
          </div>
          <div class="back d-none d-md-flex" v-if="layout === 'full'">
            <img
              class="d-none d-md-block"
              src="~/assets/images/punts.svg"
              @click="goInit"
            />
            <span
              class="copy-1"
              v-html="$t('el-sismograf')"
              @click="goInit"
            ></span>
            <span class="copy-2" @click="goInit" v-html="$t('copy-footer')"></span>
          </div>          
          <div class="back d-flex d-md-none">
            <span class="copy-3" v-html="$t('el-sismograf')"></span>
          </div>
        </b-col>
        <b-col class="images text-right d-flex">
          <a
            v-if="
              footer.attributes.footer.logo1 &&
              footer.attributes.footer.logo1.data &&
              footer.attributes.footer.logo1.data.attributes.url &&
              footer.attributes.footer.link1
            "
            :href="footer.attributes.footer.link1"
            target="_blank"
            class="ml-auto mr-xs-auto"
          >
            <img
              :src="
                apiBase + footer.attributes.footer.logo1.data.attributes.url
              "
            />
          </a>
          <a
            v-if="
              footer.attributes.footer.logo2 &&
              footer.attributes.footer.logo2.data &&
              footer.attributes.footer.logo2.data.attributes.url &&
              footer.attributes.footer.link2
            "
            :href="footer.attributes.footer.link2"
            target="_blank"
            class="zml-auto mr-xs-auto"
          >
            <img
              :src="
                apiBase + footer.attributes.footer.logo2.data.attributes.url
              "
            />
          </a>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {
      footer: null,
      apiBase: process.env.apiBase,
    };
  },
  props: {
    layout: "",
  },
  async fetch() {
    var { data } = await this.$axios.get(
      `/applications?filters[slug][$eq]=${process.env.application}-${this.$i18n.locale}&populate=footer&populate=footer.logo1&populate=footer.logo2&locale=${this.$i18n.locale}&populate=guide_template`,
      {}
    );
    this.$store.commit("app/set", data.data[0]);
    console.log("store commit footer");
    this.footer = data.data[0];
  },
  fetchOnServer: true,
  methods: {
    goInit() {
      this.$nuxt.$emit("go-to-init");
    },
  },
};
</script>
<style scoped lang="scss">
.footer {
  background: #f3c857;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 102px;
}
.bv-cont-row {
  padding: 0 3rem;
}
.back {
  font-weight: 900;
  font-size: 15px;
  line-height: 19px;
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-top: 26px;

  a {
    text-decoration: none;
    color: #020034
  }

  .copy-1 {
    font-weight: 700;
    font-size: 30px;
    line-height: 49px;
    text-transform: none;
    display: inline-block;
    padding-right: 14px;
    border-right: 1px solid #020034;
  }
  .copy-2 {
    padding-left: 14px;
    padding-top: 8px;
    font-weight: 500;
    font-size: 15px;
    line-height: 19px;
    letter-spacing: 2px;
    text-transform: uppercase;
  }
}
.back img {
  vertical-align: -3px;
  margin-right: 10px;
}
.images {
  margin-top: 15px;
}
.images img {
  margin-left: 2rem;
}
.back {
  color: #020034;
  text-decoration: none;
}

.footer.layout-full {
  .back {
    cursor: pointer;
  }
}
@media (max-width: 1024px) {
  .footer.layout-home {
    height: 100px;
  }
  .footer:not(.layout-home) {
    height: 34px;
  }
  .back {
    margin-top: 10px;
    text-align: center;
  }
  .images {
    margin-top: 0.5rem;
  }
  .images img {
    max-width: 80px;
    margin-left: 30px;
  }
  .mr-xs-auto {
    margin-right: auto;
  }
  .back {
    .copy-1 {
      font-size: 18px;
      line-height: 20px;
      text-align: left;
      padding-top: 12px;
    }
    .copy-2 {
      font-size: 14px;
      text-align: left;
      padding-top: 4px;
    }

    .copy-3 {
      font-size: 14px;
      text-align: left;
      text-align: center;
      display: inline-block;
      width: 100%;
    }
  }
}
// @media (min-width: 1025px) and (max-width: 1900px) {
//   .footer {
//     height: 5.27vw;
//   }
//   .back {
//     margin-top: 1.0166666666667vw;
//   }
//   .images img {
//     height: 3.10333333333333vw;
//   }
// }
</style>