<template>
  <div class="analyses zcontainer-fluid">
    <b-table hover :items="analyses" :fields="fields">
      <template #cell(uid)="data">
        <span
          class="text-info clickable"
          @click="setGroup(0, 'id', data.item.id)"
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
        <b class="ml-1" style="display: inline-block;">({{data.value}})</b>
        </div>
      </template>

      <template #cell(template)="data">
        <span
          class="text-info clickable"
          @click="setGroup(0, 'template', data.item.template.data.id)"
          >{{ data.value.data.attributes.name }}</span
        >
      </template>

      <template #cell(questionnaire)="data">
        <span
          class="text-info clickable"
          @click="setGroup(0, 'questionnaire', data.item.questionnaire.data.id)"
          >{{ data.value.data.attributes.name }}</span
        >
      </template>

      <template #cell(organization)="data">
        <span
          class="text-info clickable"
          @click="setGroup(0, 'organization', data.item.questionnaire.data.attributes.organization.data.id)"
          >{{ data.item.questionnaire.data.attributes.organization.data.attributes.name }}</span
        >
      </template>

      

      <template #cell(updatedAt)="data">
        {{ data.value | toDate }}
      </template>
    </b-table>

    <div id="sismo-pivot" class="mt-5"></div>

    <download-excel class="btn btn-primary btn-default export mt-5 mb-5" :data="pivotData">
      Download
    </download-excel>

  </div>
</template>

<script>
import { mapGetters } from "vuex";
import moment from "moment";
import configPivot from './configPivot'

export default {
  name: "UserAnalysesList",
  computed: {
    ...mapGetters(["isAuthenticated", "loggedInUser"]),
  },
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
      comparer: { group1: "none", identifier1: 0, group2: "none", identifier2: 0 },
      pivotData: [],
      pivotgrid: null
    };
  },
  async fetch() {
    const headers = {
      headers: {
        Authorization: `Bearer ${process.env.API_TOKEN}`,
      },
    };
    var { data } = await this.$axios.get(
      `/analyses?populate=template&populate=questionnaire&populate=template.users&populate=questionnaire.users&filters[questionnaire][users][id][$eq]=${this.loggedInUser.id}}&sort=createdAt:desc`,
      headers
    );

    this.analyses = data.data.map(({ id, ...more }) => {
      return { id, ...more.attributes };
    });
    // filteredTemplates = filteredTemplates.map(({users, ...keepAttrs}) => keepAttrs)
  },
  async mounted() {
    await this.addScript("/vendor/jquery/jquery.js", "jquery-js");
    await this.addScript("/vendor/kendo/kendo.all.min.js", "kendo-all-min-js");
    await this.addStyle(
      "/vendor/kendo/kendo.common.min.css",
      "kendo-common-min-css"
    );
    await this.addStyle("/vendor/kendo/kendo.custom.css", "kendo-custom-css");
    await this.addStyle("/vendor/kendo/custom.css", "custom-css");
  },
  methods: {
    setGroup(index, group, identifier) {
      this.comparer[`group${index + 1}`] = group;
      this.comparer[`identifier${index + 1}`] = identifier;

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

        configPivot.dataBound = (e) => {
        /* The result can be observed in the DevTools(F12) console of the browser. */
          // console.log("data bound", e);
          var grid = $("#sismo-pivot").data("kendoPivotGrid");
          // console.log('dataBound', grid.dataSource._columns)

          localStorage["sismo-pivot-options-rows"] = JSON.stringify(grid.dataSource._rows)
          localStorage["sismo-pivot-options-columns"] = JSON.stringify(grid.dataSource._columns)
        }
        configPivot.dataBinding = (e) => {
        /* The result can be observed in the DevTools(F12) console of the browser. */
          // console.log("data dataBinding", e);

          // var grid = $("#sismo-pivot").data("kendoPivotGrid");
          // console.log('dataBinding', grid.dataSource._columns)
        }

        if (localStorage["sismo-pivot-options-rows"]) {
          configPivot.dataSource.rows = JSON.parse(localStorage["sismo-pivot-options-rows"])
          configPivot.dataSource.columns = JSON.parse(localStorage["sismo-pivot-options-columns"])
        }

        window.jQuery('#sismo-pivot').empty()
        window.jQuery('#sismo-pivot').kendoPivotGrid(configPivot)
        this.pivotgrid = $("#sismo-pivot").data("kendoPivotGrid");
        
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