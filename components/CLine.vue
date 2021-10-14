/* eslint-disable */
<template>
  <div>
    <line-chart :height="200" :chart-data="datacollection" :options="options" v-if="datacollection != null"></line-chart>
  </div>
</template>

<script>
import LineChart from "./LineChart";

export default {
  name: "Radar",
  components: {
    LineChart
  },
  props: {
    data: {
      type: Array,
      default: () => ({})
    },
    mobile: Boolean
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
              gridLines: {
                display:false
              },
              scaleLabel: {
                display: false,
                labelString: "ESS",
                fontFamily: "Montserrat",
                fontColor: "#fff",
                fontSize: "16"              
              },
              ticks: {
                display: !this.mobile,                
                fontColor: "#fff"
              }
            }
          ],
          yAxes: [
            {
              gridLines: {
                display:false
              },
              scaleLabel: {
                display: false,
                labelString: "ESS",
                fontFamily: "Montserrat",
                fontColor: "#fff",
                fontSize: "16"
              },
              ticks: {
                display: false,
                min: 0,
                max: 11,
                //stepSize: 8,
                fontColor: "#fff"
              }
            }
          ]
        },
        tooltips: {
          enabled: true,
          callbacks: {
            label: function(tooltipItem, data) {
              return (
                " " +
                data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]
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
      this.data.forEach(scope => {
        labels = labels.concat(
          scope.capacities.map(s => {
            return s.text
          })
        );
      });
      let datasetData = [];
      this.data.forEach(scope => {
        datasetData = datasetData.concat(
          scope.capacities.map(capacity => { return capacity.result ? capacity.result : 0 })
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
      let values = this.data.capacities.map(c => {
        return c.result != null ? c.result : 0        
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
