<template>
  <div class="chart-detail">
    <section v-if="summary && summary.length">
      <div class="sismograf-detail text-left">        
        <div v-for="(result, i) in analysis.results" :key="i" class="mb-3">
          <div class="indicator-name bold">
            {{ result.indicatorName }}  
          </div>
          <div class="indicator-value">
            {{ result.responseValue }} ({{ ( result.resilienceLevel * 14.29 - 14.29).toFixed(0)}}%)
          </div>
          <div class="indicator-comments mb-2" v-if="result.comments">
            <b v-t="'Comments:'"></b> {{ result.comments }}
          </div>
        </div>
        <!-- <summary-chart
            id="summary-chart-detail"
            v-if="summary.length"
            class="mb-5"
            :title="'ccc'"
            :levels="levels"
            :pivotData="summary"
          ></summary-chart> -->

      </div>
    </section>
    
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import moment from "moment";
import SummaryChart from "./SummaryChart";
import _ from "lodash";

export default {
  name: "SummaryChart",
  components: {SummaryChart},
  data() {
    return {};
  },
  props: {
    analysis: {
      type: Object,
      default: {},
    },
    levels: {
      type: Object,
      default: [],
    },
    summary: {
      type: Array,
      default: [],
    },
    title: {
      type: String,
      default: '',
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
    }    
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
.indicator-name{
  font-weight: bold;
}
.indicator-value{

}
</style>