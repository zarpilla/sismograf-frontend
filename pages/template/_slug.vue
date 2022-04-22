<template>
  <div class="fullpage-container">
    <no-ssr>
      <full-page ref="fullpage" :options="options" id="fullpage">
        <!-- <div class="section section-bg-dark">
          <div class="title">
            {{ title }}
          </div>
          <div
            class="description text-center"
            v-if="description"
            v-html="$md.render(description)"
          ></div>
          <div class="next-container text-center">
            <button class="btn btn-sismograf btn-next" @click="next">
              <span v-t="'Start'" />
              <font-awesome-icon :icon="fas.faLongArrowAltRight" />
            </button>
          </div>
        </div> -->

        <template
          v-for="(labelCategory, lci) in template.attributes.label_categories
            .data"
        >
          <div v-bind:key="lci" class="section">
            <div class="label-category" v-t="'Select labels'"></div>
            <div
              class="zlabel-category title"
              v-if="
                template.attributes.labels.data.filter(
                  (l) =>
                    l.attributes.label_category.data.id === labelCategory.id
                ).length
              "
            >
              {{ labelCategory.attributes.name }}
            </div>

            <ul
              class="capacities-list labels-list"
              v-if="
                template.attributes.labels.data.filter(
                  (l) =>
                    l.attributes.label_category.data.id === labelCategory.id
                ).length
              "
            >
              <li
                class="item"
                v-for="label in template.attributes.labels.data.filter(
                  (l) =>
                    l.attributes.label_category.data.id === labelCategory.id
                )"
                v-bind:key="label.id"
              >
                <div
                  v-on:click="addLabel(label, labelCategory)"
                  class="btn btn-sismograf"
                  v-bind:class="{
                    active: isLabelActive(label),
                  }"
                >
                  {{ label.attributes.name }}
                </div>
              </li>
            </ul>

            <div
              class="open-response"
              v-if="labelCategory.attributes.openResponse === true"
            >
              <span class="label-category">{{
                labelCategory.attributes.openResponseText
              }}</span>
              <textarea
                class="form-control"
                type="text"
                @input="setLabelComments(labelCategory, $event)"
                name="organization"
              ></textarea>
            </div>

            <div class="next-container text-center">
              <button class="btn btn-sismograf btn-next" @click="next">
                <span v-t="'Next'" />
                <font-awesome-icon :icon="fas.faLongArrowAltRight" />
              </button>
            </div>
          </div>
        </template>

        <div class="section section-bg-dark">
          <div
            class="title"
            v-t="
              (questionnaire &&
                questionnaire.attributes &&
                questionnaire.attributes.domainsText) ||
              'Domains'
            "
          ></div>
          <div class="row">
            <div class="col-md-6 equal" v-for="i in template.attributes.domains.length" :key="i">
              <div class="domain-quadrant">
                <div class="domain-quadrant-inner" v-if="template.attributes.domains[i - 1]">
                  <div class="domain-name">
                    <a
                      :href="`#domain-${template.attributes.domains[i - 1].id}`"
                    >
                      {{ template.attributes.domains[i - 1].name }}
                    </a>
                  </div>
                  <div class="domain-desc">
                    <a
                      :href="`#domain-${template.attributes.domains[i - 1].id}`"
                    >
                      {{ template.attributes.domains[i - 1].description }}
                    </a>
                  </div>
                  <div class="row" v-if="questionnaire && questionnaire.attributes && questionnaire.attributes.showPrinciples !== false">
                    <div
                      class="zindex-item principle col-4 text-center"
                      v-for="principle in template.attributes.domains[i - 1]
                        .principles"
                      v-bind:key="principle.id"
                    >
                      <div>
                        {{ principle.name }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="next-container text-center">
            <button class="btn btn-sismograf btn-next" @click="next">
              <span v-t="'Next'" />
              <font-awesome-icon :icon="fas.faLongArrowAltRight" />
            </button>
          </div>
        </div>
        

        <template v-for="(domain, di) in template.attributes.domains">
          <div v-bind:key="domain.id" class="section">
            <div class="breadcrumb text-center">
              <a :href="`#init`" v-t="'Init'"></a>
              <span> > {{ domain.description }}</span>
            </div>
            <div
              class="title"
              v-t="
                (questionnaire &&
                  questionnaire.attributes &&
                  questionnaire.attributes.domainsText) ||
                'Domains'
              "
            ></div>
            <div class="row">
              <div
                class="col-md-6 equal"
                v-for="i in template.attributes.domains.length"
                :key="domain.id * 100 + i"
              >
                <div
                  class="domain-quadrant"
                  :class="di === i - 1 ? 'active' : 'inactive'"
                >
                  <div class="domain-quadrant-inner">
                    <div class="domain-name">
                      <a
                        :href="`#domain-${
                          template.attributes.domains[i - 1].id
                        }`"
                      >
                        {{ template.attributes.domains[i - 1].name }}
                      </a>
                    </div>
                    <div class="domain-desc">
                      <a
                        :href="`#domain-${
                          template.attributes.domains[i - 1].id
                        }`"
                      >
                        {{ template.attributes.domains[i - 1].description }}
                      </a>
                    </div>
                    <div class="row" v-if="questionnaire && questionnaire.attributes && questionnaire.attributes.showPrinciples !== false">
                      <div
                        class="zindex-item principle col-4 text-center"
                        v-for="principle in template.attributes.domains[i - 1]
                          .principles"
                        v-bind:key="principle.id"
                      >
                        <div>
                          {{ principle.name }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="progress-div-container">
              <div class="progress-div">
                <div class="progress-title" v-t="'Domains'"></div>
                <div class="progress-legend">
                  {{ di + 1 }} / {{ template.attributes.domains.length }}
                </div>
                <vue-ellipse-progress
                  color="#333"
                  :progress="
                    ((di + 1) / template.attributes.domains.length) * 100
                  "
                  :thickness="4"
                  :size="100"
                  :legend="false"
                >
                </vue-ellipse-progress>
              </div>
            </div>
            <div class="next-container text-center">
              <button class="btn btn-sismograf btn-next" @click="next">
                <span v-t="'Next'" />
                <font-awesome-icon :icon="fas.faLongArrowAltRight" />
              </button>
            </div>

            <div
              class="next-container text-center"
              v-if="
                questionnaire &&
                questionnaire.attributes &&
                questionnaire.attributes.domainsMustBeCompleted === false
              "
            >
              <button class="btn btn-sismograf btn-next" @click="goToEnd">
                <span v-t="'Acabar'" />
                <font-awesome-icon :icon="fas.faLongArrowAltRight" />
              </button>
            </div>
          </div>

          <template
            v-for="(principle, pi) in domain.principles"
            class="zis-hidden-widescreen"
          >
            <template
              v-for="(pattern, ppi) in principle.patterns"
              class="zis-hidden-widescreen"
            >
              <template
                v-for="(indicator, ii) in pattern.indicators"
                class="zis-hidden-widescreen"
              >
                <div v-bind:key="indicator.id" class="section">
                  <div class="progress-div-container">
                    <div class="progress-div">
                      <div class="progress-title" v-t="'Domains'"></div>
                      <div class="progress-legend">
                        {{ di + 1 }} / {{ template.attributes.domains.length }}
                      </div>
                      <vue-ellipse-progress
                        color="#333"
                        :progress="
                          ((di + 1) / template.attributes.domains.length) * 100
                        "
                        :thickness="4"
                        :size="100"
                        :legend="false"
                      >
                      </vue-ellipse-progress>
                    </div>

                    <div class="progress-div">
                      <div class="progress-title" v-t="'Principles'"></div>
                      <div class="progress-legend">
                        {{ pi + 1 }} / {{ domain.principles.length }}
                      </div>
                      <vue-ellipse-progress
                        color="#333"
                        :progress="((pi + 1) / domain.principles.length) * 100"
                        :thickness="4"
                        :size="100"
                        :legend="false"
                      >
                      </vue-ellipse-progress>
                    </div>

                    <div class="progress-div">
                      <div class="progress-title" v-t="'Indicators'"></div>
                      <div class="progress-legend">
                        {{ ppi + 1 }} / {{ principle.patterns.length }}
                      </div>
                      <vue-ellipse-progress
                        color="#333"
                        :progress="
                          ((ppi + 1) / principle.patterns.length) * 100
                        "
                        :thickness="4"
                        :size="100"
                        :legend="false"
                      >
                      </vue-ellipse-progress>
                    </div>
                  </div>

                  <div class="breadcrumb text-center">
                    <a :href="`#init`" v-t="'Init'"></a>
                    <span> > </span>
                    <a :href="`#domain-${domain.id}`">{{
                      domain.description
                    }}</a>
                    <span> > </span>
                    <a :href="`#principle-${principle.id}`">{{
                      principle.name
                    }}</a>
                    <span> > {{ pattern.name }}</span>
                  </div>
                  <div class="scope title indicator">
                    {{ indicator.question }}
                  </div>
                  <div
                    class="text-center indicator multiple"
                    v-if="indicator.max > 1"
                  >
                    <span>(màx. {{ indicator.max }} opcions)</span>
                  </div>

                  <ul class="capacities-list">
                    <li
                      class="item"
                      v-for="option in indicator.indicator_options"
                      v-bind:key="option.id"
                    >
                      <div
                        v-on:click="punctuation('results', indicator, option)"
                        class="btn btn-sismograf"
                        v-bind:class="{
                          active: isOptionActive('results', indicator, option),
                        }"
                      >
                        {{ option.name }}
                      </div>
                    </li>
                  </ul>

                  <div class="next-container text-center">
                    <button class="btn btn-sismograf btn-next" @click="next">
                      <span v-t="'Next'" />
                      <font-awesome-icon :icon="fas.faLongArrowAltRight" />
                    </button>
                  </div>

                  <b-button
                    id="show-btn"
                    class="btn-sismograf"
                    v-bind:class="{
                      active: isCommentActive(indicator),
                    }"
                    @click="showModal(indicator)"
                  >
                    <font-awesome-icon :icon="fas.faComment" />
                  </b-button>
                </div>
              </template>
            </template>
          </template>
        </template>

        <b-modal
          size="lg"
          centered
          ref="my-modal"
          :title="commentIndicator ? commentIndicator.question : ''"
        >
          <div class="d-block text-center">
            <textarea class="form-control comment" v-model="comment">
            </textarea>
          </div>

          <template #modal-footer>
            <b-button class="mt-3 btn-primary" @click="cancelModal"
              >Cancelar</b-button
            >
            <b-button class="mt-3 btn-success" @click="hideModal"
              v-t="'Save'"></b-button
            >
          </template>
        </b-modal>

        <template v-for="(block, bi) in questionnaire.attributes.moreBlocks">
          <div class="section" :key="bi">
            <div class="title">
              <span v-t="block.title" />
            </div>

            <div class="next-container text-center">
              <button class="btn btn-sismograf btn-next" @click="next">
                <span v-t="'Next'" />
                <font-awesome-icon :icon="fas.faLongArrowAltRight" />
              </button>
            </div>
          </div>

          <template v-for="(ind, indi) in block.indicators.data" class="z">
            <div class="section" :key="indi">
              <div class="label-category">
                <span v-t="block.title" />
              </div>
              <div class="scope title indicator">
                <span v-t="ind.attributes.question" />
              </div>
              <ul class="capacities-list">
                <li
                  class="item"
                  v-for="option in ind.attributes.indicator_options"
                  v-bind:key="option.id"
                >
                  <div
                    v-on:click="punctuation('more', ind, option)"
                    class="btn btn-sismograf"
                    v-bind:class="{
                      active: isOptionActive('more', ind, option),
                    }"
                  >
                    {{ option.name }}
                  </div>
                </li>
              </ul>

              <div v-if="ind.attributes.indicator_options.length === 0">
                <textarea
                  class="form-control"
                  type="text"
                  @input="setMoreComments(ind, $event)"
                  name="organization"
                ></textarea>
              </div>

              <!-- <b-button
                    id="show-btn"
                    class="btn-sismograf"
                    v-bind:class="{
                      active: isCommentActive(ind),
                    }"
                    @click="showModal(ind)"
                  >
                    <font-awesome-icon :icon="fas.faComment" />
                  </b-button> -->

              <div class="next-container text-center">
                <button class="btn btn-sismograf btn-next" @click="next">
                  <span v-t="'Next'" />
                  <font-awesome-icon :icon="fas.faLongArrowAltRight" />
                </button>
              </div>
            </div>
          </template>
        </template>
        <div class="section">
          <div class="title total">
            <span v-t="'Send and view Results'" />
          </div>

          <div
            class="text-center description"
            v-t="
              'This poll is completely anonymous but if you want to answer:'
            "
          ></div>

          <div class="row text-center mt-5">
            <div class="col-md">
              <span class="label" v-t="'Email'"></span>
              <input
                type="text"
                v-model="analysis.email"
                name="zemail"
                class="form-control"
              />
              <span
                class="label"
                v-t="
                  'If you want to receive information and results directly, you can leave us an email'
                "
              ></span>
            </div>
            <div
              class="col-md"
              v-if="
                questionnaire &&
                questionnaire.attributes &&
                questionnaire.attributes.showOrganization
              "
            >
              <span class="label" v-t="'Organization'"></span>
              <input
                class="form-control"
                type="text"
                v-model="analysis.organization"
                name="organization"
              />
              <span
                class="label"
                v-t="
                  'Are you part of a formal or informal organization / group / company ?'
                "
              ></span>
            </div>
            <!-- <div class="col-md">
              <span class="label" v-t="'Proyecto'"></span>
              <input type="text" v-model="analysis.project" name="project" />
            </div>
            <div class="col-md">
              <span class="label" v-t="'Región'"></span>
              <input type="text" v-model="analysis.region" name="region" />
            </div>
            <div class="col-md">
              <span class="label" v-t="'Ámbito'"></span>
              <input type="text" v-model="analysis.scope" name="scope" />
            </div> -->
          </div>
          <div class="next-container text-center mt-5">
            <button
              class="btn btn-sismograf btn-next"
              @click="save"
              v-bind:disabled="!validForm"
            >
              <span v-t="'Send'" />
              <font-awesome-icon :icon="fas.faLongArrowAltRight" />
            </button>
            <br />
            <button
              class="btn btn-sismograf btn-next"
              @click="saveNew"
              v-bind:disabled="!validForm"
              v-if="analysis.uid && false"
            >
              <span v-t="'Guardar nueva versión'" />
              <font-awesome-icon :icon="fas.faLongArrowAltRight" />
            </button>
            <div class="alert-container mt-3">
              <fade-transition>
                <div
                  v-if="show"
                  class="alert alert-white"
                  v-t="'Successfully saved'"
                ></div>
              </fade-transition>
            </div>
          </div>
        </div>
      </full-page>
    </no-ssr>
  </div>
</template>

<script>
import Radar from "~/components/Radar";
import CLine from "~/components/CLine";
import CBar from "~/components/CBar";
import CBarDomains from "~/components/CBarDomains";
import FadeTransition from "~/components/FadeTransition";

import { fas } from "@fortawesome/free-solid-svg-icons";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";

export default {
  layout: "full",
  head() {
    return {
      title: `${this.title}`,
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
        sectionsColor: [
          "#55AFB8",
          "#394335",
          "#4A8FAD",
          "#87dbb3",
          "#DB8077",
          "#394335",
          "#4A8FAD",
          "#87dbb3",
          "#DB8077",
          "#394335",
          "#4A8FAD",
          "#87dbb3",
          "#DB8077",
          "#394335",
          "#4A8FAD",
          "#87dbb3",
          "#DB8077",
          "#55AFB8",
          "#55AFB8",
          "#55AFB8",
          "#55AFB8",
          "#55AFB8",
          "#55AFB8",
          "#1f1f1f",
        ],
        navigation: false,
      },
      //results: [],
      analysis: {
        id: 0,
        email: "",
        // organization: "",
        // project: "",
        // region: "",
        // scope: "",
        language: "",
        results: [],
        more: [],
        comments: [],
        labelComments: [],
        labels: [],
        template: 0,
        uid: null,
        publishedAt: null,
        parent: null,
        questionnaire: null,
      },
      questionnaire: null,
      commentIndicator: null,
      comment: "",
      progressDomain: 0,
      progressPrinciple: 0,
    };
  },
  computed: {
    anchors() {
      const anchors = []; //["init"];

      this.template.attributes.label_categories.data.forEach((cat) => {
        anchors.push(`labels-${cat.id}`);
      });
      anchors.push(`domains`);

      this.template.attributes.domains.forEach((domain) => {
        anchors.push(`domain-${domain.id}`);
        domain.principles.forEach((principle) => {
          // anchors.push(`principle-${principle.id}`);
          principle.patterns.forEach((pattern) => {
            pattern.indicators.forEach((indicator) => {
              anchors.push(`indicator-${indicator.id}`);
            });
          });
        });
      });

      this.questionnaire.attributes.moreBlocks.forEach((block) => {
        anchors.push(`moreblock-${block.id}`);
        block.indicators.data.forEach((i) => {
          anchors.push(`moreind-${i.id}`);
        });
      });

      anchors.push("summary-1");
      anchors.push("summary-2");
      anchors.push("save");
      return anchors;
    },
    title() {
      return this.questionnaire &&
        this.questionnaire.attributes &&
        this.questionnaire.attributes.name
        ? this.questionnaire.attributes.name
        : this.template.attributes.name;
    },
    description() {
      return this.template.attributes.description;
    },
    // sectionsColorMore () {
    //   return this.sectionsColor.concat(this.sectionsColor).concat(this.sectionsColor).concat(this.sectionsColor).concat(this.sectionsColor).concat(this.sectionsColor)
    // },
    summary() {
      const summary = [];
      this.template.attributes.domains.forEach((domain) => {
        const domainSummary = {
          type: "domain",
          id: domain.id,
          name: domain.description,
          principles: [],
        };
        domain.principles.forEach((principle) => {
          const principleSummary = {
            type: "principle",
            /*domainId: domain.id, domainName: domain.name,*/ id: principle.id,
            name: principle.name,
            patterns: [],
          };
          principle.patterns.forEach((pattern) => {
            const patternSummary = {
              /*domainId: domain.id, domainName: domain.name, principleId: principle.id, principleName: principle.name,*/ type: "pattern",
              patternId: pattern.id,
              patternName: pattern.name,
            };
            pattern.indicators.forEach((indicator) => {
              const patternIndicators = this.analysis.results.filter(
                (r) => r.indicator === indicator.id
              );
              if (patternIndicators.length) {
                patternSummary.value = _.meanBy(
                  patternIndicators,
                  (p) => p.value
                );
              } else {
                patternSummary.value = null;
              }
            });
            principleSummary.patterns.push(patternSummary);
            principleSummary.value = _.meanBy(
              principleSummary.patterns,
              (p) => p.value
            );
          });
          domainSummary.principles.push(principleSummary);
          domainSummary.value = _.meanBy(
            domainSummary.principles,
            (p) => p.value
          );
        });
        summary.push(domainSummary);
      });
      return summary;
    },
    total: function () {
      let avg = 0;
      let count = 0;
      this.template.scopes.forEach((s) => {
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
      this.template.scopes.forEach((s) => {
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
      this.template.scopes.forEach((s) => {
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
      this.template.scopes.forEach((s) => {
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
      for (let s in this.template.scopes) {
        let array = [];
        let scope = this.template.scopes[s];
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
      for (let s in this.template.scopes) {
        let array = [];
        let scope = this.template.scopes[s];
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
      return !this.analysis.email || this.validateEmail(this.analysis.email);
    },
    validForm() {
      return this.validEmail;
    },
    fas() {
      return fas;
    },
  },
  async asyncData({ $axios, app, error, store }) {
    let slug = app.context.route.params.slug;

    const headers = {
      headers: {
        Authorization: `Bearer ${process.env.API_TOKEN}`,
      },
    };
    // console.log('context i18n', app.i18n)
    var { data } = await $axios.get(
      `/templates?filters[slug][$eq]=${slug}&locale=${app.i18n.locale}`,
      headers
    );
    // console.log('templateData',data, slug)
    if (!data || data.data.length == 0) {
      error({ statusCode: 404, message: "Page not found" });
      return;
    } else if (data.data && data.data.length === 0) {
      error({ statusCode: 404, message: "Page not found" });
      return;
    }

    const tid = data.data[0].id;

    var { data } = await $axios.get(
      `/templates/indicators/${tid}?locale=${app.i18n.locale}`,
      headers
    );

    let template = data.data;
    let analysis = {
      id: 0,
      email: "",
      organization: "",
      project: "",
      region: "",
      scope: "",
      language: "",
      results: [],
      more: [],
      comments: [],
      labelComments: [],
      labels: [],
      template: template.id,
      uid: null,
      name: "",
      parent: null,
    };

    let questionnaire = null;

    if (app.context.route.query && app.context.route.query.r) {
      var { data } = await $axios.get(
        `/analyses/?filters[uid][$eq]=${app.context.route.query.r}&populate=labels&locale=${app.i18n.locale}`,
        headers
      );
      if (data && data.data && data.data.length > 0) {
        analysis.id = data.data[0].id;

        var { data } = await $axios.get(
          `/analyses/${analysis.id}?populate[0]=*&populate[1]=comments&populate[2]=results&populate[3]=comments.indicator&populate[4]=results.indicator&populate[5]=labels&populate[6]=more&populate[7]=more.indicator&locale=${app.i18n.locale}`,
          headers
        );

        analysis.email = data.data.attributes.email;
        // analysis.organization = data.data.attributes.organization;
        // analysis.project = data.data.attributes.project;
        // analysis.region = data.data.attributes.region;
        // analysis.scope = data.data.attributes.scope;
        analysis.uid = data.data.attributes.uid;
        analysis.parent = data.data.attributes.parent;
        analysis.labels = data.data.attributes.labels.data;

        data.data.attributes.results.forEach((r) => {
          if (r.indicator && r.indicator.data && r.indicator.data.id) {
            const id = r.indicator.data.id;
            delete r.indicator;
            delete r.id;
            r.indicator = id;
          }
        });
        analysis.results = data.data.attributes.results;

        data.data.attributes.more.forEach((r) => {
          if (r.indicator && r.indicator.data && r.indicator.data.id) {
            const id = r.indicator.data.id;
            delete r.indicator;
            delete r.id;
            r.indicator = id;
          }
        });
        analysis.more = data.data.attributes.more;

        data.data.attributes.comments.forEach((r) => {
          if (r.indicator && r.indicator.data && r.indicator.data.id) {
            const id = r.indicator.data.id;
            delete r.indicator;
            delete r.id;
            r.indicator = id;
          }
        });
        analysis.comments = data.data.attributes.comments;
      }
    }

    if (app.context.route.query && app.context.route.query.q) {
      // const questionnaireSlug = app.context.route.query.q;
      var { data } = await $axios.get(
        `/questionnaires/?filters[slug][$eq]=${app.context.route.query.q}&populate=moreBlocks&populate=moreBlocks.indicators&populate=moreBlocks.indicators.indicator_options&&populate=more_label_categories&locale=${app.i18n.locale}`,
        headers
      );

      if (data.data.length && data.data[0].id) {
        analysis.questionnaire = data.data[0].id;
        questionnaire = data.data[0];
      }
    }

    // console.log('questionnaire', questionnaire)

    return {
      slug: slug,
      template,
      analysis,
      questionnaire,
    };
  },
  mounted() {
    this.mobile = window.innerWidth < 768;
    this.tablet =
      /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/.test(
        navigator.userAgent.toLowerCase()
      );
    let sectionsColor = this.options.sectionsColor;
    sectionsColor = sectionsColor
      .concat(sectionsColor)
      .concat(sectionsColor)
      .concat(sectionsColor)
      .concat(sectionsColor)
      .concat(sectionsColor);
    this.options.sectionsColor = sectionsColor;
    this.options.anchors = this.anchors;
  },
  methods: {
    next: () => {
      var s = fullpage_api.getActiveSection();
      fullpage_api.moveTo(s.index + 2);
    },
    goToEnd() {
      if (this.questionnaire.attributes.moreBlocks && this.questionnaire.attributes.moreBlocks.length > 0) {
        fullpage_api.moveTo(`moreblock-${this.questionnaire.attributes.moreBlocks[0].id}`);
      } else {
        fullpage_api.moveTo(`summary-1`);        
      }
    },
    isOptionActive(field, indicator, option) {
      return this.analysis[field]
        ? this.analysis[field].find(
            (r) => r.indicator === indicator.id && r.value === option.value
          )
        : false;
    },
    isLabelActive(label) {
      return this.analysis.labels.find((r) => r === label.id);
    },
    isCommentActive(indicator) {
      return this.analysis.comments.find(
        (r) => r.indicator === indicator.id && r.comment !== ""
      );
    },
    punctuation(field, indicator, option) {
      console.log("field", field, this.analysis);
      const same = this.analysis[field].find(
        (r) => r.indicator === indicator.id && r.value === option.value
      );
      if (same) {
        this.analysis[field] = this.analysis[field].filter(
          (r) =>
            r.indicator !== indicator.id ||
            (r.indicator === indicator.id && r.value !== option.value)
        );
        return;
      }
      const numOfValues = this.analysis[field].filter(
        (r) => r.indicator === indicator.id
      );
      if (numOfValues.length >= indicator.max) {
        const indicatorResults = this.analysis[field]
          .filter((r) => r.indicator === indicator.id)
          .filter((r, i) => i > 0);
        this.analysis[field] = this.analysis[field].filter(
          (r) => r.indicator !== indicator.id
        );
        indicatorResults.forEach((r) => {
          this.analysis[field].push(r);
        });
      }
      this.analysis[field].push({
        indicator: indicator.id,
        value: option.value,
      });
      if (numOfValues.length + 1 >= indicator.max) {
        var s = fullpage_api.getActiveSection();
        fullpage_api.moveTo(s.index + 2);
      }
    },
    addLabel(label, labelCategory) {
      const previous = this.analysis.labels.find((l) => l === label.id);
      if (previous) {
        this.analysis.labels = this.analysis.labels.filter(
          (l) => l !== label.id
        );
      } else {
        this.analysis.labels.push(label.id);
      }
      // console.log('labelCategory', labelCategory)
      if (
        !previous &&
        labelCategory &&
        labelCategory.attributes &&
        labelCategory.attributes.max &&
        labelCategory.attributes.max === 1
      ) {
        var s = fullpage_api.getActiveSection();
        fullpage_api.moveTo(s.index + 2);
      }
    },
    showModal(indicator) {
      this.comment = "";
      const previous = this.analysis.comments.find(
        (c) => c.indicator === indicator.id
      );
      if (previous) {
        this.comment = previous.comment;
      }
      this.commentIndicator = indicator;
      this.$refs["my-modal"].show();
    },
    hideModal() {
      const indicator = this.commentIndicator;
      const previous = this.analysis.comments.find(
        (c) => c.indicator === indicator.id
      );
      if (previous) {
        previous.comment = this.comment;
      } else {
        this.analysis.comments.push({
          indicator: this.commentIndicator.id,
          comment: this.comment,
        });
      }
      this.$refs["my-modal"].hide();
    },
    cancelModal() {
      this.$refs["my-modal"].hide();
    },
    // allIsSelected() {
    //   let allSelected = true;
    //   this.template.scopes.forEach((s) => {
    //     s.capacities.forEach((c) => {
    //       let capacityIsSelected = c.result != null;
    //       allSelected = allSelected && capacityIsSelected;
    //     });
    //   });
    //   return allSelected;
    // },
    async saveNew() {
      this.analysis.id = null;
      this.analysis.parent = this.analysis.uid;
      this.analysis.uid = null;
      this.analysis.publishedAt = new Date();
      this.save();
    },
    async save() {
      this.analysis.language = this.$i18n.locale;
      this.analysis.template = this.template.id;
      this.analysis.publishedAt = new Date();
      const headers = {
        headers: {
          Authorization: `Bearer ${process.env.API_TOKEN}`,
          "Content-Type": "application/json",
        },
      };
      if (this.analysis.uid === null) {
        this.analysis.uid = uuidv4();
        const post = { data: this.analysis };
        // delete post.data.id
        var { data } = await this.$axios.post(`/analyses`, post, headers);
        console.log("data", data);
        this.analysis.id = data.data.id;
      } else {
        const post = { data: this.analysis };
        var { data } = await this.$axios.put(
          `/analyses/${this.analysis.id}`,
          post,
          headers
        );
      }
      this.$router.push(
        this.localePath({
          name: "template-view-slug",
          params: { slug: this.slug },
          query: { r: this.analysis.uid },
        })
      );
      this.show = true;
      setTimeout(() => {
        // this.show = false;
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
    setLabelComments(labelCategory, event) {
      const existing = this.analysis.labelComments.find(
        (c) => c.label_category === labelCategory.id
      );
      if (existing) {
        existing.comment = event.target.value;
      } else {
        this.analysis.labelComments.push({
          label_category: labelCategory.id,
          comment: event.target.value,
        });
      }
    },
    setMoreComments(ind, event) {
      const existing = this.analysis.comments.find(
        (c) => c.indicator === ind.id
      );
      if (existing) {
        existing.comment = event.target.value;
      } else {
        this.analysis.comments.push({
          indicator: ind.id,
          comment: event.target.value,
        });
      }
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
  padding: 0 6vw;
}

.title {
  text-align: center;
  font-size: 5vw;
  font-weight: bold;
  color: #fff;
}
.description {
  color: #fff;
  font-size: 20px;
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

  background: #fff;
  color: #333;
  border-radius: 6px;
  padding: 10px 20px;
  font-size: 16px;
  margin-bottom: 15px;
  cursor: pointer;
  /* text-transform: capitalize; */
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
ul.labels-list {
  margin-top: 1rem;
  margin-bottom: 0rem;
}
ul.label-categories-list > li {
  display: block !important;
}
ul.capacities-list > li {
  display: inline-block;
  margin: 0 10px;
}
ul.capacities-list li .active {
  background: hsl(48, 100%, 67%);
  color: #333;
}
.scope-title {
  font-size: 20px;
  color: #fff;
}
.label {
  color: #fff;
  padding-right: 6px;
  display: block;
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
.breadcrumb {
  position: absolute;
  bottom: 0px;
  width: calc(100% - 10vw);
  background: transparent;
}
.breadcrumb a {
  color: #fff;
}
.breadcrumb span {
  color: #fff;
  padding: 0 0.5rem;
}
.multiple,
.label-category {
  color: #fff;
  text-align: center;
}
textarea.comment {
  height: 350px;
  background: #eee;
  border: 1px solid #ddd;
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
  top: 1rem;
  right: 1vw;
}
.progress-div {
  position: relative;
  color: #fff;
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
.principle-title {
  color: #fff;
  font-weight: bold;
}
.domain-quadrant {
  background: #eee;
  display: flex;
  width: 100%;
  margin: 2rem;
  text-align: center;
  border-radius: 6px;
}
.domain-quadrant-inner {
  margin-bottom: 1rem;
  padding: 1rem;
  text-align: center;
  font-size: 2rem;
  width: 100%;
}
.domain-quadrant.inactive {
  opacity: 0.2;
}
.equal {
  display: flex;
  display: -webkit-flex;
  flex-wrap: wrap;
}
@media (min-width: 768px) {
  .row.equal {
    display: flex;
    flex-wrap: wrap;
  }
}
.principle {
  font-size: 15px;
  margin-top: 0.5rem;
}
.principle > div {
  background: rgb(74, 143, 173);
  background: #999;
  color: #fff;
  border-radius: 6px;
  padding: 1rem;
}
.domain-name {
  font-size: 20px;
  display: block;
}
.domain-name a,
.domain-desc a {
  color: #333;
  text-decoration: none;
}

@media (max-width: 768px) {
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
  .breadcrumb {
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
  .domain-quadrant-inner {
    padding: 0.5rem;
  }
}
</style>
<style>
#fp-nav ul li a span,
.fp-slidesNav ul li a span {
  background: #fff;
}
</style>