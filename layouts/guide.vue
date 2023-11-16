<template>
  <div class="full-page-container" id="full-page-container">
    <div class="fake-container">
      <div class="xalign">
        <nuxt />
      </div>
    </div>
    <!-- <div class="zfooter">
      <Footer layout="guide"></Footer>
    </div> -->
  </div>
</template>
<script>
import Footer from "~/components/Footer";

export default {
  components: {
    Footer,
  },
  head() {
    return {
      title:
        this.application &&
        this.application.attributes &&
        this.application.attributes.name
          ? this.application.attributes.name
          : process.env.TITLE,
    };
  },
  data() {
    return {
      application: null,
    };
  },
  async fetch() {
    var { data } = await this.$axios.get(
      `/applications?filters[slug][$eq]=${process.env.application}-${this.$i18n.locale}&populate=footer&populate=footer.logo1&populate=footer.logo2&populate=footer.logo3&populate=guide_more_image&locale=${this.$i18n.locale}&populate=guide_template`,
      {}
    );
    this.application = data.data[0];

    this.$store.commit("app/set", data.data[0]);
  },
  fetchOnServer: true,
};
</script>
<style>
.navbar-abs {
  position: absolute;
  z-index: 10;
}
.navbar-abs img {
  margin-top: 5px;
  margin-left: 5px;
}
.full-page-container {
  background: #fbf7eb;
  min-height: 100vh;
}

.bg01 {
  background: #fbf7eb url("~@/assets/images/bg01_1920.png") no-repeat top center;
}

.bg02 {
  background: #fbf7eb url("~@/assets/images/bg02_1920.png") no-repeat top center;
}
.bgnone {
  background: #fbf7eb;
}
.xalign {
  color: #020034;
  padding-bottom: 120px;
}
h6 {
  font-weight: 300!important;
  font-size: 24px!important;
  line-height: 28px!important;
  margin-bottom: 2rem!important;
}

@media (max-width: 1024px) {
  .xalign {
    padding-bottom: 2rem;
  }
}

ul.capacities-list {
  list-style-type: none;
  padding: 0;
  text-align: left;
  margin-top: 2rem;
  padding-bottom: 3rem;
}
ul.labels-list {
  margin-top: 1rem;
  margin-bottom: 0rem;
}
ul.label-categories-list > li {
  display: block !important;
}
ul.capacities-list > li {
  display: block;
  margin: 0 10px;
}
ul.capacities-list.capacities-list-inline {
  text-align: center;
}
ul.capacities-list.capacities-list-inline > li {
  display: inline-block;
}
ul.capacities-list li .active {
  background: #f3c857;
}
.scope.title {
  font-weight: 700;
  font-size: 40px;
  line-height: 40px;
  text-align: center;
  width: 75%;
  margin: 0 auto;
  margin-top: 100px;
}
.scope.title.more-title {
  margin-top: 0px;
}
.principle-title {
  font-weight: 700;
  font-size: 50px;
  line-height: 50px;
  text-align: left;
  color: #020034;
  position: absolute;
  top: 80px;
  left: 4rem;
}
.domain-number {
  font-weight: 700;
  font-size: 40px;
  line-height: 40px;
  color: #f3c857;
}
.domain-name {
  font-weight: 700;
  font-size: 40px;
  line-height: 40px;
  color: #020034;
}
.domain-name a {
  color: #020034 !important;
  text-decoration: none !important;
}
.principles-list {
  margin-top: 30px;
}
.principles-list .principle-row {
  display: block;
}
.principles-list .principle {
  padding: 0.8rem 1.8rem 0.8rem 1.8rem;
  border: 2px solid #020034;
  border-radius: 25px;
  margin-bottom: 0.5rem;
  display: inline-block;
}
.domain-quadrant.inactive .principles-list {
  visibility: hidden;
}
.domain-quadrant.inactive:hover .principles-list {
  visibility: inherit;
}
.label {
  padding-right: 6px;
  display: block;
}
.text-analysis {
  position: relative;
}
.warning {
  font-size: 50px !important;
  left: -30px;
}
.alert-container {
  position: relative;
}
.alert-white {
  background: #fff;
  color: #1f1f1f;
  position: absolute;
  width: 100%;
}
.breadcrumb-sismo {
  position: absolute;
  top: 2.5rem;
  left: 3rem;
  width: calc(100% - 10vw);
  background: transparent;
  text-align: left;
}
.breadcrumb-sismo a {
  color: #020034;
}
.breadcrumb-sismo span {
  padding: 0 0.5rem;
}
.multiple,
.label-category {
  text-align: center;
}
textarea.comment {
  height: 350px;
  background: #eee;
  border: 1px solid #ddd;
}
textarea.comment-more {
  height: 150px;
}

.btn-secondary:not(:disabled):not(.disabled).active {
  background: hsl(48, 100%, 67%);
  border-color: hsl(48, 100%, 67%);
  color: #333;
}
.index {
  list-style: none;
  padding: 0;
}
.index .index-item {
  padding-bottom: 0.5rem;
}
.index .index-item a {
  color: #fff;
  font-size: 28px;
}
.index .index-item a.domain {
  color: #fff;
  font-size: 38px;
}
.index .index-item a:hover {
  text-decoration: underline;
}
.progress-div-container {
  position: absolute;
  top: 50px;
  right: 2rem;
}
.progress-div {
  position: relative;
  width: 100px;
  text-align: center;
}
.progress-legend {
  position: absolute;
  top: 60px;
  width: 100px;
  text-align: center;
  font-weight: bold;
}
.domain-quadrant {
}
.domain-quadrant-inner {
}
.domain-quadrant.inactive {
  opacity: 0.2;
}
.equal {
  display: flex;
  display: -webkit-flex;
  flex-wrap: wrap;
}
a.disabled {
  cursor: default;
}
@media (min-width: 768px) {
  .row.equal {
    display: flex;
    flex-wrap: wrap;
  }
}
a.principle {
  font-weight: 500;
  font-size: 17px;
  line-height: 19px;
  color: #020034;
  text-decoration: none;
}
.principle > div {
  background: rgb(74, 143, 173);
  border-radius: 25px;
  padding: 1rem;
}

.button-3 {
  margin-bottom: 1rem;
}

.action-buttons button,
.action-buttons a {
  background: none;
  border: 0;
  outline: none;
  padding: 0 0 0 0;
}
.comment-title {
  font-weight: 700;
  font-size: 30px;
  line-height: 30px;
}
.title-view {
  padding-bottom: 40vh;
}
.email-field span.label {
  font-weight: 400;
  font-size: 25px;
  line-height: 30px;
  letter-spacing: 0.02em;
  display: block;
  margin-bottom: 0.5rem;
}
.email-field input {
  background: #fff;
  border: 0;
  border-radius: 0;
  padding: 0.5rem 0.5rem;
  font-weight: 900;
  font-size: 15px;
  line-height: 19px;
  color: #020034;
  margin-bottom: 2.5rem;
}
.email-field input:hover,
.email-field input:focus,
.email-field input:active {
  outline: none;
  box-shadow: none;
}
.email-field input::placeholder {
  color: #d9d9d9;
  text-transform: uppercase;
}

.open-response .form-control {
  border: 0;
  border-radius: 0;
  background: #fff;
  color: #020034;
  padding: 0.5rem 0.5rem;
  font-weight: 900;
  font-size: 15px;
  line-height: 19px;
}

.text-description {
  font-weight: 500;
  font-size: 17px;
  line-height: 21px;
  margin-top: 2vh;
  margin-bottom: 10vh;
}
.sismo-title {
  font-weight: 700;
  font-size: 60px;
  line-height: 70px;
  margin-bottom: 1rem;
}
.sismo-text {
  font-weight: 900;
  font-size: 15px;
  line-height: 19px;
  text-align: center;
  letter-spacing: 2px;
  text-transform: uppercase;
}
.sismo-question {
  font-weight: 700;
  font-size: 50px;
  line-height: 50px;
  text-align: center;
  margin-top: 10vh;
}
.punts {
  background: url("~@/assets/images/punts.svg") no-repeat bottom center;
  height: 50px;
}

.bg01 {
  background: #fbf7eb url("~@/assets/images/bg01_1920.png") no-repeat top center;
}
.mini-breadcrumb {
  font-weight: 900;
  font-size: 15px;
  line-height: 19px;
  text-align: center;
  letter-spacing: 2px;
  text-transform: uppercase;
  padding-bottom: 1rem;
}
.principle-check {
  vertical-align: -7px;
}
.exit-link {
  cursor: pointer;
}

@media (min-width: 769px) and (max-height: 750px) {
  ul.capacities-list > li {
    display: inline-block;
  }
}
@media (max-width: 768px) {
  .bg01 {
    background: #fbf7eb url("~@/assets/images/bg01_1920.png") no-repeat top
      center;
    background: inherit;
  }
  .scope {
    font-size: 30px;
    padding-top: 3.5rem;
    line-height: 30px;
  }
  .btn-sismograf {
    padding: 4px 20px;
    font-size: 14px;
    margin-bottom: 10px;
  }
  .progress-div-container,
  .breadcrumb-sismo {
    display: none;
  }
  .principle.col-4 {
    display: none;
  }
  .domain-desc {
    font-size: 1.3rem;
  }
  .domain-name {
    font-size: 1rem;
  }
  .domain-quadrant {
    margin: 0.3rem;
  }
  /* .domain-quadrant.inactive {
      display: none;
    } */
  .domain-quadrant.inactive {
    opacity: 0.4;
  }
  .domain-quadrant.inactive .principles-list {
    visibility: visible;
  }
  .domain-quadrant-inner {
    padding: 0.5rem;
  }
  .scope.title {
    width: 100%;
  }
  .how-it-works h2 {
    margin-top: 3rem;
    position: relative;
  }
  .principle-title {
    top: inherit !important;
    position: relative;
    padding-bottom: 3rem;
    padding-top: 3rem;
  }
  .title-view {
    padding-bottom: 4rem;
  }
  textarea.comment {
    height: 35vh;
  }
}
@media (max-width: 1024px) {
  .sismo-title {
    font-size: 9.1vw;
    line-height: 12.61666666666667vw;
  }
  .sismo-question {
    font-size: 7.58333333333333vw;
    line-height: 7.58333333333333vw;
  }
  .domain-number,
  .domain-name {
    font-size: 7.06666666666667vw;
    line-height: 7.06666666666667vw;
  }
  .scope.title {
    font-size: 7.06666666666667vw;
    line-height: 7.06666666666667vw;
    margin-top: 50px;
    padding-top: 0;
  }
  .principle-title {
    font-size: 7.58333333333333vw;
    line-height: 7.58333333333333vw;
    top: 50px;
    left: 15px;
  }
  .principles-list .principle {
    padding: 1.7vw 3vw;
    display: inline-block;
  }
  a.principle {
    font-size: 4vw;
    line-height: 4.281666666666667vw;
  }
  .email-field span.label {
    font-size: 4.39166666666667vw;
    line-height: 4.55vw;
  }
  ul.capacities-list > li {
    margin: 0;
  }

  ul.capacities-list > li .button {
    width: 100%;
  }
  .button-3 {
    margin-bottom: 8px;
  }
  .section {
    height: auto !important;
  }
  /* .fp-tableCell {
      height: auto !important;
      display: flex;
    } */
}

@media (min-width: 1025px) and (max-width: 1919px) {
  .sismo-title {
    font-size: 3.1vw;
    line-height: 3.61666666666667vw;
  }
  .sismo-question {
    font-size: 2.58333333333333vw;
    line-height: 2.58333333333333vw;
  }
  .domain-number,
  .domain-name {
    font-size: 2.06666666666667vw;
    line-height: 2.06666666666667vw;
  }
  .scope.title {
    font-size: 2.06666666666667vw;
    line-height: 2.06666666666667vw;
    margin-top: 8vw;
  }
  .scope.title.more-title {
    margin-top: 0vw;
  }

  .principle-title {
    font-size: 2.58333333333333vw;
    line-height: 2.58333333333333vw;
    top: 4.14vw;
    left: 3rem;
  }
  .principles-list .principle {
    padding: 0.413333333333333vw 1.488vw 0.413333333333333vw 1.488vw;
  }
  a.principle {
    font-size: 1vw;
    line-height: 1.281666666666667vw;
  }
  .email-field span.label {
    font-size: 1.39166666666667vw;
    line-height: 1.55vw;
  }
}
#fp-nav ul li, .fp-slidesNav ul li{
  width: calc(100vw / 5);
}
#fp-nav ul li a:not(.active) span, .fp-slidesNav ul li a:not(.active) span{
  width: calc(100vw / 5);
}
</style>