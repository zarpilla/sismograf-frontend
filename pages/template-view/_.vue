<template>
  <div class="section how-it-works section-your-results">
    <b-container fluid>
      <div class="your-results" v-t="'els-vostres-resultats'">
        Els vostres resultats
      </div>
      <summary-wheel
        id="summary-wheel-1"
        element-id="svg-3"
        class="mb-5"
        v-if="pivotData.length"
        :analysis="analysis && analysis.length ? analysis[0] : null"
        :levels="resilienceLevels"
        :comparer="comparer"
        :pivotData="pivotData"
        :group="'ruid'"
        :gid="uid"
      ></summary-wheel>

      <div class="next-container text-center">
        <button
          class="button button-1 mr-auto icon-down"
          @click="downloadImage('summary-wheel-1')"
        >
          <span v-t="'descarregar-1'" />
        </button>
        <nuxt-link class="button button-1 ml-auto" :to="localePath({ name: 'guide', query: { results: true }})" v-t="'com-interpretar-els-resultats'">
        </nuxt-link>
        <!-- <button class="button button-1 ml-auto">
            <span v-t="'com-interpretar-els-resultats'" />
          </button> -->
      </div>
    </b-container>
  </div>
</template>

<script>
import _ from "lodash";
import * as htmlToImage from "html-to-image";
import download from "downloadjs";

export default {
  data() {
    return {
      template: {},
      slug: "",
      pivotData: [],
      resilienceLevels: [],
      analysis: null,
      comparer: {
        group1: "rslug",
        identifier1: 0,
        title1: "",
        group2: "none",
        identifier2: 0,
        title2: "",
      },
      uid: null,
    };
  },
  computed: {},
  async asyncData({ $axios, app, error, store }) {
    const headers = {
      headers: {
        Authorization: `Bearer ${process.env.apiToken}`,
      },
    };

    var { data } = await $axios.get(
      `/analyses/compare/ruid/none/?g1=${app.context.route.params.uid}&g2=0`,
      headers
    );

    let pivotData = [];
    const analysis = [];
    data.g1.analyses.forEach((a) => {
      analysis.push(a);
      a.results = a.results.map(
        ({
          id,
          value,
          // domainId,
          templateId,
          questionnaireId,
          principleId,
          patternId,
          indicatorId,
          ...item
        }) => item
      );
      a.results.forEach((r) => {
        r.locale = app.i18n.locale;
        pivotData.push(r);
      });
    });

    var { data } = await $axios.get(
      `/resilience-levels?locale=${app.i18n.locale}`,
      headers
    );
    const resilienceLevels = data.data;

    const uid = app.context.route.params.uid;
    return { pivotData, resilienceLevels, analysis, uid };
  },
  mounted() {},
  methods: {
    downloadImage(id) {
      const name = this.$i18n.t("sismograf-file") + "-" + this.uid + ".png";
      const svgUrl = document.getElementById("svg-3").src;
      this.toDataUrl(svgUrl, (base64) => {
        const imageUrl = base64;
        document.getElementById("svg-3").src = imageUrl;

        htmlToImage.toPng(document.getElementById(id)).then(function (dataUrl) {
          //console.log( dataUrl)
          download(dataUrl, name);

          document.getElementById("svg-3").src = svgUrl;
        });
      });
    },
    toDataUrl(url, callback) {
      var xhr = new XMLHttpRequest();
      xhr.onload = function () {
        var reader = new FileReader();
        reader.onloadend = function () {
          callback(reader.result);
        };
        reader.readAsDataURL(xhr.response);
      };
      xhr.open("GET", url);
      xhr.responseType = "blob";
      xhr.send();
    },
  },
  filters: {
    float1(amount) {
      const amt = Number(amount);
      return (
        (amt && amt.toLocaleString(undefined, { maximumFractionDigits: 1 })) ||
        "0"
      );
    },
  },
  nuxtI18n: {
    paths: {
      ca: "/sismograf/resultats/:template/:q/:uid",
      en: "/seismograph/results/:template/:q/:uid",
      es: "/sismografo/resultados/:template/:q/:uid",
    },
  },
};
</script>
<style scoped>
.your-results {
  font-weight: 900;
  font-size: 15px;
  line-height: 19px;
  letter-spacing: 2px;
  text-transform: uppercase;
  padding-top: 3rem;
}
</style>
