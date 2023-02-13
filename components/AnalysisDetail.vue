<template>
  <div class="chart-detail">
    <section v-if="summary && summary.length">
      <div class="sismograf-detail text-left">
        <div class="analysis-info">
          <label class="bold">Date:</label>
          {{ analysis.createdAt | toDate }}
        </div>
        <div class="analysis-info" v-if="analysis.email">
          <label class="bold">Email:</label>
          {{ analysis.email }}
        </div>
        <div class="analysis-info" v-if="analysis.organization">
          <label class="bold">Organization:</label>
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
        <div
          class="analysis-info"
          v-if="analysis.labels && analysis.labels.length"
        >
          <label class="bold">Labels:</label>
          <div class="d-flex">
            <div
              class="label badge bg-warning mr-1"
              v-for="(lbl, i) in analysis.labels"
              :key="i"
            >
              {{ lbl.name }}
            </div>
          </div>
        </div>
        <hr class="mb-3" />
        <div v-for="(result, i) in analysis.results" :key="i" class="mb-3">
          <div class="indicator-name bold">
            {{ result.indicatorName }}
          </div>
          <div class="indicator-value">
            {{ result.responseValue }} ({{
              (result.resilienceLevel * 14.29 - 14.29).toFixed(0)
            }}%)
          </div>
          <div class="indicator-comments mb-2" v-if="result.comments">
            <b v-t="'Comments:'"></b> {{ result.comments }}
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import moment from "moment";
import _ from "lodash";

export default {
  components: {},
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
      default: "",
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
  methods: {},
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
.indicator-name {
  font-weight: bold;
}
.bold {
  font-weight: bold;
}
</style>