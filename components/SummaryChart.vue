<template>
  <div class="chart-summary">
    <section slot="pdf-content">
      <div class="sismograf-report" id="sismograf-report">
        <h4>{{ comparer.title1 }}</h4>
        <div class="d-block zmb-2">
          <resilience-progress
            name="Global"
            :value="chartSummary.resilienceLevel"
            :levels="levels"
          />
        </div>
        <div
          class="d-block zmb-2 ml-5"
          v-for="(domain, i) in chartSummary.domains"
          :key="i"
        >
          <hr />
          <resilience-progress
            class="mb-2"
            :name="
              domain.domainDescription
                ? domain.domainDescription
                : domain.domainName
            "
            :value="domain.resilienceLevel"
            :levels="levels"
          />

          <div
            class="d-block mb-2 ml-5"
            v-for="(principle, j) in domain.principles"
            :key="j"
          >
            <resilience-progress
              :name="principle.principleName"
              :value="principle.resilienceLevel"
              :levels="levels"
            />
          </div>
        </div>
      </div>
    </section>
    <!-- 
    <button class="btn btn-primary mt-5" @click="getPDF">PDF</button> -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import moment from "moment";
import ResilienceProgress from "./ResilienceProgress";
// import VueHtml2pdf from 'vue-html2pdf'
import _ from "lodash";

export default {
  name: "SummaryChart",
  data() {
    return {};
  },
  props: {
    pivotData: {
      type: Array,
      default: [],
    },
    levels: {
      type: Array,
      default: [],
    },
    comparer: {
      type: Object,
      default: {},
    },
  },
  computed: {
    ...mapGetters(["isAuthenticated", "loggedInUser"]),
    chartSummary() {
      const summaryByDomain = _(this.pivotData)
        .groupBy("domainDescription")
        .map((domainRows, id) => ({
          domainDescription: id,
          resilienceLevel: _.meanBy(domainRows, "resilienceLevel"),
          principles: _(domainRows)
            .groupBy("principleName")
            .map((principleRows, id) => ({
              principleName: id,
              resilienceLevel: _.meanBy(principleRows, "resilienceLevel"),
              patterns: _(principleRows)
                .groupBy("patternName")
                .map((patternsRows, id) => ({
                  patternName: id,
                  resilienceLevel: _.meanBy(patternsRows, "resilienceLevel"),
                })),
            }))
            .value(),
        }))
        .value();
      return {
        resilienceLevel: _.meanBy(summaryByDomain, "resilienceLevel"),
        domains: summaryByDomain,
      };
    },
    title() {
      if (this.comparer && this.comparer.group1 === "organization") {
        return;
      }
    },
  },
  async mounted() {
    // await this.addScript("/vendor/html2pdf/html2pdf.bundle.min.js", "html2pdf-js");
  },
  methods: {
    async addScript(src, id) {
      return new Promise((resolve, reject) => {
        if (document.getElementById(id)) {
          resolve();
        }
        const head = document.head || document.getElementsByTagName("head")[0];
        const script = document.createElement("script");
        script.src = src;
        script.id = id;
        script.addEventListener("load", resolve);
        script.addEventListener("error", (e) => reject(e));
        script.addEventListener("abort", (e) => reject(e));
        head.appendChild(script);
      });
    },
    getPDF() {
      // this.$refs.html2Pdf.generatePdf()
      // var element = document.getElementById("sismograf-report");
      // var opt = {
      //   margin: [0, 0],
      //   filename: `sismograf-${this.title}`,
      //   image: { type: "jpeg", quality: 1 },
      //   html2canvas: { dpi: 300, scale: 4, letterRendering: true },
      //   jsPDF: { unit: "in", format: "letter", orientation: "landscape" },
      // };
      // // console.log('element', element)
      // html2pdf().set(opt).from(element).save();
      // html2pdf().from(element).save();
    },
  },
};
</script>
<style scoped>
.progress-bar {
  border-radius: 4px;
  color: #222;
  font-size: 14px;
}
.clickable {
  cursor: pointer;
}
.chart-summary {
  width: 100%;
}
</style>