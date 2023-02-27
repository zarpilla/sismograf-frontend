<template>
  <div class="analyses zcontainer-fluid">
    <div class="d-flex mb-2">
      <button
        class="button button-3 mr-3"
        :class="comparerIndex == 0 ? 'button-secondary' : 'button-disabled'"
        @click="compareClicked(0)"
        v-t="'Group 1'"
      ></button>
      <button
        class="button button-3"
        :class="comparerIndex == 1 ? 'button-secondary' : 'button-disabled'"
        @click="compareClicked(1)"
        v-t="'Group 2'"
      ></button>
    </div>

    <b-table :items="analyses" :fields="fields">
      <template #cell(uid)="data">
        <span
          class="button button-3 small-padding clickable"
          @click="
            setGroup(false, comparerIndex, 'id', data.item.id, data.value)
          "
          >{{ data.value | toUid }}</span
        >
      </template>
      <template #cell(detail)="data">
        <button
          class="button button-3 small-padding"
          @click="
            setGroup(true, comparerIndex, 'id', data.item.id, data.item.uid)
          "
          v-t="'Detail'"
        ></button>
      </template>
      <template #cell(resilienceLevel)="data">
        <div class="d-block" v-if="data.value">
          <b-progress-bar
            :value="data.value * 14.29 - 14.29"
            :max="100"
            show-progress
            :variant="
              data.value < 2.5
                ? 'danger'
                : data.value < 5.5
                ? 'warning'
                : 'success'
            "
          >
            <span
              ><b>{{ (data.value * 14.29 - 14.29).toFixed(0) }}%</b></span
            >
          </b-progress-bar>
          <b class="ml-1" style="display: block">
            {{
              // toLevel(data.value, data.item.template.data.attributes.locale)
              toLevel(data.value, $i18n.locale)
            }}</b
          >
        </div>
      </template>

      <template #cell(template)="data">
        <span
          class="text-info clickable"
          @click="
            setGroup(
              false,
              comparerIndex,
              'template',
              data.item.template.data.id,
              data.value.data.attributes.name
            )
          "
          >{{ data.value.data.attributes.name }}</span
        >
      </template>

      <template #cell(locale)="data">
        <span class="z">{{ data.item.template.data.attributes.locale }}</span>
      </template>

      <template #cell(questionnaire)="data">
        <span
          class="text-info clickable"
          @click="
            setGroup(
              false,
              comparerIndex,
              'questionnaire',
              data.item.questionnaire.data.id,
              data.value.data.attributes.name
            )
          "
          >{{ data.value.data.attributes.name }}</span
        >
      </template>

      <template #cell(organization)="data">
        <span
          v-if="
            data.item.questionnaire.data &&
            data.item.questionnaire.data.attributes.organization &&
            data.item.questionnaire.data.attributes.organization.data
          "
          class="text-info clickable"
          @click="
            setGroup(
              false,
              comparerIndex,
              'organization',
              data.item.questionnaire.data.attributes.organization.data.id,
              data.item.questionnaire.data.attributes.organization.data
                .attributes.name
            )
          "
          >{{
            data.item.questionnaire.data.attributes.organization.data.attributes
              .name
          }}</span
        >
      </template>

      <template #cell(organizationName)="data">
        <span v-if="data.item.organization" class="text-infoz">{{
          data.item.organization
        }}</span>
      </template>

      <template #cell(labels)="data">
        <span
          @click="
            setGroup(
              false,
              comparerIndex,
              'label',
              label.id,
              label.attributes.name
            )
          "
          class="badge bg-warning mr-1 clickable"
          v-for="label in data.item.labels.data"
          :key="label.id"
        >
          {{ label.attributes.name }}
        </span>
      </template>

      <template #cell(updatedAt)="data">
        {{ data.value | toDate }}
      </template>
    </b-table>
    <hr class="mt-5" />
    <hr class="mt-1" />

    <b-modal
      size="lg"
      centered
      ref="analysis-modal"
      id="analysis-modal"
      :title="analysis ? toUid(analysis.uid) : 'Analysis'"
      class="analysis-modal"
    >
      <div class="d-block text-center">
        <analysis-detail
          v-if="analysis && analysisSummary"
          :analysis="analysis"
          :summary="analysisSummary"
          :levels="resilienceLevels"
        />
      </div>

      <template #modal-footer>
        <b-button class="mt-3 btn-primary" @click="cancelModal">Ok</b-button>
      </template>
    </b-modal>

    <b-modal
      size="lg"
      centered
      ref="compare-modal"
      :title="analysis ? toUid(analysis.uid) : 'Analysis'"
    >
      <div class="d-block text-center">
        <!-- <h2 v-if="pivotData1.length">Results</h2> -->
        <div class="row">
          <div class="z" :class="pivotData2.length ? 'col-md-6' : 'col-md-12'">
            <div class="mb-5">
              <summary-wheel
                id="summary-chart-1"
                element-id="svg-1"
                class="mb-5"
                v-if="pivotData1.length"
                :analysis="analysis1"
                :levels="resilienceLevels"
                :title="
                  comparer.group1 === 'id'
                    ? toUid(comparer.title1)
                    : comparer.title1
                "
                :pivotData="pivotData1"
                :compare="pivotData2 && pivotData2.length > 0"
                :group="comparer.group1"
                :gid="comparer.identifier1"
              ></summary-wheel>
            </div>
          </div>
          <div class="col-md-6" v-if="pivotData2.length">
            <div class="mb-5">
              <summary-wheel
                id="summary-chart-2"
                element-id="svg-2"
                class="mb-5"
                v-if="pivotData2.length"
                :analysis="analysis2"
                :levels="resilienceLevels"
                :title="
                  comparer.group2 === 'id'
                    ? toUid(comparer.title2)
                    : comparer.title2
                "
                :pivotData="pivotData2"
                :compare="pivotData2 && pivotData2.length > 0"
                :group="comparer.group2"
                :gid="comparer.identifier2"
              ></summary-wheel>
            </div>
          </div>
        </div>

        <!-- <download-excel
          v-if="pivotData1.length"
          class="button button-4 export mt-5 mb-5 mr-2"
          :data="pivotData1"
          :fields="excelFields"
        >
          Download Data 1
        </download-excel> -->

        <!-- <download-excel
          v-if="pivotData2.length"
          class="button button-4 export mt-5 mb-5 mr-2"
          :data="pivotData2"
          :fields="excelFields"
        >
          Download Data 2
        </download-excel> -->

        <button
          v-if="pivotData1.length"
          class="button button-4 export mt-5 mb-5 mr-2"
          @click="downloadImage('summary-chart-1', 'svg-1', comparer.title1)"
        >
          Download Image 1
        </button>

        <button
          v-if="pivotData2.length"
          class="button button-4 export mt-5 mb-5 mr-2"
          @click="downloadImage('summary-chart-2', 'svg-2', comparer.title2)"
        >
          Download Image 2
        </button>
      </div>

      <template #modal-footer>
        <button class="button button-1" @click="cancelModal2" v-t="'close'">
          Close
        </button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import moment from "moment";
import AnalysisDetail from "./AnalysisDetail";
import _ from "lodash";
import * as htmlToImage from "html-to-image";
import download from "downloadjs";

export default {
  name: "UserAnalysesList",
  components: { AnalysisDetail },
  data() {
    return {
      analyses: [],
      fields: [
        {
          key: "uid",
          label: this.$t("col-id") !== "col-id" ? this.$t("col-id") : "Id",
        },
        {
          key: "template",
          label: "Template",
          label:
            this.$t("col-template") !== "col-template"
              ? this.$t("col-template")
              : "Template",
        },
        {
          key: "questionnaire",
          label: "Questionnaire",
          label:
            this.$t("col-questionnaire") !== "col-questionnaire"
              ? this.$t("col-questionnaire")
              : "Questionnaire",
        },
        {
          key: "organization",
          label: "Organization",
          label:
            this.$t("col-campaign") !== "col-campaign"
              ? this.$t("col-campaign")
              : "Campaign",
        },
        {
          key: "organizationName",
          label: "Organization Name",
          label:
            this.$t("col-organization") !== "col-organization"
              ? this.$t("col-organization")
              : "Organization",
        },
        {
          key: "labels",
          label: "Labels",
          class: "t-labels",
          label:
            this.$t("col-labels") !== "col-labels"
              ? this.$t("col-labels")
              : "Labels",
        },
        {
          key: "resilienceLevel",
          label:
            this.$t("col-resilience-level") !== "col-resilience-level"
              ? this.$t("col-resilience-level")
              : "Resilience Level",
        },
        {
          key: "updatedAt",
          label:
            this.$t("col-update-at") !== "col-update-at"
              ? this.$t("col-update-at")
              : "Updated At",
        },
        {
          key: "detail",
          label:
            this.$t("col-detail") !== "col-detail"
              ? this.$t("col-detail")
              : "Detail",
        },
      ],
      comparerIndex: 0,
      group1: null,
      identifier1: null,
      comparer: {
        group1: "none",
        identifier1: 0,
        title1: "",
        group2: "none",
        identifier2: 0,
        title2: "",
      },
      pivotData1: [],
      pivotData2: [],
      pivotgrid: null,
      excelFields: {
        analysisId: "analysisId",
        templateName: "templateName",
        questionnaireName: "questionnaireName",
        domainName: "domainName",
        domainDescription: "domainDescription",
        principleName: "principleName",
        patternName: "patternName",
        indicatorName: "indicatorName",
        responseValue: "responseValue",
        resilienceLevel: "resilienceLevel",
        comments: "comments",
      },
      resilienceLevels: [],
      analysis: null,
      analysis1: null,
      analysis2: null,
      analysisSummary: null,
    };
  },
  computed: {
    ...mapGetters(["isAuthenticated", "loggedInUser"]),
  },
  async fetch() {
    for (let i = 0; i < this.$i18n.locales.length; i++) {
      const loc = this.$i18n.locales[i];
      var { data } = await this.$axios.get(
        `/resilience-levels?locale=${loc.code}`,
        {}
      );
      this.resilienceLevels = data.data;
    }

    let organizationQuery = "";
    const organization = this.$store.state.application.attributes.organization;
    if (organization) {
      organizationQuery = `&filters[questionnaire][organization][slug][$eq]=${organization}`;
    }

    var { data } = await this.$axios.get(
      `/analyses?pagination[pageSize]=9999&populate=template&populate=questionnaire&populate=labels&pòpulate=labels.label_category&populate=template.users&populate=questionnaire.users&populate=questionnaire.organization&filters[questionnaire][users][id][$eq]=${this.loggedInUser.id}}${organizationQuery}&sort=createdAt:desc`,
      {}
    );

    // console.log("data.data", data.data);

    this.analyses = data.data.map(({ id, ...more }) => {
      return { id, ...more.attributes };
    });
  },
  methods: {
    setGroup(viewDetail, comparerIndex, group, identifier, title) {
      this.comparer[`group${comparerIndex + 1}`] = group;
      this.comparer[`identifier${comparerIndex + 1}`] = identifier;
      this.comparer[`title${comparerIndex + 1}`] = title;

      this.updatePivot(viewDetail);
    },
    async updatePivot(viewDetail) {
      // const headers = {
      //   headers: {
      //     Authorization: `Bearer ${process.env.apiToken}`,
      //   },
      // };
      if (this.comparer.identifier1) {
        var { data } = await this.$axios.get(
          `/analyses/compare/${this.comparer.group1}/${this.comparer.group2}/?g1=${this.comparer.identifier1}&g2=${this.comparer.identifier2}`,
          {}
        );
        const pivotData1 = [];
        const pivotData2 = [];
        data.g1.analyses.forEach((a) => {
          a.results = a.results.map(
            ({
              id,
              value,
              // domainId,
              templateId,
              questionnaireId,
              // principleId,
              patternId,
              indicatorId,
              ...item
            }) => item
          );
          a.results.forEach((r) => {
            r.locale = process.env.language;
            pivotData1.push(r);
          });
        });

        data.g2.analyses.forEach((a) => {
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
            r.locale = process.env.language;
            pivotData2.push(r);
          });
        });

        this.pivotData1 = Object.freeze(pivotData1);
        this.pivotData2 = Object.freeze(pivotData2);

        if (viewDetail) {
          this.analysis =
            this.comparerIndex === 0
              ? data.g1.analyses[0]
              : data.g2.analyses[0];
          this.analysisSummary =
            this.comparerIndex === 0 ? this.pivotData1 : this.pivotData2;

          var { data } = await this.$axios.get(
            `/analyses/results/${this.analysis.id}`,
            {}
          );
          if (data.length && data[0].labels) {
            this.analysis.labels = data[0].labels;
          }
          this.$refs["analysis-modal"].show();
        } else {
          this.analysis1 = null;
          this.analysis2 = null;
          if (this.comparer.group1 === "id") {
            this.analysis1 = data.g1.analyses[0];
          }
          if (this.comparer.group2 === "id") {
            this.analysis2 = data.g2.analyses[0];
          }
          this.$refs["compare-modal"].show();
        }
      }
    },
    async addStyle(src, id) {
      return new Promise((resolve, reject) => {
        if (document.getElementById(id)) {
          resolve();
        }
        const head = document.head || document.getElementsByTagName("head")[0];
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = src;
        link.id = id;
        link.addEventListener("load", resolve);
        link.addEventListener("error", (e) => reject(e));
        link.addEventListener("abort", (e) => reject(e));
        head.appendChild(link);
      });
    },
    toLevel(value, locale) {
      const level = this.resilienceLevels.find(
        (r) => parseFloat(r.attributes.code) + 0.5 > value
      );
      return level ? level.attributes.name : "";
    },
    compareClicked(option) {
      if (option === 1 && this.comparerIndex === 1) {
        this.comparer.group2 = "none";
        this.comparerIndex = 0;
      } else if (option === 0) {
        this.comparer.group2 = "none";
        this.comparerIndex = 0;
      } else {
        this.comparerIndex = option;
      }
    },
    downloadImage(id, id2, title) {
      const svgUrl = document.getElementById(id2).src;
      const t = this;
      this.toDataUrl(svgUrl, (base64) => {
        const imageUrl = base64;
        document.getElementById(id2).src = imageUrl;

        htmlToImage.toPng(document.getElementById(id)).then(function (dataUrl) {
          const name = t.$i18n.t("sismograf-file") + "-" + title + ".png";
          download(dataUrl, name);
          document.getElementById(id2).src = svgUrl;
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
    toUid(value) {
      return value && value.indexOf("-")
        ? value.substring(0, value.indexOf("-"))
        : value;
    },
    hideModal() {
      this.analysis = null;
      this.analysisSummary = null;
      this.$refs["analysis-modal"].hide();
    },
    cancelModal() {
      this.analysis = null;
      this.analysisSummary = null;
      this.$refs["analysis-modal"].hide();
    },
    cancelModal2() {
      this.$refs["compare-modal"].hide();
    },
  },
  filters: {
    toDate(value) {
      // return moment(value).format("DD-MM-YYYY");
      return moment(value, "YYYY-MM-DDThh:mm:ss").format("DD-MM-YYYY hh:mm");
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
.text-info {
  color: #020034 !important;
  text-decoration: underline;
}
.button-3 {
  margin-bottom: 0 !important;
}
.button-3.small-padding {
  padding: 0.4rem 1rem 0.35rem 1rem !important;
}
.button-secondary {
  background: #f3c857 !important;
}
.button-disabled {
  background: #fff !important;
}
</style>
<style>
.table thead th.t-labels,
.table thead td.t-labels {
  width: 20%;
}

.modal-dialog {
  max-width: 100% !important;
  margin: 0 !important;
  top: 20px !important;
  bottom: 20px !important;
  left: 20px !important;
  right: 20px !important;
  height: calc(100vh - 40px) !important;
  width: calc(100vw - 40px) !important;
  display: flex !important;
}
.modal-content {
  height: calc(100vh - 40px) !important;
}
body.modal-open {
  overflow: hidden;
}
.sismograf-report {
  text-align: left;
}
.analysis-detail {
  text-align: left;
  padding-left: 0.5rem;
}
</style>
