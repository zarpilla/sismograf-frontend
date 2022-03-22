<template>
  <section class="section container-fluid">
    <!-- <div class="container">
      <h2 class="title">My Profile</h2>
      <div class="content">
        <p>
          <strong>Username:</strong>
          {{ loggedInUser.username }}
        </p>
        <p>
          <strong>Email:</strong>
          {{ loggedInUser.email }}
        </p>
      </div>
    </div> -->
    <h3>Analyses</h3>
    <UserAnalysesList></UserAnalysesList>
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