<template>
  <div class="fullpage-container">
    <full-page ref="fullpage" :options="options" id="fullpage">
      <div class="section section-bg-dark">
        <div class="title">
          {{ title }}
        </div>
        <div class="description" v-if="description" v-html="$md.render(description)"></div>
        <div class="next-container text-center">
          <button class="btn btn-sismograf btn-next" @click="next">
            <span v-t="'Empezar'" />
            <font-awesome-icon :icon="fas.faLongArrowAltRight" />
          </button>
        </div>
      </div>

      <template v-for="scope in template.analysis.scopes">
        <div v-bind:key="scope.id" class="section">
          <div class="title">
            {{ scope.text }}
          </div>
          <div class="next-container text-center">
            <button class="btn btn-sismograf btn-next" @click="next">
              <span v-t="'Siguiente'" />
              <font-awesome-icon :icon="fas.faLongArrowAltRight" />
            </button>
          </div>
        </div>

        <template
          v-for="capacity in scope.capacities"
          class="zis-hidden-widescreen"
        >
          <div v-bind:key="capacity.id" class="section scope-capacity">
            <div class="title">
              {{ scope.text }}
            </div>
            <div class="scope">
              {{ capacity.text }}
            </div>
            <div class="next-container text-center">
              <button class="btn btn-sismograf btn-next" @click="next">
                <span v-t="'Siguiente'" />
                <font-awesome-icon :icon="fas.faLongArrowAltRight" />
              </button>
            </div>
          </div>
          <template
            v-for="question in capacity.questions"
            class="zis-hidden-widescreen"
          >
            <div v-bind:key="question.id" class="section">
              <div class="title">
                {{ scope.text }}
              </div>
              <div class="scope">
                {{ capacity.text }}
              </div>
              <div class="scope question">
                {{ question.text }}
              </div>
              <ul class="capacities-list">
                <li
                  class="item"
                  v-for="item in question.indicators"
                  v-bind:key="item.id"
                >
                  <div
                    v-on:click="punctuation(scope, capacity, question, item)"
                    class="btn btn-sismograf"
                    v-bind:class="{ active: question.result == item.value }"
                  >
                    {{ item.text }}
                  </div>
                </li>
              </ul>
            </div>
          </template>
        </template>
      </template>

      <div class="section" v-if="!mobile && !tablet">
        <div class="title total">
          {{ total | float1 }} / {{ maxval }}
          <font-awesome-icon
            v-if="totaldev > 2 || totaldevg2 > 0.9 || warntotaldevg"
            :icon="fas.faExclamationCircle"
            class="warning text-warning"
          />
        </div>
        <div class="text-center text-analysis">
          <div v-if="totaldev > 2" v-t="'Desequilibri entre àmbits'"></div>
          <div
            v-if="totaldevg2 > 0.9"
            v-t="'Desequilibri dins dels àmbits'"
          ></div>
          <div
            v-else-if="warntotaldevg"
            v-t="'Desequilibri dins dels àmbits.'"
          ></div>
        </div>

        <div class="zrow">
          <CLine
            :data="template.analysis.scopes"
            :mobile="mobile || tablet"
            class="zcolumn"
          ></CLine>
        </div>

        <div class="row">
          <div
            v-for="(scope, i) in template.analysis.scopes"
            v-bind:key="scope.id"
            class="col-md-3 text-center mt-5"
          >
            <div class="scope-title">
              {{ scope.text }}
            </div>
            <h3 class="scope-title text-white">
              {{ scopeMeans[i] | float1 }} / 8
            </h3>
            <radar :data="scope" />
          </div>
        </div>
        <div class="next-container text-center">
          <button class="btn btn-sismograf btn-next" @click="next">
            <span v-t="'Continuar'" />
            <font-awesome-icon :icon="fas.faLongArrowAltRight" />
          </button>
        </div>
      </div>

      <div class="section" v-if="mobile || tablet">
        <div class="title total">
          TOTAL
          <br />
          {{ total | float1 }} / {{ maxval }}
        </div>
        <CLine
          :data="template.analysis.scopes"
          :mobile="mobile || tablet"
          class="column"
        ></CLine>
      </div>
      <template v-if="mobile || tablet">
        <div
          class="section"
          v-for="(scope, i) in template.analysis.scopes"
          v-bind:key="i"
        >
          <radar :data="scope" :mobile="mobile || tablet" />
        </div>
      </template>

      <div class="section">
        <div class="title total">
          <span v-t="'Guardar anàlisi'" />
        </div>
        <div class="row text-center mt-5">
          <div class="col-md">
            <span class="label" v-t="'Email'"></span>
            <input type="text" v-model="analysis.email" name="email" />
          </div>
          <div class="col-md">
            <span class="label" v-t="'Organització'"></span>
            <input
              type="text"
              v-model="analysis.organization"
              name="organization"
            />
          </div>
          <div class="col-md">
            <span class="label" v-t="'Projecte'"></span>
            <input type="text" v-model="analysis.project" name="project" />
          </div>
          <div class="col-md">
            <span class="label" v-t="'Regió'"></span>
            <input type="text" v-model="analysis.region" name="region" />
          </div>
          <div class="col-md">
            <span class="label" v-t="'Àmbit'"></span>
            <input type="text" v-model="analysis.scope" name="scope" />
          </div>
        </div>
        <div class="next-container text-center mt-5">
          <button
            class="btn btn-sismograf btn-next"
            @click="save"
            v-bind:disabled="!validForm"
          >
            <span v-t="'Guardar'" />
            <font-awesome-icon :icon="fas.faLongArrowAltRight" />
          </button>
          <br />
          <button
            class="btn btn-sismograf btn-next"
            @click="saveNew"
            v-bind:disabled="!validForm"
            v-if="analysis.uid !== ''"
          >
            <span v-t="'Guardar nova versió'" />
            <font-awesome-icon :icon="fas.faLongArrowAltRight" />
          </button>
          <div class="alert-container mt-3">
            <fade-transition>
              <div
                v-if="show"
                class="alert alert-white"
                v-t="'Guardat correctament'"
              ></div>
            </fade-transition>
          </div>
        </div>
      </div>
    </full-page>
  </div>
</template>

<script>
import Radar from "~/components/Radar";
import CLine from "~/components/CLine";
import FadeTransition from "~/components/FadeTransition";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { v4 as uuidv4 } from "uuid";

export default {
  layout: "full",
  head() {
    return {
      title: `${this.title} | Resilience Earth`,
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: "description",
          name: "description",
          content: this.description,
        },
        {
          hid: "og:title",
          name: "og:title",
          content: this.title,
        },
        {
          hid: "og:description",
          name: "og:description",
          content: this.description,
        },
        {
          hid: "og:image",
          name: "og:image",
          content: require("~/assets/resilience_earth.svg"),
        },
      ],
    };
  },
  data() {
    return {
      template: {},
      slug: "",
      mobile: false,
      tablet: false,
      show: false,
      options: {
        scrollOverflow: false,
        licenseKey: "7C5A62B9-9F4349E0-A45C66A1-437BB3A2",
        menu: "#menu",
        //anchors: ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8', 'p9', 'p10', 'p11', 'p12', 'p13', 'p14', 'p15', 'p16', 'p17', 'p18', 'p19', 'p20', 'p21', 'p22', 'p23', 'p24', 'p25'],
        sectionsColor: [
          "#55AFB8",
          "#394335",
          "#4A8FAD",
          "#EBCBC1",
          "#DB8077",
          "#394335",
          "#4A8FAD",
          "#EBCBC1",
          "#DB8077",
          "#394335",
          "#4A8FAD",
          "#EBCBC1",
          "#DB8077",
          "#394335",
          "#4A8FAD",
          "#EBCBC1",
          "#DB8077",
          "#55AFB8",
          "#55AFB8",
          "#55AFB8",
          "#55AFB8",
          "#55AFB8",
          "#55AFB8",
          "#1f1f1f",
        ],
        navigation: true,
      },
      //results: [],
      analysis: {
        id: 0,
        email: "",
        organization: "",
        project: "",
        region: "",
        scope: "",
        language: "",
        results: [],
        template: 0,
        uid: "",
      },
    };
  },
  computed: {
    title() {
      return this.template.analysis.name;
    },
    description() {
      return this.template.analysis.description;
    },
    // sectionsColorMore () {
    //   return this.sectionsColor.concat(this.sectionsColor).concat(this.sectionsColor).concat(this.sectionsColor).concat(this.sectionsColor).concat(this.sectionsColor)
    // },
    total: function () {
      let avg = 0;
      let count = 0;
      this.template.analysis.scopes.forEach((s) => {
        s.capacities.forEach((c) => {
          if (c.result) {
            avg = avg + c.result;
            count++;
          }
        });
      });
      return avg / count;
    },
    maxval: function () {
      let max = 0;
      this.template.analysis.scopes.forEach((s) => {
        s.capacities.forEach((c) => {
          c.indicators.forEach((i) => {
            if (i.value && max < i.value) {
              max = i.value;
            }
          });
        });
      });
      return max;
    },
    total2: function () {
      let avg = 0;
      let count = 0;
      this.template.analysis.scopes.forEach((s) => {
        let avg2 = 0;
        let count2 = 0;
        s.capacities.forEach((c) => {
          if (c.result) {
            avg2 = avg2 + c.result;
            count2++;
          }
        });
        avg = avg + avg2 / count2;
        count++;
      });
      return avg / count;
    },
    totaldev: function () {
      let array = [];
      this.template.analysis.scopes.forEach((s) => {
        s.capacities.forEach((c) => {
          if (c.result) {
            array.push(c.result);
          }
        });
      });

      return this.stddev(array);
    },
    totaldevg: function () {
      let devg = [];
      for (let s in this.template.analysis.scopes) {
        let array = [];
        let scope = this.template.analysis.scopes[s];
        for (let c in scope.capacities) {
          let capacity = scope.capacities[c];
          if (capacity.result) {
            array.push(capacity.result);
          }
        }
        devg.push(this.stddev(array));
      }
      return devg;
    },
    warntotaldevg: function () {
      return this.totaldevg.filter((t) => t > 2).length > 0;
    },
    totaldevg2: function () {
      return this.stddev(this.totaldevg);
    },
    scopeMeans: function () {
      let means = [];
      for (let s in this.template.analysis.scopes) {
        let array = [];
        let scope = this.template.analysis.scopes[s];
        for (let c in scope.capacities) {
          let capacity = scope.capacities[c];
          if (capacity.result) {
            array.push(capacity.result);
          }
        }
        means.push(this.$mean(array));
      }
      return means;
    },
    validEmail() {
      return this.validateEmail(this.analysis.email);
    },
    validForm() {
      return this.validEmail && this.analysis.organization != "";
    },
    fas() {
      return fas;
    },
  },

  async asyncData({ $axios, app, error, store }) {
    let slug = app.context.route.params.id;
    var { data } = await $axios.get(
      `/templates/?slug=${app.context.route.params.id}`
    );

    if (data.length == 0) {
      error({ statusCode: 404, message: "Page not found" });
    }

    let template = data[0];

    let analysis = {
      id: 0,
      email: "",
      organization: "",
      project: "",
      region: "",
      scope: "",
      language: "",
      results: [],
      template: template.id,
      uid: "",
    };

    if (app.context.route.query && app.context.route.query.r) {
      //console.log("app.context.route.query", app.context.route.query);
      var { data } = await $axios.get(
        `/analyses/?uid=${app.context.route.query.r}`
      );
      if (data.length > 0) {
        //console.log("analysis", JSON.parse(JSON.stringify(data[0])) );
        analysis.id = data[0].id;
        analysis.email = data[0].email;
        analysis.organization = data[0].organization;
        analysis.project = data[0].project;
        analysis.region = data[0].region;
        analysis.scope = data[0].scope;
        analysis.uid = data[0].uid;
        analysis.results = data[0].results;

        if (analysis.results.length > 0) {
          analysis.results.forEach((r) => {
            template.analysis.scopes.forEach((s) => {
              s.capacities.forEach((c) => {
                let question = c.questions.find((c) => c.id == r.question);
                if (question) {
                  question.result = r.result;

                  c.result = app.context.$mean(
                    c.questions
                      .filter((q) => q.result != null)
                      .map((q) => q.result)
                  );
                }
              });
            });
          });
        }
      }
    }

    // console.log("slug", slug)
    // console.log("template", template)
    // console.log("analysis", analysis)

    return {
      slug: slug,
      template: template,
      analysis: analysis,
    };
  },
  mounted() {
    this.mobile = window.innerWidth < 768;
    this.tablet =
      /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/.test(
        navigator.userAgent.toLowerCase()
      );
      let sectionsColor = this.options.sectionsColor
      sectionsColor = sectionsColor.concat(sectionsColor).concat(sectionsColor).concat(sectionsColor).concat(sectionsColor).concat(sectionsColor)
      this.options.sectionsColor = sectionsColor
  },
  methods: {
    next: () => {
      var s = fullpage_api.getActiveSection();
      fullpage_api.moveTo(s.index + 2);
    },
    punctuation: function (scope, capacity, question, item) {
      // let q0 = this.template.analysis.scopes
      //   .find(s => s.id == scope.id)
      //   .capacities.find(c => c.id == capacity.id)

      //   console.log('q0', q0)
      // console.log('this.template.analysis.scopes',this.template.analysis.scopes)

      let selectedQuestion = this.template.analysis.scopes
        .find((s) => s.id == scope.id)
        .capacities.find((c) => c.id == capacity.id)
        .questions.find((q) => q.id == question.id);

      selectedQuestion.result = item.value;

      let previousResult = this.analysis.results.find(
        (r) => r.question == question.id
      );
      if (!previousResult) {
        this.analysis.results.push({
          question: question.id,
          result: item.value,
        });
      } else {
        previousResult.result = item.value;
      }

      let selectedCapacity = this.template.analysis.scopes
        .find((s) => s.id == scope.id)
        .capacities.find((c) => c.id == capacity.id);

      selectedCapacity.result = this.$mean(
        selectedCapacity.questions
          .filter((q) => q.result != null)
          .map((q) => q.result)
      );

      //console.log("results", this.results);

      //selectedCapacity.selected = true;

      var s = fullpage_api.getActiveSection();

      fullpage_api.moveTo(s.index + 2);
    },
    allIsSelected() {
      let allSelected = true;
      this.template.analysis.scopes.forEach((s) => {
        s.capacities.forEach((c) => {
          let capacityIsSelected = c.result != null;
          allSelected = allSelected && capacityIsSelected;
        });
      });
      return allSelected;
    },
    async saveNew() {
      this.analysis.uid = "";
      this.save();
    },
    async save() {
      this.analysis.language = this.$i18n.locale;
      this.analysis.template = this.template.id;

      if (this.analysis.uid === "") {
        this.analysis.uid = uuidv4();
        var { data } = await this.$axios.post(
          `/analyses`,
          JSON.stringify(this.analysis),
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        this.analysis.id = data.id;
      } else {
        var { data } = await this.$axios.put(
          `/analyses/${this.analysis.id}`,
          JSON.stringify(this.analysis),
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      }

      this.$router.push(
        this.localePath({
          name: "analysis-id",
          params: this.slug,
          query: { r: this.analysis.uid },
        })
      );
      this.show = true;
      setTimeout(() => {
        this.show = false;
      }, 1500);
      // this.$router.push({
      //   path: `/analysis/${this.slug}?r=${this.analysis.uid}`
      // })

      //console.log("data", data);
    },
    // mean(array) {
    //   if (!array.length) return null
    //   const n = array.length
    //   const mean = array.reduce((a, b) => a + b) / n
    //   return mean
    // },
    stddev(array) {
      if (!array.length) return null;
      const n = array.length;
      const mean = array.reduce((a, b) => a + b) / n;
      return Math.sqrt(
        array.map((x) => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n
      );
    },
    validateEmail(email) {
      const re =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    },
  },
  filters: {
    float1(amount) {
      const amt = Number(amount);
      return (
        (amt && amt.toLocaleString(undefined, { maximumFractionDigits: 1 })) ||
        "0"
      );
    },
  },
};
</script>
<style scoped>
.section {
  padding: 0 5vw;
}

.title {
  text-align: center;
  font-size: 80px;
  font-weight: bold;
  color: #fff;
}
.description {
  color: #fff;
}

.section-bg-dark .title,
.section-bg-dark .description,
.section-bg-dark p {
  color: #eee;
}
.scope {
  text-align: center;
  font-size: 60px;
  color: #fff;
}
.question {
  text-align: center;
  font-size: 40px;
  color: #fff;
}
.sector {
  font-size: 30px;
  color: #fff;
  margin: 30px auto;
}
.btn-sismograf {
  border: 0;
  background: rgb(85, 175, 184);
  color: #fff;
  border-radius: 6px;
  padding: 10px 20px;
  font-size: 16px;
  margin-bottom: 15px;
  cursor: pointer;
  text-transform: capitalize;
}
.btn-next {
  background: #fff;
  color: #1f1f1f;
  margin-top: 2rem;
}
ul.capacities-list {
  list-style-type: none;
  padding: 0;
  text-align: center;
  margin-top: 2rem;
}
ul.capacities-list li {
  display: inline-block;
  margin: 0 10px;
}
ul.capacities-list li .active {
  background: #fff;
  color: #333;
}
.scope-title {
  font-size: 20px;
  color: #fff;
}
.label {
  color: #fff;
  padding-right: 6px;
}
.text-analysis {
  color: #fff;
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
.text-white {
  color: #fff !important;
}
</style>
<style>
#fp-nav ul li a span,
.fp-slidesNav ul li a span {
  background: #fff;
}
</style>