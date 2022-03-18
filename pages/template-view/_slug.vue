<template>
<div>
        <div class="section">
          <div class="title">Dominios</div>        
          <pre>{{summary}}</pre>
          <div class="zrow">
            <CBarDomains
              :data="summary"
              :template="template"
              :mobile="mobile || tablet"
              class="zcolumn"
            ></CBarDomains>
          </div>
        </div>

        <div class="section">
          <div class="title">Principios</div>
          <div class="zrow">
            <CBar
              :data="summary"
              :mobile="mobile || tablet"
              :template="template"
              class="zcolumn"
            ></CBar>
          </div>
        </div>
        </div>


        <!-- 

      <div class="section" v-if="!mobile && !tablet">
        <div class="title total">
          {{ total | float1 }} / {{ maxval }}
          <font-awesome-icon
            v-if="totaldev > 2 || totaldevg2 > 0.9 || warntotaldevg"
            :icon="fas.faExclamationCircle"
            class="warning text-warning"
          />
        </div>
        <div class="text-center text-analysis">
          <div v-if="totaldev > 2" v-t="'Desequilibri entre àmbits'"></div>
          <div
            v-if="totaldevg2 > 0.9"
            v-t="'Desequilibri dins dels àmbits'"
          ></div>
          <div
            v-else-if="warntotaldevg"
            v-t="'Desequilibri dins dels àmbits.'"
          ></div>
        </div>

        <div class="zrow">
          <CLine
            :data="template.scopes"
            :mobile="mobile || tablet"
            class="zcolumn"
          ></CLine>
        </div>

        <div class="row">
          <div
            v-for="(scope, i) in template.scopes"
            v-bind:key="scope.id"
            class="col-md-3 text-center mt-5"
          >
            <div class="scope-title">
              {{ scope.text }}
            </div>
            <h3 class="scope-title text-white">
              {{ scopeMeans[i] | float1 }} / 8
            </h3>
            <radar :data="scope" />
          </div>
        </div>
        <div class="next-container text-center">
          <button class="btn btn-sismograf btn-next" @click="next">
            <span v-t="'Continuar'" />
            <font-awesome-icon :icon="fas.faLongArrowAltRight" />
          </button>
        </div>
      </div>

      <div class="section" v-if="mobile || tablet">
        <div class="title total">
          TOTAL
          <br />
          {{ total | float1 }} / {{ maxval }}
        </div>
        <CLine
          :data="template.scopes"
          :mobile="mobile || tablet"
          class="column"
        ></CLine>
      </div>
      <template v-if="mobile || tablet">
        <div
          class="section"
          v-for="(scope, i) in template.scopes"
          v-bind:key="i"
        >
          <radar :data="scope" :mobile="mobile || tablet" />
        </div>
      </template>
 -->
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
  layout: "full",
  head() {
    return {
      title: `${this.title}`,
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: "description",
          name: "description",
          content: this.description,
        },
        {
          hid: "og:title",
          name: "og:title",
          content: this.title,
        },
        {
          hid: "og:description",
          name: "og:description",
          content: this.description,
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
      mobile: false,
      tablet: false,
      show: false,
      //results: [],
      analysis: {
        id: 0,
        email: "",
        // organization: "",
        // project: "",
        // region: "",
        // scope: "",
        language: "",
        results: [],
        comments: [],
        labels: [],
        template: 0,
        uid: null,
        publishedAt: null,
        parent: null,
      },
      commentIndicator: null,
      comment: "",
      progressDomain: 0,
      progressPrinciple: 0,
    };
  },
  computed: {
    title() {
      return this.template.attributes.name;
    },
    description() {
      return this.template.attributes.description;
    },
    // sectionsColorMore () {
    //   return this.sectionsColor.concat(this.sectionsColor).concat(this.sectionsColor).concat(this.sectionsColor).concat(this.sectionsColor).concat(this.sectionsColor)
    // },
    summary() {
      const summary = [];
      this.template.attributes.domains.forEach((domain) => {
        const domainSummary = {
          type: "domain",
          id: domain.id,
          name: domain.description,
          principles: [],
        };
        domain.principles.forEach((principle) => {
          const principleSummary = {
            type: "principle",
            /*domainId: domain.id, domainName: domain.name,*/ id: principle.id,
            name: principle.name,
            patterns: [],
          };
          principle.patterns.forEach((pattern) => {
            const patternSummary = {
              /*domainId: domain.id, domainName: domain.name, principleId: principle.id, principleName: principle.name,*/ type: "pattern",
              patternId: pattern.id,
              patternName: pattern.name,
            };
            pattern.indicators.forEach((indicator) => {
              const patternIndicators = this.analysis.results.filter(
                (r) => r.indicator === indicator.id
              );
              if (patternIndicators.length) {
                patternSummary.value = _.meanBy(
                  patternIndicators.filter(i => i.value > 0),
                  (p) => p.value
                );
              } else {
                patternSummary.value = null;
              }
            });
            principleSummary.patterns.push(patternSummary);
            principleSummary.value = _.meanBy(
              principleSummary.patterns.filter(i => i.value > 0),
              (p) => p.value
            );
          });
          domainSummary.principles.push(principleSummary);
          domainSummary.value = _.meanBy(
            domainSummary.principles.filter(i => i.value > 0),
            (p) => p.value
          );
        });
        summary.push(domainSummary);
      });
      return summary;
    },
    total: function () {
      let avg = 0;
      let count = 0;
      this.template.scopes.forEach((s) => {
        s.capacities.forEach((c) => {
          if (c.result) {
            avg = avg + c.result;
            count++;
          }
        });
      });
      return avg / count;
    },
    maxval: function () {
      let max = 0;
      this.template.scopes.forEach((s) => {
        s.capacities.forEach((c) => {
          c.indicators.forEach((i) => {
            if (i.value && max < i.value) {
              max = i.value;
            }
          });
        });
      });
      return max;
    },
    total2: function () {
      let avg = 0;
      let count = 0;
      this.template.scopes.forEach((s) => {
        let avg2 = 0;
        let count2 = 0;
        s.capacities.forEach((c) => {
          if (c.result) {
            avg2 = avg2 + c.result;
            count2++;
          }
        });
        avg = avg + avg2 / count2;
        count++;
      });
      return avg / count;
    },
    totaldev: function () {
      let array = [];
      this.template.scopes.forEach((s) => {
        s.capacities.forEach((c) => {
          if (c.result) {
            array.push(c.result);
          }
        });
      });
      return this.stddev(array);
    },
    totaldevg: function () {
      let devg = [];
      for (let s in this.template.scopes) {
        let array = [];
        let scope = this.template.scopes[s];
        for (let c in scope.capacities) {
          let capacity = scope.capacities[c];
          if (capacity.result) {
            array.push(capacity.result);
          }
        }
        devg.push(this.stddev(array));
      }
      return devg;
    },
    warntotaldevg: function () {
      return this.totaldevg.filter((t) => t > 2).length > 0;
    },
    totaldevg2: function () {
      return this.stddev(this.totaldevg);
    },
    scopeMeans: function () {
      let means = [];
      for (let s in this.template.scopes) {
        let array = [];
        let scope = this.template.scopes[s];
        for (let c in scope.capacities) {
          let capacity = scope.capacities[c];
          if (capacity.result) {
            array.push(capacity.result);
          }
        }
        means.push(this.$mean(array));
      }
      return means;
    },
    validEmail() {
      return !this.analysis.email || this.validateEmail(this.analysis.email);
    },
    validForm() {
      return this.validEmail;
    },
    fas() {
      return fas;
    },
  },
  async asyncData({ $axios, app, error, store }) {
    let slug = app.context.route.params.slug;    
    
    const headers = {
      headers: {
        Authorization: `Bearer ${process.env.API_TOKEN}`,
      },
    };
    // console.log('context i18n', app.i18n)
    var { data } = await $axios.get(
      `/templates?filters[slug][$eq]=${slug}&locale=${app.i18n.locale}`,
      headers
    );
    // console.log('templateData',data, slug)
    if (!data || data.data.length == 0) {
      error({ statusCode: 404, message: "Page not found" });
      return
    }
    else if (data.data && data.data.length === 0) {
      error({ statusCode: 404, message: "Page not found" });
      return
    }

    const tid = data.data[0].id

    var { data } = await $axios.get(
      `/templates/indicators/${tid}?locale=${app.i18n.locale}`,
      headers
    );

    let template = data.data;
    let analysis = {
      id: 0,
      email: "",
      organization: "",
      project: "",
      region: "",
      scope: "",
      language: "",
      results: [],
      comments: [],
      labels: [],
      template: template.id,
      uid: null,
      name: "",
      parent: null,
    };
    if (app.context.route.query && app.context.route.query.r) {
      var { data } = await $axios.get(
        `/analyses/?filters[uid][$eq]=${app.context.route.query.r}&populate=labels&locale=${app.i18n.locale}`,
        headers
      );
      if (data && data.data && data.data.length > 0) {
        analysis.id = data.data[0].id;

        var { data } = await $axios.get(
          `/analyses/${analysis.id}?populate[0]=*&populate[1]=comments&populate[2]=results&populate[3]=comments.indicator&populate[4]=results.indicator&populate[5]=labels&locale=${app.i18n.locale}`,
          headers
        );

        analysis.email = data.data.attributes.email;
        // analysis.organization = data.data.attributes.organization;
        // analysis.project = data.data.attributes.project;
        // analysis.region = data.data.attributes.region;
        // analysis.scope = data.data.attributes.scope;
        analysis.uid = data.data.attributes.uid;
        analysis.parent = data.data.attributes.parent;
        analysis.labels = data.data.attributes.labels.data;

        data.data.attributes.results.forEach((r) => {
          if (r.indicator && r.indicator.data && r.indicator.data.id) {
            const id = r.indicator.data.id;
            delete r.indicator;
            delete r.id;
            r.indicator = id;
          }
        });
        analysis.results = data.data.attributes.results;
        data.data.attributes.comments.forEach((r) => {
          if (r.indicator && r.indicator.data && r.indicator.data.id) {
            const id = r.indicator.data.id;
            delete r.indicator;
            delete r.id;
            r.indicator = id;
          }
        });
        analysis.comments = data.data.attributes.comments;
      }
    }
    return {
      slug: slug,
      template,
      analysis,
    };
  },
  mounted() {
  },
  methods: {
    next: () => {
      var s = fullpage_api.getActiveSection();
      fullpage_api.moveTo(s.index + 2);
    },
    isOptionActive(indicator, option) {
      return this.analysis.results.find(
        (r) => r.indicator === indicator.id && r.value === option.value
      );
    },
    isLabelActive(label) {
      return this.analysis.labels.find((r) => r.id === label.id);
    },
    isCommentActive(indicator) {
      return this.analysis.comments.find(
        (r) => r.indicator === indicator.id && r.comment !== ""
      );
    },
    punctuation(indicator, option) {
      const same = this.analysis.results.find(
        (r) => r.indicator === indicator.id && r.value === option.value
      );
      if (same) {
        this.analysis.results = this.analysis.results.filter(
          (r) =>
            r.indicator !== indicator.id ||
            (r.indicator === indicator.id && r.value !== option.value)
        );
        return;
      }
      const numOfValues = this.analysis.results.filter(
        (r) => r.indicator === indicator.id
      );
      if (numOfValues.length >= indicator.max) {
        const indicatorResults = this.analysis.results
          .filter((r) => r.indicator === indicator.id)
          .filter((r, i) => i > 0);
        this.analysis.results = this.analysis.results.filter(
          (r) => r.indicator !== indicator.id
        );
        indicatorResults.forEach((r) => {
          this.analysis.results.push(r);
        });
      }
      this.analysis.results.push({
        indicator: indicator.id,
        value: option.value,
      });
      if (numOfValues.length + 1 >= indicator.max) {
        var s = fullpage_api.getActiveSection();
        fullpage_api.moveTo(s.index + 2);
      }
    },
    addLabel(label) {
      const previous = this.analysis.labels.find((l) => l === label.id);
      if (previous) {
        this.analysis.labels = this.analysis.labels.filter(
          (l) => l !== label.id
        );
      } else {
        this.analysis.labels.push(label.id);
      }
      if (
        this.template.attributes.labels.data.length ===
        this.analysis.labels.length
      ) {
        var s = fullpage_api.getActiveSection();
        fullpage_api.moveTo(s.index + 2);
      }
    },
    showModal(indicator) {
      this.comment = "";
      const previous = this.analysis.comments.find(
        (c) => c.indicator === indicator.id
      );
      if (previous) {
        this.comment = previous.comment;
      }
      this.commentIndicator = indicator;
      this.$refs["my-modal"].show();
    },
    hideModal() {
      const indicator = this.commentIndicator;
      const previous = this.analysis.comments.find(
        (c) => c.indicator === indicator.id
      );
      if (previous) {
        previous.comment = this.comment;
      } else {
        this.analysis.comments.push({
          indicator: this.commentIndicator.id,
          comment: this.comment,
        });
      }
      this.$refs["my-modal"].hide();
    },
    cancelModal() {
      this.$refs["my-modal"].hide();
    },
    stddev(array) {
      if (!array.length) return null;
      const n = array.length;
      const mean = array.reduce((a, b) => a + b) / n;
      return Math.sqrt(
        array.map((x) => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n
      );
    },
    validateEmail(email) {
      const re =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
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
.progress-div-container{
  position: absolute;
  top: 1rem;
  right: 1vw;
}
.progress-div{
  position: relative;
  color: #fff;
  width: 100px;
  text-align: center;  
}
.progress-legend{
  position: absolute;
  top:60px;
  width: 100px;
  text-align: center;
  font-weight: bold;
}
.principle-title{
  color: #fff;
  font-weight: bold;
}
</style>
<style>
#fp-nav ul li a span,
.fp-slidesNav ul li a span {
  background: #fff;
}
</style>