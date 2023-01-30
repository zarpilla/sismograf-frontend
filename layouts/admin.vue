<template>
  <div class="full-page-container admin" id="full-page-container">
    <Navbar />
    <div class="fake-container">
      <div class="xalign">
        <nuxt />
      </div>
    </div>    
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
  background: #FBF7EB;
  min-height: 100vh;
}
.xalign {
  background: #FBF7EB;
}
</style>