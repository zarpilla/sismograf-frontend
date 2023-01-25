<template>
  <div class="progress-div-container">
    <div class="progress-div">
      <div class="progress-legend">
        {{ di + 1 }} / {{ template.attributes.domains.length }}
      </div>
      <!-- <vue-ellipse-progress
        color="#333"
        :progress="((di + 1) / template.attributes.domains.length) * 100"
        :thickness="4"
        :size="100"
        :legend="false"
      >
      </vue-ellipse-progress> -->
    </div>

    <div class="progress-div">
      <div class="progress-legend">
        {{ pi + 1 }} / {{ domain.principles.length }}
      </div>
      <!-- <vue-ellipse-progress
        color="#333"
        :progress="((pi + 1) / domain.principles.length) * 100"
        :thickness="4"
        :size="100"
        :legend="false"
      >
      </vue-ellipse-progress> -->
    </div>

    <div class="progress-div">
      <div class="progress-legend">
        {{ ppi + 1 }} / {{ principle.patterns.length }}
      </div>
      <!-- <vue-ellipse-progress
        color="#333"
        :progress="((ppi + 1) / principle.patterns.length) * 100"
        :thickness="4"
        :size="100"
        :legend="false"
      >
      </vue-ellipse-progress> -->
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
    ppi: Number
  },
  created() {
    this.$nuxt.$on("logo-changed", (src) => {
      this.src = src;
    });
  },
  // mounted() {
  //   this.$nuxt.$on('logo-changed', (src) => {
  //     console.log('logo-changed 1 src', src)
  //   })
  // },
};
</script>
  
<style>
</style>
  