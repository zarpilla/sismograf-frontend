<template>
  <div class="chart-summary">
    <section>
      <div class="sismograf-report">
        <div class="analysis-detail" v-if="analysis">
          <h4>{{ title }}</h4>
          <div class="analysis-info" v-if="analysis.organization">
            <label class="bold" v-t="'Organization:'"></label>
            {{ analysis.organization }}
          </div>
          <div class="analysis-info" v-if="analysis.project">
            <label class="bold">Project:</label>
            {{ analysis.project }} lalala
          </div>
          <div class="analysis-info" v-if="analysis.region">
            <label class="bold">Region:</label>
            {{ analysis.region }}
          </div>
          <div class="analysis-info" v-if="analysis.scope">
            <label class="bold">Scope:</label>
            {{ analysis.scope }}
          </div>
          <div class="analysis-info">
            <label class="bold" v-t="'Date:'"></label>
            {{ analysis.createdAt | toDate }}
          </div>
        </div>
        <div class="zz" v-else>
          <h4>{{ title }}</h4>
        </div>

        <div class="d-block global-progress mt-2 zmb-2">
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
          <hr />
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
      type: Object,
      default: [],
    },
    title: {
      type: String,
      default: "",
    },
    analysis: {
      type: Object,
      default: [],
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
  },
  filters: {
    toDate(value) {
      return moment(value).format("DD-MM-YYYY");
    },
    toUid(value) {
      return value && value.indexOf("-")
        ? value.substring(0, value.indexOf("-"))
        : value;
    },
  },
};
</script>
<style scoped>
.progress-bar {
  border-radius: 4px;
  color: #020034;
  font-size: 14px;
}
.clickable {
  cursor: pointer;
}
.chart-summary {
  width: 100%;
}
.chart-summary .analysis-info {
  text-align: left;
}
.chart-summary .analysis-info label {
  font-weight: bold;
}
</style>