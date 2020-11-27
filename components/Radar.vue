/* eslint-disable */
<template>
  <div>
    <!-- <h2 class="title">{{ data.nom }}</h2>
    <h3 class="title">{{ total() | float1 }} / 8</h3> -->
    <!-- <pre>ambit:{{ datacollection }}</pre> -->
    <radar-chart
      :height="mobile ? 200 : 200"
      :chart-data="datacollection"
      :options="options"
      v-if="datacollection != null"
    ></radar-chart>
  </div>
</template>

<script>
import RadarChart from "./RadarChart";

export default {
  name: "Radar",
  components: {
    RadarChart,
  },
  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
    mobile: Boolean,
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
  data() {
    return {
      datacollection: null,
      options: {
        maintainAspectRatio: false,
        legend: {
          display: false,
        },
        scale: {
          ticks: {
            display: false,
            beginAtZero: true,
            max: 8,
            min: 0,
            stepSize: 2,
            maxTicksLimit: 4,
          },
          pointLabels: {
            //display: false,
            fontColor: "#ffffff",
            fontSize: 12,
          },
        },
        tooltips: {
          enabled: true,
          callbacks: {
            label: function (tooltipItem, data) {
              return (
                " " +
                data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]
              );
            },
          },
        },
      },
      optionsLine: {
        legend: {
          display: false,
        },
      },
    };
  },
  mounted() {
    this.fillData();
  },
  watch: {
    data: {
      handler: function () {
        this.fillData();
      },
      deep: true,
    },
  },
  methods: {
    t(obj, field) {      
      return obj[`${field}_${this.$i18n.locale}`] && obj[`${field}_${this.$i18n.locale}`] !== '' ? obj[`${field}_${this.$i18n.locale}`] : 
      obj[`${field}_ca`] && obj[`${field}_ca`] !== '' ? obj[`${field}_ca`] : 
      obj[`${field}_en`] && obj[`${field}_en`] !== '' ? obj[`${field}_en`] : 
      obj[`${field}_es`] &&  obj[`${field}_es`] !== '' ? obj[`${field}_es`] : ''
    },
    fillData() {
      //console.log("radar data", this.data);

      this.datacollection = {
        labels: this.data.capacities.map((c) => {
          return this.t(c, 'text');
        }),
        datasets: [
          {
            // label: data.nom,
            // backgroundColor: "rgba(169, 85, 81, 0.5)", //rgba(85, 175, 184, 0.7)",
            // borderColor: "rgba(169, 85, 81, 0.9)",
            backgroundColor: "rgba(255, 255, 255, 0.5)", //rgba(85, 175, 184, 0.7)",
            borderColor: "rgba(255, 255, 255, 0.9)",
            data: this.data.capacities.map((c) => {
              return c.result ? c.result : 0;
            }),
          },
        ],
      };
      console.log(
        "radar datacollection",
        JSON.parse(JSON.stringify(this.datacollection))
      );
    },
    total() {
      let values = this.data.capacities.map((c) => {
        return c.result ? c.result : 0;
      });
      return values.reduce((a, b) => a + b, 0) / values.length; //parseFloat( values.reduce((a, b) => a + b, 0) / values.length ).toFixed(1);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.title {
  color: #fff;
}
</style>
