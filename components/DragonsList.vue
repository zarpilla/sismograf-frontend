<template>
  <div class="d-flex">
    <div class="dragons-list">
      <h4 v-t="'col-lectivisme'">Col·lectivisme</h4>
      <div class="dragon-name">
        <Dragon color="#3B4174"></Dragon>
        {{ levelsDisplay[0].name }}
      </div>
      <div class="dragon-name">
        <Dragon color="#508DA8"></Dragon>
        {{ levelsDisplay[1].name }}
      </div>
      <div class="dragon-name">
        <Dragon color="#76B3A8"></Dragon>
        {{ levelsDisplay[2].name }}
      </div>
      <h4 v-t="'individualisme'">Individualisme</h4>
      <div class="dragon-name">
        <Dragon color="#5F925F"></Dragon>
        {{ levelsDisplay[3].name }}
      </div>
      <div class="dragon-name">
        <Dragon color="#E1BB59"></Dragon>
        {{ levelsDisplay[4].name }}
      </div>
      <div class="dragon-name">
        <Dragon color="#DA8344"></Dragon>
        {{ levelsDisplay[5].name }}
      </div>
      <h4 v-t="'trauma'">Trauma</h4>
      <div class="dragon-name">
        <Dragon color="#CE542E"></Dragon>
        {{ levelsDisplay[6].name }}
      </div>
      <div class="dragon-name">
        <Dragon color="#A71F1F"></Dragon>
        {{ levelsDisplay[7].name }}
      </div>
    </div>
    <img src="~/assets/images/ellipses.svg" class="ellipses" />
  </div>
</template>
  
<script>
import { mapGetters } from "vuex";
import moment from "moment";
import ResilienceProgress from "./ResilienceProgress";
import _ from "lodash";
import * as d3 from "d3";

export default {
  name: "SummaryWeel",
  data() {
    return {
      apiUrl: process.env.apiUrl,      
    };
  },
  props: {
    levels: {
      type: Array,
      default: [],
    }
  },
  computed: {
    ...mapGetters(["isAuthenticated", "loggedInUser"]),
    levelsDisplay() {
      return _.reverse(
        _.uniqWith(
          this.levels.map((l) => {
            return { name: l.attributes.name, code: l.attributes.code };
          }),
          _.isEqual
        )
      );
    },
  }
};
</script>
<style lang="scss" scoped>
.dragons-list {
  h4 {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
}
.dragon-name {
  padding-bottom: 1.2rem;
  font-weight: 400;
  font-size: 18px;
  line-height: 24px;

  svg {
    vertical-align: -6px;
    margin-right: 0.5rem;
  }
}
</style>