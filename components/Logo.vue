<template>
  <span></span>
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
