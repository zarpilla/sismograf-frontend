<template>
  <div class="analyses zcontainer-fluid" id="lalala">
    <b-table hover :items="analyses" :fields="fields">
      <template #cell(uid)="data">
        <span
          class="text-info clickable"
          @click="setGroup(0, 'id', data.item.id, data.value)"
          >{{ data.value }}</span
        >
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
        <b class="ml-1" style="display: inline-block;">
          ({{ toLevel(data.value) }})</b>
        </div>
      </template>

      <template #cell(template)="data">
        <span
          class="text-info clickable"
          @click="setGroup(0, 'template', data.item.template.data.id, data.value.data.attributes.name)"
          >{{ data.value.data.attributes.name }}</span
        >
      </template>

      <template #cell(questionnaire)="data">
        <span
          class="text-info clickable"
          @click="setGroup(0, 'questionnaire', data.item.questionnaire.data.id, data.value.data.attributes.name)"
          >{{ data.value.data.attributes.name }}</span
        >
      </template>

      <template #cell(organization)="data">
        <span
          class="text-info clickable"
          @click="setGroup(0, 'organization', data.item.questionnaire.data.attributes.organization.data.id, data.item.questionnaire.data.attributes.organization.data.attributes.name)"
          >{{ data.item.questionnaire.data.attributes.organization.data.attributes.name }}</span
        >
      </template>

      <template #cell(updatedAt)="data">
        {{ data.value | toDate }}
      </template>
    </b-table>
<hr class="mt-5">
<hr class="mt-1">
    <h2 v-if="pivotData.length">Results</h2>
<div class="mb-5">
    <summary-chart class="mb-5" v-if="pivotData.length" :levels="resilienceLevels" :comparer="comparer" :pivotData="pivotData"></summary-chart>
    </div>

    <!-- <div id="sismo-pivot" class="mt-5"></div> -->

    <download-excel v-if="pivotData.length" class="btn btn-primary btn-default export mt-5 mb-5" :data="pivotData" :fields="excelFields">
      Download
    </download-excel>

  </div>
</template>

<script>
import { mapGetters } from "vuex";
import moment from "moment";
import configPivot from './configPivot'
import SummaryChart from './SummaryChart'
import _ from "lodash";

export default {
  name: "UserAnalysesList",
  data() {
    return {
      analyses: [],
      fields: [
        "uid",
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
        
        "resilienceLevel",
        {
          key: "updatedAt",
          formatter: (value) => {
            return moment(value).format("DD-MM-YYYY");
          },
        },
      ],
      index: 1,
      group1: null,
      identifier1: null,
      comparer: { group1: "none", identifier1: 0, title1: "", group2: "none", identifier2: 0, title2: "" },
      pivotData: [],
      pivotgrid: null,
      excelFields: {'analysisId': 'analysisId', 'templateName': 'templateName', 'questionnaireName': 'questionnaireName', 'domainName': 'domainName', 'principleName': 'principleName', 'patternName': 'patternName', 'indicatorName': 'indicatorName', 'responseValue': 'responseValue', 'resilienceLevel': 'resilienceLevel', 'comments': 'comments'},
      resilienceLevels: []
    };
  },
  computed: {
    ...mapGetters(["isAuthenticated", "loggedInUser"]),
    chartSummary () {
      const summaryByDomain = _(this.pivotData)
        .groupBy('domainName')
          .map((domainRows, id) => ({
            domainName: id,
            resilienceLevel: _.meanBy(domainRows, 'resilienceLevel'),            
            principles: _(domainRows).groupBy('principleName').map((principleRows, id) => ({
              principleName: id,
              resilienceLevel: _.meanBy(principleRows, 'resilienceLevel'),
              patterns: _(principleRows).groupBy('patternName').map((patternsRows, id) => ({
                patternName: id,
                resilienceLevel: _.meanBy(patternsRows, 'resilienceLevel'),
              }))
            }))
            .value()
          }))
          .value()
      return { resilienceLevel: _.meanBy(summaryByDomain, 'resilienceLevel'), domains: summaryByDomain }
    }
  },
  async fetch() {
    const headers = {
      headers: {
        Authorization: `Bearer ${process.env.API_TOKEN}`,
      },
    };
    var { data } = await this.$axios.get(
      `/analyses?populate=template&populate=questionnaire&populate=template.users&populate=questionnaire.users&populate=questionnaire.organization&filters[questionnaire][users][id][$eq]=${this.loggedInUser.id}}&sort=createdAt:desc`,
      headers
    );

    this.analyses = data.data.map(({ id, ...more }) => {
      return { id, ...more.attributes };
    });

    var { data } = await this.$axios.get(
      `/resilience-levels?locale=${this.$i18n.locale}`,
      headers
    );

    // console.log('data', data)

    this.resilienceLevels = data.data

    // filteredTemplates = filteredTemplates.map(({users, ...keepAttrs}) => keepAttrs)
  },
  async mounted() {
    await this.addScript("/vendor/jquery/jquery.js", "jquery-js");
    await this.addScript("/vendor/kendo/kendo.all.min.js", "kendo-all-min-js");
    // await this.addScript("/vendor/html2pdf/html2pdf.bundle.min.js", "html2pdf-js");
    await this.addStyle(
      "/vendor/kendo/kendo.common.min.css",
      "kendo-common-min-css"
    );
    await this.addStyle("/vendor/kendo/kendo.custom.css", "kendo-custom-css");
    await this.addStyle("/vendor/kendo/custom.css", "custom-css");
  },
  methods: {
    setGroup(index, group, identifier, title) {
      this.comparer[`group${index + 1}`] = group;
      this.comparer[`identifier${index + 1}`] = identifier;
      this.comparer[`title${index + 1}`] = title;

      this.updatePivot()
    },
    async updatePivot() {
      const headers = {
        headers: {
          Authorization: `Bearer ${process.env.API_TOKEN}`,
        },
      };
      if (this.comparer.identifier1) {
        var { data } = await this.$axios.get(
          `/analyses/compare/${this.comparer.group1}/${this.comparer.group2}/?g1=${this.comparer.identifier1}&g2=${this.comparer.identifier2}`,
          headers
        );
        const pivotData = []
        data.g1.analyses.forEach(a => {
          a.results = a.results.map(({ id, value, domainId, templateId, questionnaireId, principleId, patternId, indicatorId, ...item }) => item)
          a.results.forEach(r => {            
            pivotData.push(r)
          })          
        })

        this.pivotData = Object.freeze(pivotData);
        configPivot.dataSource.data = this.pivotData

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
    getPDF() {
      var element = document.getElementById("sismograf-report");
      var opt = {
        margin: [0, 0],
        filename: `sismograf-${this.title}`,
        image: { type: "jpeg", quality: 1 },
        html2canvas: { dpi: 300, scale: 4, letterRendering: true },
        jsPDF: { unit: "in", format: "letter", orientation: "landscape" },
      };
      // console.log('element', element)
      html2pdf().set(opt).from(element).save();
      // html2pdf().from(element).save();
    },
    toLevel(value) {
      const level = this.resilienceLevels.find(r => parseFloat(r.attributes.code) + 0.5 > value)
      return level ? level.attributes.name : ''
    },
  },
  filters: {
    toDate(value) {
      return moment(value).format("DD-MM-YYYY");
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