<template>
  <div class="chart-summary">
    <section>
      <div
        class="sismograf-report"
        :class="compare ? 'sismograf-report-compare' : 'z'"
      >
        <b-row>
          <b-col :md="compare ? 12 : 2">
            <div class="analysis-detail" v-if="analysis || title">
              <div
                class="analysis-info"
                v-if="(analysis && analysis.organization) || title"
              >
                <h2>
                  {{
                    analysis && analysis.organization
                      ? analysis.organization
                      : title
                  }}
                </h2>
              </div>
              <div class="analysis-info" v-if="analysis">
                {{ analysis.createdAt | toDate }}
              </div>
            </div>
          </b-col>
          <b-col :md="compare ? 10 : 6">
            <img
              :id="elementId"
              class="wheel"
              :src="apiUrl + `/analyses/wheel/${group}/?g1=${gid}`"
            />
            <!-- <div class="wheel-cont" v-bind:style="{ backgroundImage: 'url(' + apiUrl + `/analyses/wheel/${group}/?g1=${gid}` + ')' }"></div> -->
          </b-col>
          <b-col md="3" v-if="!compare">
            <div class="d-flex">
              <div class="dragons-list">
                <h4 v-t="'col-lectivisme'">Col·lectivisme</h4>
                <div class="dragon-name">
                  <Dragon color="#3B4174"></Dragon>
                  {{ levelsDisplay[0].name }}
                </div>
                <div class="dragon-name">
                  <Dragon color="#508DA8"></Dragon>
                  {{ levelsDisplay[1].name }}
                </div>
                <div class="dragon-name">
                  <Dragon color="#76B3A8"></Dragon>
                  {{ levelsDisplay[2].name }}
                </div>
                <h4 v-t="'individualisme'">Individualisme</h4>
                <div class="dragon-name">
                  <Dragon color="#5F925F"></Dragon>
                  {{ levelsDisplay[3].name }}
                </div>
                <div class="dragon-name">
                  <Dragon color="#E1BB59"></Dragon>
                  {{ levelsDisplay[4].name }}
                </div>
                <div class="dragon-name">
                  <Dragon color="#DA8344"></Dragon>
                  {{ levelsDisplay[5].name }}
                </div>
                <h4 v-t="'trauma'">Trauma</h4>
                <div class="dragon-name">
                  <Dragon color="#CE542E"></Dragon>
                  {{ levelsDisplay[6].name }}
                </div>
                <div class="dragon-name">
                  <Dragon color="#A71F1F"></Dragon>
                  {{ levelsDisplay[7].name }}
                </div>
              </div>
              <img src="~/assets/images/ellipses.svg" class="ellipses" />
            </div>
          </b-col>
        </b-row>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import moment from "moment";
import ResilienceProgress from "./ResilienceProgress";
import _ from "lodash";
import * as d3 from "d3";

export default {
  name: "SummaryWeel",
  data() {
    return {
      apiUrl: process.env.apiUrl,
      colors: [
        "#A71F1F",
        "#CE542E",
        "#DA8344",
        "#E1BB59",
        "#5F925F",
        "#76B3A8",
        "#508DA8",
        "#3B4174",
      ],
      colors01: [
        "rgba(167, 31, 31, 1)",
        "rgba(206, 84, 46, 1)",
        "rgba(218, 131, 68, 1)",
        "rgba(225, 187, 89, 1)",
        "rgba(95, 146, 95, 1)",
        "rgba(118, 179, 168, 1)",
        "rgba(80, 141, 168, 1)",
        "rgba(59, 65, 116, 1)",
      ],
      colors06: [
        "rgba(167, 31, 31, 0.6)",
        "rgba(206, 84, 46, 0.6)",
        "rgba(218, 131, 68, 0.6)",
        "rgba(225, 187, 89, 0.6)",
        "rgba(95, 146, 95, 0.6)",
        "rgba(118, 179, 168, 0.6)",
        "rgba(80, 141, 168, 0.6)",
        "rgba(59, 65, 116, 0.6)",
      ],
      colors03: [
        "rgba(167, 31, 31, 0.3)",
        "rgba(206, 84, 46, 0.3)",
        "rgba(218, 131, 68, 0.3)",
        "rgba(225, 187, 89, 0.3)",
        "rgba(95, 146, 95, 0.3)",
        "rgba(118, 179, 168, 0.3)",
        "rgba(80, 141, 168, 0.3)",
        "rgba(59, 65, 116, 0.3)",
      ],
    };
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
    title: {
      type: String,
      default: "",
    },
    analysis: {
      type: Object,
      default: [],
    },
    elementId: {
      type: String,
      default: "svg",
    },
    compare: {
      type: Boolean,
      default: false,
    },
    group: {
      type: String,
    },
    gid: {
      type: [String, Number]
    },
  },
  computed: {
    ...mapGetters(["isAuthenticated", "loggedInUser"]),
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
  mounted() {},
  methods: {
    toPct(value) {
      return parseInt((value * 14.29 - 14.29).toFixed(0));
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
<style lang="scss">
.sismograf-report {
  padding-top: 3rem;
}
.wheel {
  width: 100%;
  margin-top: -5rem;
}
@media (max-width: 1024px) {
  .wheel {
    margin-top: 0rem;
  }
}
.wheel-cont {
  width: 875px;
  height: 875px;
  background-size: contain;
}
.sismograf-report-compare .wheel {
  margin-top: -2rem;
}
.svg-result {
  margin-top: -5rem;
  width: 100%;
  height: 100%;
}

.svg-result svg {
  width: 875px;
  height: 875px;
}
.chart-summary {
  background-color: #fbf7eb;
}
.ellipses {
  margin-top: 10vh;
  margin-left: 3rem;
}
.dragons-list {
  margin-top: 10vh;

  h4 {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
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
</style>