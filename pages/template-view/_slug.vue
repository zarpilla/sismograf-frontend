<template>
  <div class="container pt-5">
    <div class="alert-container mt-3 mb-5">
      <div class="alert alert-white" v-t="'Successfully saved'"></div>
    </div>

    <h2 v-if="pivotData.length" v-t="'Results'" class="mt-5 pt-5">Results</h2>
    <div class="mb-5">
      <summary-chart
        class="mb-5"
        v-if="pivotData.length"
        :levels="resilienceLevels"
        :comparer="comparer"
        :pivotData="pivotData"
      ></summary-chart>
    </div>
  </div>
</template>

<script>
import Radar from "~/components/Radar";
import CLine from "~/components/CLine";
import CBar from "~/components/CBar";
import CBarDomains from "~/components/CBarDomains";
import FadeTransition from "~/components/FadeTransition";

import { fas } from "@fortawesome/free-solid-svg-icons";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";

export default {
  head() {
    return {
      title: `SISMÒGRAF`,
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: "description",
          name: "description",
          content: "",
        },
        {
          hid: "og:title",
          name: "og:title",
          content: "SISMÒGRAF",
        },
        {
          hid: "og:description",
          name: "og:description",
          content: "",
        },
        {
          hid: "og:image",
          name: "og:image",
          content: require("~/assets/resilience_earth.svg"),
        },
      ],
    };
  },
  data() {
    return {
      template: {},
      slug: "",
      pivotData: [],
      resilienceLevels: { ca: [], en: [], es: [] },
      comparer: {
        group1: "rslug",
        identifier1: 0,
        title1: "",
        group2: "none",
        identifier2: 0,
        title2: "",
      },
    };
  },
  computed: {
  },
  async asyncData({ $axios, app, error, store }) {
    let slug = app.context.route.params.slug;

    const headers = {
      headers: {
        Authorization: `Bearer ${process.env.apiToken}`,
      },
    };

    var { data } = await $axios.get(
      `/analyses/compare/ruid/none/?g1=${app.context.route.query.r}&g2=0`,
      headers
    );

    let pivotData = [];
    data.g1.analyses.forEach((a) => {
      a.results = a.results.map(
        ({
          id,
          value,
          domainId,
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

    const resilienceLevels = { ca: [], en: [], es: [] };
    for (let i = 0; i < app.i18n.locales.length; i++) {
      const loc = app.i18n.locales[i];
      var { data } = await $axios.get(
        `/resilience-levels?locale=${loc}`,
        headers
      );
      resilienceLevels[loc] = data.data;
    }

    return { pivotData, resilienceLevels };
  },
  mounted() {},
  methods: {},
  filters: {
    float1(amount) {
      const amt = Number(amount);
      return (
        (amt && amt.toLocaleString(undefined, { maximumFractionDigits: 1 })) ||
        "0"
      );
    },
  },
};
</script>
<style scoped>
.section {
  padding: 0 6vw;
}

.title {
  text-align: center;
  font-size: 80px;
  font-weight: bold;
  color: #fff;
}
.description {
  color: #fff;
  font-size: 20px;
}

.section-bg-dark .title,
.section-bg-dark .description,
.section-bg-dark p {
  color: #eee;
}
.scope {
  text-align: center;
  font-size: 60px;
  color: #fff;
}
.question {
  text-align: center;
  font-size: 40px;
  color: #fff;
}
.sector {
  font-size: 30px;
  color: #fff;
  margin: 30px auto;
}
.btn-sismograf {
  border: 0;
  background: rgb(85, 175, 184);
  color: #fff;

  background: #fff;
  color: #333;
  border-radius: 6px;
  padding: 10px 20px;
  font-size: 16px;
  margin-bottom: 15px;
  cursor: pointer;
  /* text-transform: capitalize; */
}
.btn-next {
  background: #fff;
  color: #1f1f1f;
  margin-top: 2rem;
}
ul.capacities-list {
  list-style-type: none;
  padding: 0;
  text-align: center;
  margin-top: 2rem;
}
ul.labels-list {
  margin-top: 1rem;
  margin-bottom: 0rem;
}
ul.label-categories-list > li {
  display: block !important;
}
ul.capacities-list > li {
  display: inline-block;
  margin: 0 10px;
}
ul.capacities-list li .active {
  background: hsl(48, 100%, 67%);
  color: #333;
}
.scope-title {
  font-size: 20px;
  color: #fff;
}
.label {
  color: #fff;
  padding-right: 6px;
  display: block;
}
.text-analysis {
  color: #fff;
  position: relative;
}
.warning {
  font-size: 50px !important;
  left: -30px;
}
.alert-container {
  position: relative;
}
.alert-white {
  background: #fff;
  color: #1f1f1f;
  position: absolute;
  width: 100%;
}
.text-white {
  color: #fff !important;
}
.breadcrumb {
  position: absolute;
  bottom: 0px;
  width: calc(100% - 10vw);
  background: transparent;
}
.breadcrumb a {
  color: #fff;
}
.breadcrumb span {
  color: #fff;
  padding: 0 0.5rem;
}
.multiple,
.label-category {
  color: #fff;
}
textarea.comment {
  height: 350px;
  background: #eee;
  border: 1px solid #ddd;
}
.btn-secondary:not(:disabled):not(.disabled).active {
  background: hsl(48, 100%, 67%);
  border-color: hsl(48, 100%, 67%);
  color: #333;
}
.index {
  list-style: none;
  padding: 0;
}
.index .index-item {
  padding-bottom: 0.5rem;
}
.index .index-item a {
  color: #fff;
  font-size: 28px;
}
.index .index-item a.domain {
  color: #fff;
  font-size: 38px;
}
.index .index-item a:hover {
  text-decoration: underline;
}
.progress-div-container {
  position: absolute;
  top: 1rem;
  right: 1vw;
}
.progress-div {
  position: relative;
  color: #fff;
  width: 100px;
  text-align: center;
}
.progress-legend {
  position: absolute;
  top: 60px;
  width: 100px;
  text-align: center;
  font-weight: bold;
}
.principle-title {
  color: #fff;
  font-weight: bold;
}
</style>
