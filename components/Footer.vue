<template>
  <div class="footer">
    <div class="bv-cont-row" v-if="footer">
      <b-row>
        <b-col>
          <div class="back">
            <nuxt-link :to="localePath('/')" class="back">
              <img src="~/assets/images/fletxa.svg" />
              <span v-t="'tornar'"></span>
            </nuxt-link>
          </div>
        </b-col>
        <b-col class="images text-right d-flex">
          <a
            v-if="
              footer.attributes.footer.logo1.data.attributes.url &&
              footer.attributes.footer.link1
            "
            :href="footer.attributes.footer.link1"
            target="_blank"
            class="ml-auto mr-xs-auto"
          >
            <img
              v-if="footer.attributes.footer.logo1.data.attributes.url"
              :src="
                apiBase + footer.attributes.footer.logo1.data.attributes.url
              "
            />
            <img v-else src="~/assets/images/resilience.svg" />
          </a>
          <img v-else src="~/assets/images/resilience.svg" />
          <a
            v-if="
              footer.attributes.footer.logo2.data.attributes.url &&
              footer.attributes.footer.link2
            "
            :href="footer.attributes.footer.link2"
            target="_blank"
            class="zml-auto mr-xs-auto"
          >
            <img
              v-if="footer.attributes.footer.logo2.data.attributes.url"
              :src="
                apiBase + footer.attributes.footer.logo2.data.attributes.url
              "
            />
            <img v-else src="~/assets/images/balkar.svg" />
          </a>
          <img v-else src="~/assets/images/balkar.svg" />
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
  async fetch() {
    var { data } = await this.$axios.get(
      `/applications?slug=${process.env.application}&populate=footer&populate=footer.logo1&populate=footer.logo2`,
      {}
    );
    this.$store.commit("app/set", data.data[0]);
    this.footer = data.data[0];
  },
  fetchOnServer: true,
};
</script>
<style scoped>
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
  margin-top: 43px;
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
@media (max-width: 1024px) {

  .footer {
    height: 10vh;
  }
  .back {
    margin-top: 10px;
    display: none;
  }
  .images img{
    max-width: 25vw;
    margin-left: 10vw;
  }
  .mr-xs-auto{
    margin-right: auto;
  }
}
@media (min-width: 1025px) and (max-width: 1919px) {
  .footer {
    height: 5.27vw;
  }
  .back {
    margin-top: 2.22166666666667vw;
  }
  .images img {
    height: 3.10333333333333vw;
  }
}
</style>