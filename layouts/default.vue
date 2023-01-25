<template>
  <div class="full-page-container" id="full-page-container">
    <div class="fake-container">
      <div class="xalign">
        <nuxt />
      </div>      
    </div>    
    <div class="footer">
      <Footer></Footer>
    </div>
  </div>
</template>
<script>
import Footer from "~/components/Footer";

export default {
  components: {
    Footer,
  },
  async created() {
    console.log('layout created')

    // var { data } = await this.$axios.get(
    //   `/applications?slug=${process.env.application}&populate=footer&populate=footer.logo1&populate=footer.logo2`,
    //   {}
    // );
    // console.log("created data", data);

    // var { data } = await this.$axios.get(
    //   `/texts?pagination[pageSize]=9999`,
    //   {}
    // );

    // this.$store.commit("texts/set", info);

    // console.log("created texts", data);
  },
  // async fetch() {
  //   var { data } = await this.$axios.get(
  //     `/applications?slug=${process.env.application}&populate=footer&populate=footer.logo1&populate=footer.logo2`,
  //     {}
  //   );
  //   console.log("data", data);

  //   this.footer = data.data[0];
  // },
  // fetchOnServer: true,
};
</script>
<style scoped>
.navbar-abs{
  position: absolute;
  z-index: 10;
}
.navbar-abs img{
  margin-top: 5px;
  margin-left: 5px;
}
.full-page-container{
  background: #FFFCF3;
  min-height: 100vh;
}

.bg01{  
  background: #FFFCF3 url('~@/assets/images/bg01_1920.png') no-repeat top center;
}

.bg02{  
  background: #FFFCF3 url('~@/assets/images/bg02_1920.png') no-repeat top center;
}
.bgnone{  
  background: #FFFCF3;
}
.xalign{  
  color:#020034;
  padding-bottom: 120px;
}
</style>