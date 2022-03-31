<template>
  <section class="section container-fluid">
    <!-- <h3>Analyses</h3> -->
    <div class="pt-2">
      <UserAnalysesList></UserAnalysesList>
    </div>
    
  </section>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  middleware: ["auth"],
  layout: 'admin',
  computed: {
    ...mapGetters(["loggedInUser"]),
  },
};
</script>