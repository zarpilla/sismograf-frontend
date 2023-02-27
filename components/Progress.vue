<template>
  <div class="progress-div-container">
    <!-- <div class="progress-div">
      <div class="progress-legend">
        {{ di + 1 }} / {{ template.attributes.domains.length }}
      </div>
      <vue-ellipse-progress
        color="#333"
        :progress="((di + 1) / template.attributes.domains.length) * 100"
        :thickness="4"
        :size="100"
        :legend="false"
      >
      </vue-ellipse-progress>
    </div>

    <div class="progress-div">
      <div class="progress-legend">
        {{ pi + 1 }} / {{ domain.principles.length }}
      </div>
      <vue-ellipse-progress
        color="#333"
        :progress="((pi + 1) / domain.principles.length) * 100"
        :thickness="4"
        :size="100"
        :legend="false"
      >
      </vue-ellipse-progress>
    </div> -->

    <div class="progress-div">
      <div class="progress-legend">
        {{ ppi + 1 }}/{{ principle.patterns.length }}
      </div>
      <vue-ellipse-progress
        :color="colors"
        :progress="((ppi + 1) / principle.patterns.length) * 100"
        :thickness="4"
        :size="62"
        :legend="false"
      >
      </vue-ellipse-progress>
    </div>
  </div>
</template>
  <script>
export default {
  data() {
    return {
      src: "",
    };
  },
  props: {
    template: Object,
    domain: Object,
    principle: Object,
    di: Number,
    pi: Number,
    ppi: Number,
  },
  created() {
    this.$nuxt.$on("logo-changed", (src) => {
      this.src = src;
    });
  },
  computed: {
    colors() {
      if (this.di === 0) {
        return  "#67A0B9";
      }
      if (this.di === 1) {
        return "#98D2C6"
      }
      if (this.di === 2) {
        return "#E87A70"
      }

      return "#C58983"
    }
  }
  // mounted() {
  //   this.$nuxt.$on('logo-changed', (src) => {
  //     console.log('logo-changed 1 src', src)
  //   })
  // },
};
</script>
  
<style>
.progress-div-container {
  position: absolute;
  /* pointer-events: none; */
  top: 50px;
}
.progress-legend {
  position: absolute;
  top: 24px;
  width: 100%;
  text-align: center;
  font-weight: 800;
  font-size: 15px;
  line-height: 19px;
  text-align: center;
  letter-spacing: 4px;
}


@media (max-width: 1024px)  {
  .progress-div-container {
  display: none;
  }
}
</style>
  