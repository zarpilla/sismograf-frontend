<template>
  <div class="analyses zcontainer-fluid">  
    <b-table hover :items="analyses" :fields="fields">
      <template #cell(resilienceLevel)="data">
        
        <b-progress-bar :value="( data.value * 14.29 - 14.29 )" :max="100" show-progress :variant="data.value < 2.5 ? 'danger' : (data.value < 5.5) ? 'warning' : 'success'">
          <span><b>{{ (data.value * 14.29 - 14.29).toFixed(0) }}%</b></span>
        </b-progress-bar>
        <!-- <b-progress-bar :value="data.value * (2.5 / 10)" variant="warning"></b-progress-bar>
        <b-progress-bar :value="data.value * (1.5 / 10)" variant="danger"></b-progress-bar> -->
      </template>
    </b-table>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
 computed: {
 ...mapGetters(["isAuthenticated", "loggedInUser"]),
 },
 data () {
   return {
     analyses: [],
     fields: ['uid', 'updatedAt', { key: 'template.data.attributes.name', label: 'Template' }, 'resilienceLevel']
   }
 },
 async fetch() {

   const headers = {
      headers: {
        Authorization: `Bearer ${process.env.API_TOKEN}`,
      },
    };
    console.log('context i18n', this.loggedInUser)
    var { data } = await this.$axios.get(
      `/analyses?populate[0]=template&filters[template][users][id][$eq]=${this.loggedInUser.id}}&sort=createdAt:desc`,
      headers
    );

    this.analyses = data.data.map(({id, ...more}) => { return {id, ...more.attributes } })
    // filteredTemplates = filteredTemplates.map(({users, ...keepAttrs}) => keepAttrs)
 },
 methods: { 
 }
}
</script>
<style scoped>
.progress-bar{
  border-radius: 4px;
  color: #222;
  font-size: 14px;
}
</style>