<template>
  <div class="full-page-container" id="full-page-container">
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
  background: rgb(85, 175, 184);
  background: #fff;
  min-height: 100vh;
}
.xalign {
  background: #FFFCF3;
}
</style>