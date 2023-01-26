<template>
  <section class="section">
    <div class="z">
    </div>
  </section>
</template>
<script>
import _ from "lodash";
import { fas } from "@fortawesome/free-solid-svg-icons";

export default {
  data() {
    return {
      organizations: [],
      apiUrl: process.env.API_URL,
    };
  },
  computed: {},
  head() {
    return {};
  },
  middleware: ['organization'],
  created () {

  },
  methods: {
  },
};
</script>
<style scoped>
h2.title {
  color: #fff;
  text-align: center;
  font-size: 80px;
  font-weight: bold;
  text-decoration: none !important;
}
a:hover {
  text-decoration: none !important;
}
h3.title {
  color: #fff;
  font-size: 30px;
  text-decoration: none !important;
}
.more {
  font-size: 16px;
}

.btn-sismograf {
  border: 0;
  background: rgb(85, 175, 184);
  color: #333;

  background: #fff;
  color: #333;
  border-radius: 6px;
  padding: 10px 20px;
  font-size: 16px;
  margin-bottom: 15px;
  cursor: pointer;
  /* text-transform: capitalize; */
}
.org-img {
  margin-bottom: 2rem;
}
.org-img img {
  max-width: 100%;
  max-height: 150px;
}
</style>