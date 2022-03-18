<template>
  <div class="admin">
    <Navbar />
    <nuxt />
  </div>
</template>

<script>
import Navbar from "~/components/Navbar";

export default {
  components: {
    Navbar,
  },
};
</script>
<style scoped>
.admin {
  background: rgb(85, 175, 184);
  background: #fff;
  min-height: 100vh;
}
</style>