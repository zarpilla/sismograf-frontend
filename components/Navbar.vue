<template>
<div class="navbar navbar-light">  
  <nuxt-link :to="localePath('/')" class="navbar-brand" v-t="'el-sismograf'">
  </nuxt-link>  
  <div class="navbar-start">
    <div class="navbar-item has-dropdown is-hoverable" v-if="isAuthenticated">
      <!-- <a class="navbar-link">
        {{ loggedInUser.username }}
      </a> -->
       <a class="button" href="#logout" @click="logout">Logout</a>
    </div>
    <div class="navbar-item has-dropdown is-hoverable" v-if="!isAuthenticated">
      <nuxt-link class="button is-light" to="/login">
        Log in
        </nuxt-link>
    </div>
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
 <style lang="scss">
 .navbar {
  background: #f3c857!important;
  color: #020034;
  font-weight: 900;
  font-size: 15px;
  line-height: 19px;
  letter-spacing: 2px;
  text-transform: uppercase;
 }
 
 </style>