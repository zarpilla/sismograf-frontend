<template>
  <section class="section text-left how-it-works">
    <div class="info-first" v-t="'si-es-el-primer-cop-t-expliquem-el-proces'"></div>
    <b-container class="works-container">
      <b-row>
        <b-col cols="12" md="4" order-md="1"></b-col>
        <b-col class="info-block" cols="12" md="4" order="1" order-md="2">
          <div class="num">01</div>
          <div class="title" v-t="'sel-lecciona-la-teva-opcio'">Sel·lecciona la teva opció</div>
          <div class="more" v-t="'podras-escollir-si-vols-diagnosticar-una-entitat-una-organitzacio-una-comunitat-o-un-projecte-personal'">
            Podràs escollir si vols diagnosticar una entitat, una organització,
            una comunitat o un projecte personal.
          </div>
        </b-col>
        <b-col cols="12" md="4" order-md="3"> </b-col>      
        <b-col class="info-block" cols="12" md="4" order="12" order-md="4">
          <div class="num">04</div>
          <div class="title" v-t="'es-hora-de-treballar'">És hora de treballar!</div>
          <div class="more" v-t="'en-funcio-del-teu-resultat-et-recomanarem-treballar-uns-ambits-o-altres-i-t-assessorarem-com-dur-ho-a-terme'">
            En funció del teu resultat et recomanarem treballar uns àmbits o
            altres, i t’assessorarem com dur-ho a terme.
          </div>
        </b-col>
        <b-col cols="12" md="4" order-md="5">
          <div class="granota"></div>
        </b-col>
        <b-col class="info-block" cols="12" md="4" order="6" order-md="6">
          <div class="num">02</div>
          <div class="title" v-t="'contesta-a-les-preguntes'">Contesta a les preguntes</div>
          <div class="more" v-t="'hauras-d-escollir-entre-les-diferents-respostes-proposades-i-podras-ampliar-les-amb-comentaris-podras-guardar-ho-i-seguir-en-un-altre-moment-si-ho-necessites'">
            Hauràs d’escollir entre les diferents respostes proposades i podràs
            ampliar-les amb comentaris. Podràs guardar-ho i seguir en un altre
            moment, si ho necessites.
          </div>
        </b-col>      
        <b-col cols="12" md="4" order-md="7"> </b-col>
        <b-col class="info-block" cols="12" md="4" order="9" order-md="8">
          <div class="num">03</div>
          <div class="title" v-t="'obtindras-el-diagnostic-al-final'">Obtindràs el diagnòstic al final</div>
          <div class="more" v-t="'al-final-del-queestionari-t-enviarem-el-diagnosi-on-veuras-en-quin-estat-es-troba-el-teu-projecte-organitzacio'">
            Al final del qüestionari t’enviarem el diagnosi on veuràs en quin
            estat es troba el teu projecte/organització.
          </div>
        </b-col>
        <b-col cols="12" md="4" order-md="9"> </b-col>
      </b-row>
    </b-container>
    <b-container class="buttons-container">
      <b-row>
        <b-col md="5" offset-md="7" class="buttons">
          <nuxt-link :to="localePath('/')" class="button button-2" v-t="'comencar-el-queestionari'">
          </nuxt-link>
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>
<script>
export default {
  mounted() {
    const el = document.getElementById("full-page-container");
    el.classList.add("bgnone");
    el.classList.remove("bg01");
    el.classList.remove("bg02");
  },
};
</script>
<style scoped lang="scss">

</style>