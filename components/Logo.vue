<template>
  <span></span>
  <!-- <span v-if="src"> <img :src="src" alt="Resilience.earth" height="80">
  </span>
  <img v-else src="~assets/resilience_earth_w.svg" alt="Resilience.earth" height="80" /> -->
</template>
<script>
export default {
  data() {
    return {
      src: "",
    };
  },
  created () {
    this.$nuxt.$on('logo-changed', (src) => {
      this.src = src
    })
  },
  // mounted() {
  //   this.$nuxt.$on('logo-changed', (src) => {
  //     console.log('logo-changed 1 src', src)
  //   })
  // },
};
</script>

<style>
.NuxtLogo {
  animation: 1s appear;
  margin: auto;
}

@keyframes appear {
  0% {
    opacity: 0;
  }
}
</style>
