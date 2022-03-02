/* eslint-disable */
<template>
  <div>
    <horizontal-bar-chart :height="600" :chart-data="datacollection" :options="options" v-if="datacollection != null"></horizontal-bar-chart>
  </div>
</template>

<script>
import HorizontalBarChart from "./HorizontalBarChart";

export default {
  name: "Radar",
  components: {
    HorizontalBarChart
  },
  props: {
    data: {
      type: Array,
      default: () => ({})
    },
    mobile: Boolean,
    template: {
      type: Object
    },
  },
  filters: {
    float1(amount) {
      const amt = Number(amount);
      return (
        (amt && amt.toLocaleString(undefined, { maximumFractionDigits: 1 })) ||
        "0"
      );
    }
  },
  data() {
    return {
      datacollection: null,
      options: {
        maintainAspectRatio:false,
        legend: {
          display: false
        },
        scales: {
          xAxes: [
            {
              // gridLines: {
              //   display:false
              // },
              // scaleLabel: {
              //   display: false,
              //   labelString: "ESS",
              //   fontFamily: "Montserrat",
              //   fontColor: "#fff",
              //   fontSize: "16"              
              // },
              ticks: {
                min: 1,
                max: 8,
                fontColor: "#fff",
                callback: (value, index, ticks) => {
                  const level = this.template?.attributes?.levels?.find(l => l.value === value)
                  if (level) {
                    return level.name
                  }
                  return value;
                }
              }
            }
          ],
          yAxes: [
            {
              gridLines: {
                display:false
              },
              scaleLabel: {
                // display: false,
                labelString: "IMPSISMO",
                fontFamily: "Montserrat",
                fontColor: "#fff",
                fontSize: "16"
              },
              ticks: {
                // display: false,
                min: 0,
                max: 8,
                //stepSize: 8,
                fontColor: "#fff"
              }
            }
          ]
        },
        tooltips: {
          enabled: false,
          callbacks: {
            label: function(tooltipItem, data) {
              return (
                " Nivel: " + ""
                //data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]
              );
            }
          }
        }
      }
    };
  },
  mounted() {
    this.fillData();
  },
  watch: {
    data: {
      handler: function() {
        this.fillData();
      },
      deep: true
    }
  },
  methods: {
    fillData() {
      //console.log("cline data", this.data);
      let labels = [];
      this.data.forEach(domain => {
        labels = labels.concat(
          domain.principles.map(s => {
            return s.name
          })
        );
      });
      let datasetData = [];
      this.data.forEach(domain => {
        datasetData = datasetData.concat(
          domain.principles.map(principle => { return principle.value ? principle.value : 0 })
        );
      });
      this.datacollection = {
        labels: labels,
        datasets: [
          {
            // label: data.nom,
            // backgroundColor: "rgba(169, 85, 81, 0.7)", //rgba(85, 175, 184, 0.7)",
            // borderColor: "rgba(169, 85, 81, 0.9)",
            // backgroundColor: "rgba(169, 85, 81, 0.5)", //rgba(85, 175, 184, 0.7)",
            // borderColor: "rgba(169, 85, 81, 0.9)",
            backgroundColor: "rgba(255, 255, 255, 0.5)", //rgba(85, 175, 184, 0.7)",
            borderColor: "rgba(255, 255, 255, 0.9)",
            data: datasetData
          }
        ]
      };
      //console.log("this.datacollection", this.datacollection);
    },
    total() {
      let values = this.data.principles.map(c => {
        return c.value != null ? c.value : 0        
      });
      return values.reduce((a, b) => a + b, 0) / values.length;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.title {
  color: #fff;
}
</style>
