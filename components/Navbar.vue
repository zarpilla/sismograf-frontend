<template>
  <div class="navbar-start">
    <div class="navbar-item has-dropdown is-hoverable" v-if="isAuthenticated">
      <a class="navbar-link">
        {{ loggedInUser.username }}
      </a>
       <a class="navbar-item" @click="logout">Logout</a>
    </div>
    <div class="navbar-item has-dropdown is-hoverable" v-if="!isAuthenticated">
      <nuxt-link class="button is-light" to="/login">
        Log in
        </nuxt-link>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
 computed: {
 ...mapGetters(["isAuthenticated", "loggedInUser"]),
 },
 methods: {
 async logout() {
 await this.$auth.logout()
 }
 }
}
</script>
 