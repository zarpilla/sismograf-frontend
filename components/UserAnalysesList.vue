<template>
  <div class="analyses zcontainer-fluid">
    <div class="d-flex mb-2">
      <button
        class="btn mr-2"
        :class="comparerIndex == 0 ? 'btn-secondary' : 'btn-disabled'"
        @click="compareClicked(0)"
      >
        Group 1
      </button>
      <button
        class="btn"
        :class="comparerIndex == 1 ? 'btn-secondary' : 'btn-disabled'"
        @click="compareClicked(1)"
      >
        Group 2
      </button>
    </div>

    <!-- <pre>{{analyses}}</pre> -->

    <b-table :items="analyses" :fields="fields">
      <template #cell(uid)="data">
        <span
          class="text-info clickable"
          @click="
            setGroup(false, comparerIndex, 'id', data.item.id, data.value)
          "
          >{{ data.value | toUid }}</span
        >
      </template>
      <template #cell(detail)="data">
        <button
          class="btn btn-secondary"
          @click="
            setGroup(true, comparerIndex, 'id', data.item.id, data.item.uid)
          "
          v-t="'Detail'"
        ></button>
      </template>
      <template #cell(resilienceLevel)="data">
        <div class="d-flex">
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
          <b class="ml-1" style="display: inline-block">
            ({{
              toLevel(data.value, data.item.template.data.attributes.locale)
            }})</b
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
        {{ data.value }}
      </template>
    </b-table>
    <hr class="mt-5" />
    <hr class="mt-1" />

    <b-modal
      size="lg"
      centered
      ref="analysis-modal"
      :title="analysis ? toUid(analysis.uid) : 'Analysis'"
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
              <summary-chart
                id="summary-chart-1"
                class="mb-5"
                v-if="pivotData1.length"
                :levels="resilienceLevels"
                :analysis="analysis1"
                :title="
                  comparer.group1 === 'id'
                    ? toUid(comparer.title1)
                    : comparer.title1
                "
                :pivotData="pivotData1"
              ></summary-chart>
            </div>
          </div>
          <div class="col-md-6" v-if="pivotData2.length">
            <div class="mb-5">
              <summary-chart
                id="summary-chart-2"
                class="mb-5"
                v-if="pivotData2.length"
                :levels="resilienceLevels"
                :analysis="analysis2"
                :title="
                  comparer.group2 === 'id'
                    ? toUid(comparer.title2)
                    : comparer.title2
                "
                :pivotData="pivotData2"
              ></summary-chart>
            </div>
          </div>
        </div>

        <download-excel
          v-if="pivotData1.length"
          class="btn btn-primary btn-default export mt-5 mb-5 mr-2"
          :data="pivotData1"
          :fields="excelFields"
        >
          Download Data 1
        </download-excel>

        <download-excel
          v-if="pivotData2.length"
          class="btn btn-primary btn-default export mt-5 mb-5 mr-2"
          :data="pivotData2"
          :fields="excelFields"
        >
          Download Data 2
        </download-excel>

        <button
          v-if="pivotData1.length"
          class="btn btn-primary btn-default export mt-5 mb-5 mr-2"
          @click="downloadImage('summary-chart-1')"
        >
          Download Image 1
        </button>

        <button
          v-if="pivotData2.length"
          class="btn btn-primary btn-default export mt-5 mb-5 mr-2"
          @click="downloadImage('summary-chart-2')"
        >
          Download Image 2
        </button>
      </div>

      <template #modal-footer>
        <b-button class="mt-3 btn-primary" @click="cancelModal2">Ok</b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import moment from "moment";
import configPivot from "./configPivot";
import SummaryChart from "./SummaryChart";
import AnalysisDetail from "./AnalysisDetail";
import _ from "lodash";
import * as htmlToImage from "html-to-image";
import download from "downloadjs";

export default {
  name: "UserAnalysesList",
  components: { AnalysisDetail, SummaryChart },
  data() {
    return {
      analyses: [],
      fields: [
        {
          key: "uid",
          label: "Id",
        },
        {
          key: "template",
          label: "Template",
        },
        {
          key: "questionnaire",
          label: "Questionnaire",
        },
        {
          key: "organization",
          label: "Organization",
        },
        {
          key: "labels",
          label: "Labels",
        },
        "resilienceLevel",
        {
          key: "updatedAt",
          formatter: (value) => {
            return moment(value).format("DD-MM-YYYY");
          },
        },
        {
          key: "detail",
          label: "Detail",
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
      resilienceLevels: { ca: [], en: [], es: [] },
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
    // const headers = {
    //   headers: {
    //     Authorization: `Bearer ${process.env.apiToken}`,
    //   },
    // };

    let organizationQuery = ''
    if (process.env.organization !== '') {
      organizationQuery = `&filters[questionnaire][organization][slug][$eq]=${process.env.organization}`
    }

    var { data } = await this.$axios.get(
      `/analyses?pagination[pageSize]=9999&populate=template&populate=questionnaire&populate=labels&pòpulate=labels.label_category&populate=template.users&populate=questionnaire.users&populate=questionnaire.organization&filters[questionnaire][users][id][$eq]=${this.loggedInUser.id}}${organizationQuery}&sort=createdAt:desc`,
      {}
    );

    this.analyses = data.data.map(({ id, ...more }) => {
      return { id, ...more.attributes };
    });
  },  
  async mounted() {
    // await this.addScript("/vendor/jquery/jquery.js", "jquery-js");
    // await this.addScript("/vendor/kendo/kendo.all.min.js", "kendo-all-min-js");
    // // await this.addScript("/vendor/html2pdf/html2pdf.bundle.min.js", "html2pdf-js");
    // await this.addStyle(
    //   "/vendor/kendo/kendo.common.min.css",
    //   "kendo-common-min-css"
    // );
    // await this.addStyle("/vendor/kendo/kendo.custom.css", "kendo-custom-css");
    // await this.addStyle("/vendor/kendo/custom.css", "custom-css");

    const headers = {
      headers: {
        Authorization: `Bearer ${process.env.apiToken}`,
      },
    };

    this.$i18n.locales.forEach(async (loc) => {
      var { data } = await this.$axios.get(
        `/resilience-levels?locale=${loc}`,
        {}
      );

      this.resilienceLevels[loc] = data.data;
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
        // configPivot.dataSource.data = this.pivotData;

        // configPivot.dataBound = (e) => {
        //   var grid = $("#sismo-pivot").data("kendoPivotGrid");
        //   localStorage["sismo-pivot-options-rows"] = JSON.stringify(grid.dataSource._rows)
        //   localStorage["sismo-pivot-options-columns"] = JSON.stringify(grid.dataSource._columns)
        // }
        // configPivot.dataBinding = (e) => {
        // }

        // if (localStorage["sismo-pivot-options-rows"]) {
        //   configPivot.dataSource.rows = JSON.parse(localStorage["sismo-pivot-options-rows"])
        //   configPivot.dataSource.columns = JSON.parse(localStorage["sismo-pivot-options-columns"])
        // }

        // window.jQuery('#sismo-pivot').empty()
        // window.jQuery('#sismo-pivot').kendoPivotGrid(configPivot)
        // this.pivotgrid = $("#sismo-pivot").data("kendoPivotGrid");
      }
    },
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
      const level = this.resilienceLevels[locale].find(
        (r) => parseFloat(r.attributes.code) + 0.5 > value
      );
      return level ? level.attributes.name : "";
    },
    compareClicked(option) {
      if (option === 1 && this.comparerIndex === 1) {
        this.comparer.group2 = "none";
        this.comparerIndex = 0;
      }
      else if (option === 0) {
        this.comparer.group2 = "none";
        this.comparerIndex = 0;
      } else {
        this.comparerIndex = option;
      }
    },
    downloadImage(id) {
      htmlToImage.toPng(document.getElementById(id)).then(function (dataUrl) {
        download(dataUrl, "sismograf.png");
      });
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
  color: #222;
  font-size: 14px;
}
.clickable {
  cursor: pointer;
}
</style>