<template>
  <div class="fullpage-container">
    <no-ssr>
      <full-page ref="fullpage" :options="options" id="fullpage">
        <div class="section fp-auto-height-responsive aligned name granota">
          <div class="bg01">
            <b-container>
              <b-row>
                <b-col md="6" offset-md="3">
                  <div class="punts"></div>
                  <h1 class="text-center sismo-title" v-t="'el-sismograf'">
                    El Sismògraf
                  </h1>
                  <h5
                    class="text-center sismo-text"
                    v-html="
                      $t(
                        'us-donem-la-benvinguda-al-sismograf-volem-comencar-sabent-de-tu'
                      )
                    "
                  ></h5>
                  <div class="sismo-question" v-t="'com-et-dius'"></div>
                  <div class="email-field mt-5 mb-5">
                    <input
                      type="text"
                      v-model="analysis.name"
                      class="form-control"
                      :placeholder="$t('escriu-el-teu-nom')"
                    />
                  </div>
                </b-col>
              </b-row>
            </b-container>
            <div class="next-container text-right">
              <button class="button button-4 ml-auto" @click="next">
                <span v-t="'next'" />
              </button>
            </div>
          </div>
        </div>
        <div
          class="section zfp-auto-height-responsive aligned name granota"
          v-if="
            questionnaire &&
            questionnaire.attributes &&
            questionnaire.attributes.showOrganization
          "
        >
          <div class="zbg01">
            <b-container>
              <b-row>
                <b-col md="6" offset-md="3">
                  <div class="sismo-question" v-t="'nom-del-projecte'"></div>

                  <div class="email-field mt-5 mb-5">
                    <input
                      type="text"
                      v-model="analysis.organization"
                      class="form-control"
                      :placeholder="$t('escriu-el-nom-de-l-organitzacio')"
                    />
                  </div>
                </b-col>
              </b-row>
            </b-container>
            <div class="next-container text-right">
              <button class="button button-4 ml-auto ml-auto" @click="next">
                <span v-t="'next'" />
              </button>
            </div>
          </div>
        </div>

        <template
          v-for="(labelCategory, lci) in labelQuestions"
        >
          <div
            v-bind:key="lci"
            class="section zfp-auto-height-responsive granota"
          >
            <h5
              class="text-center sismo-text"
              v-t="'volem-comencar-sabent-de-tu-1'"
            ></h5>
            <b-container class="text-center">
              <div class="scope title indicator">
                {{ labelCategory.attributes.name }}
              </div>

              <ul class="capacities-list capacities-list-inline">
                <li
                  class="item"
                  v-for="label in labelCategory.attributes.labels.data"
                  v-bind:key="label.id"
                >
                  <div
                    v-on:click="addLabel(label, labelCategory)"
                    class="button button-3"
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
                <h5
                  class="text-center sismo-text"
                  v-t="labelCategory.attributes.openResponseText"
                ></h5>

                <textarea
                  class="form-control"
                  type="text"
                  @input="setLabelComments(labelCategory, $event)"
                  name="organization"
                ></textarea>
              </div>
            </b-container>
            <div class="next-container text-right">
              <button class="button button-4" @click="next">
                <span v-t="'next'" />
              </button>
            </div>
          </div>
        </template>

        <div class="section zfp-auto-height-responsive how-it-works aligned">
          <b-container>
            <h2
              class="title"
              v-t="
                (questionnaire &&
                  questionnaire.attributes &&
                  questionnaire.attributes.domainsText) ||
                'que-treballarem'
              "
            ></h2>
          </b-container>
          <b-container class="works-container">
            <b-row>
              <b-col cols="12" md="4" order-md="1"></b-col>
              <b-col class="info-block" cols="12" md="4" order="1" order-md="2">
                <div class="num">01</div>
                <div
                  class="title"
                  v-if="template.attributes.domains.length > 0"
                >
                  {{ template.attributes.domains[0].name }}
                </div>
                <div class="more">
                  {{ template.attributes.domains[0].description }}
                </div>
              </b-col>
              <b-col cols="12" md="4" order-md="3"> </b-col>
              <b-col
                class="info-block"
                cols="12"
                md="4"
                order="12"
                order-md="4"
              >
                <div class="num" v-if="template.attributes.domains.length > 3">
                  04
                </div>
                <div
                  class="title"
                  v-if="template.attributes.domains.length > 3"
                >
                  {{ template.attributes.domains[3].name }}
                </div>
                <div class="more" v-if="template.attributes.domains.length > 3">
                  {{ template.attributes.domains[3].description }}
                </div>
              </b-col>
              <b-col cols="12" md="4" order-md="5">
                <div class="granota"></div>
              </b-col>
              <b-col class="info-block" cols="12" md="4" order="9" order-md="8">
                <div class="num" v-if="template.attributes.domains.length > 2">
                  03
                </div>
                <div
                  class="title"
                  v-if="template.attributes.domains.length > 2"
                >
                  {{ template.attributes.domains[2].name }}
                </div>
                <div class="more" v-if="template.attributes.domains.length > 2">
                  {{ template.attributes.domains[2].description }}
                </div>
              </b-col>
              <!-- <b-col  md="4"> x</b-col>
                <b-col  md="4"> c</b-col>
                <b-col  md="4"> v</b-col> -->

              <b-col cols="12" md="4" order-md="7"> </b-col>
              <b-col class="info-block" cols="12" md="4" order="6" order-md="6">
                <div class="num" v-if="template.attributes.domains.length > 1">
                  02
                </div>
                <div
                  class="title"
                  v-if="template.attributes.domains.length > 1"
                >
                  {{ template.attributes.domains[1].name }}
                </div>
                <div class="more" v-if="template.attributes.domains.length > 1">
                  {{ template.attributes.domains[1].description }}
                </div>
              </b-col>
              <b-col md="4" order-md="8"> </b-col>
            </b-row>
          </b-container>
          <div class="next-container text-right">
            <button @click="next" class="button button-4 ml-auto">
              <span v-t="'next'" />
            </button>
          </div>
        </div>

        <div class="section zfp-auto-height-responsive how-it-works granota">
          <div class="bg01">
            <div class="info-first" v-t="'alguns-trucs-que-t-ajudaran'">
              alguns trucs que t’ajudaran...
            </div>
            <b-container class="z">
              <b-row>
                <b-col md="4" class="info-block">
                  <img src="~/assets/images/comment.svg" />
                  <div class="title" v-t="'comenta-ns'">Comenta'ns</div>
                  <div
                    class="more"
                    v-t="
                      'podras-deixar-comentaris-clicant-a-aquest-boto-per-clarificar-o-ampliar-les-respostes'
                    "
                  >
                    Podràs deixar comentaris clicant a aquest botó per
                    clarificar o ampliar les respostes.
                  </div>
                </b-col>
                <b-col md="4" class="info-block">
                  <img src="~/assets/images/save.svg" />
                  <div class="title" v-t="'fes-una-pausa'">Fes una pausa</div>
                  <div
                    class="more"
                    v-t="
                      'guarda-les-respostes-fetes-i-marca-alla-on-t-has-quedat-per-reprendre-el-queestionari-en-un-altre-moment'
                    "
                  >
                    Guarda les respostes fetes i marca allà on t’has quedat per
                    reprendre el qüestionari en un altre moment.
                  </div>
                </b-col>
                <b-col md="4" class="info-block">
                  <img src="~/assets/images/index.svg" />
                  <div class="title" v-t="'torna-a-l-index'">
                    Torna a l’índex
                  </div>
                  <div
                    class="more"
                    v-t="
                      'torna-a-l-index-si-vols-saber-quines-seccions-ja-has-respost-i-quines-et-falten'
                    "
                  >
                    Torna a l’índex si vols saber quines seccions ja has respost
                    i quines et falten.
                  </div>
                </b-col>
              </b-row>
              <div class="next-container text-right">
                <button class="button button-4 ml-auto" @click="next">
                  <span v-t="'next'" />
                </button>
              </div>
            </b-container>
          </div>
        </div>

        <template v-for="(domain, di) in template.attributes.domains">
          <div
            v-bind:key="domain.id"
            class="section zfp-auto-height-responsive mirades"
            :class="`bg-domain-${di}`"
          >
            <!-- <div class="breadcrumb text-center">
                <a :href="`#name`" v-t="'init'"></a>
                <span> > {{ domain.description }}</span>
              </div> -->

            <div>
              <b-container fluid>
                <b-row>
                  <b-col cols="12"></b-col>
                  <div
                    class="principle-title"
                    v-t="
                      (questionnaire &&
                        questionnaire.attributes &&
                        questionnaire.attributes.domainsText) ||
                      'les-quatre-mirades'
                    "
                  ></div>
                </b-row>
                <b-row>
                  <b-col
                    class="equal"
                    v-for="(i, ii) in template.attributes.domains.length"
                    :key="domain.id * 100 + i"
                    md="3"
                    :class="`domain-quadrant-outter-${ii}`"
                  >
                    <div
                      class="domain-quadrant"
                      :class="di === i - 1 ? 'active' : 'inactive'"
                    >
                      <div class="domain-quadrant-inner">
                        <div class="domain-number">0{{ i }}</div>
                        <div class="domain-name">
                          <a
                            :href="`#domain-${
                              template.attributes.domains[i - 1].id
                            }`"
                          >
                            {{ template.attributes.domains[i - 1].name }}
                          </a>
                        </div>
                        <div
                          class="principles-list"
                          v-if="
                            questionnaire &&
                            questionnaire.attributes &&
                            questionnaire.attributes.showPrinciples !== false
                          "
                        >
                          <div
                            class="principle-row"
                            v-for="(principle, pi) in template.attributes
                              .domains[i - 1].principles"
                            v-bind:key="principle.id"
                          >
                            <a
                              class="principle"
                              :class="{
                                active: principleIsAnswered(
                                  template.attributes.domains[i - 1].id,
                                  principle.id
                                ),
                              }"
                              :href="`#${principlesAnchors[i - 1][pi]}`"
                            >
                              {{ pi + 1 }}. {{ principle.name }}
                              <img
                                class="principle-check"
                                src="~/assets/images/check-circle.svg"
                                v-if="
                                  principleIsAnswered(
                                    template.attributes.domains[i - 1].id,
                                    principle.id
                                  )
                                "
                              />
                            </a>
                          </div>
                          <!-- <div
                          class="principle zd-block"
                          v-for="(principle, pi) in template.attributes.domains[i - 1]
                            .principles"
                          v-bind:key="principle.id"
                        >
                          {{ pi + 1 }}. {{ principle.name }} - {{ principlesAnchors[i - 1][pi] }}
                        </div> -->
                        </div>
                      </div>
                    </div>
                  </b-col>
                </b-row>
              </b-container>
            </div>
            <div class="next-container text-center">
              <div class="action-buttons">
                <button
                  id="show-btn"
                  class="btn-comment disabled"
                  disabled
                  v-bind:class="{
                    active: isCommentActive(indicator),
                  }"
                  @click="showModal(indicator)"
                  :title="$t('btn-comment')"
                >
                  <img src="~/assets/images/comment-disabled.svg" />
                </button>
                <button
                  id="save-btn"
                  class="btn-save"
                  :title="$t('btn-save')"
                  @click="showModalSave(indicator)"
                >
                  <img src="~/assets/images/save.svg" />
                </button>
                <a
                  id="index-btn"
                  class="btn-index disabled"
                  href="#"
                  :title="$t('btn-index')"
                >
                  <img src="~/assets/images/index-disabled.svg" />
                </a>
              </div>
              <button class="button button-4 ml-auto" @click="next">
                <span v-t="'next'" />
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
                <div
                  v-bind:key="indicator.id"
                  class="section zfp-auto-height-responsive fp-no-table"
                  :class="`bg-domain-content-${di}`"
                >
                  <Progress
                    :domain="domain"
                    :template="template"
                    :principle="principle"
                    :di="di"
                    :pi="pi"
                    :ppi="ppi"
                  >
                  </Progress>

                  <div class="breadcrumb text-center">
                    <a :href="`#name`" v-t="'init'"></a>
                    <span> > </span>
                    <a :href="`#domain-${domain.id}`">{{ domain.name }}</a>
                    <span> > </span>
                    <a :href="`#principle-${principle.id}`">{{
                      principle.name
                    }}</a>
                    <!-- <span> > {{ pattern.name }}</span> -->
                  </div>

                  <b-container>
                    <div class="scope title indicator">
                      <div class="mini-breadcrumb">
                        {{ pi + 1 }}.{{ principle.name }}
                      </div>
                      {{ indicator.question }}
                    </div>
                    <div
                      class="text-center indicator multiple"
                      v-if="indicator.max > 1"
                    >
                      <span
                        v-t="
                          $t('max-indicator-max-opcions', { 0: indicator.max })
                        "
                      ></span>
                    </div>
                    <ul class="capacities-list">
                      <li
                        class="item"
                        v-for="option in indicator.indicator_options"
                        v-bind:key="option.id"
                      >
                        <div
                          v-on:click="
                            punctuation(
                              'results',
                              indicator,
                              option,
                              domain.id,
                              principle.id
                            )
                          "
                          class="button button-3"
                          v-bind:class="{
                            active: isOptionActive(
                              'results',
                              indicator,
                              option
                            ),
                          }"
                        >
                          {{ option.name }}
                        </div>
                      </li>
                    </ul>
                  </b-container>

                  <div class="next-container text-right d-flex">
                    <div class="action-buttons">
                      <button
                        id="show-btn"
                        class="btn-comment"
                        v-bind:class="{
                          active: isCommentActive(indicator),
                        }"
                        @click="showModal(indicator)"
                      >
                        <img src="~/assets/images/comment.svg" />
                      </button>
                      <button
                        id="save-btn"
                        class="btn-save"
                        @click="showModalSave(indicator)"
                      >
                        <img src="~/assets/images/save.svg" />
                      </button>
                      <a
                        id="index-btn"
                        class="btn-index"
                        :href="`#domain-${domain.id}`"
                      >
                        <img src="~/assets/images/index.svg" />
                      </a>
                    </div>
                    <button class="button button-4 ml-auto" @click="next">
                      <span v-t="'next'" />
                    </button>
                  </div>
                </div>
              </template>
            </template>
          </template>
        </template>

        <b-modal size="lg" centered ref="comment-modal" :title="''">
          <h5 class="comment-title">
            {{ commentIndicator ? commentIndicator.question : "" }}
          </h5>
          <div class="d-block text-center">
            <textarea class="form-control comment" v-model="comment">
            </textarea>
          </div>
          <template #modal-header>
            <img src="~/assets/images/comment.svg" />
          </template>

          <template #modal-footer>
            <button
              class="zmt-3 button button-1 no-icon mb-3"
              @click="cancelModal"
              v-t="'cancel'"
            ></button>
            <button
              class="zmt-3 button button-4 no-icon mr-4 mb-3"
              @click="hideModal"
              v-t="'save'"
            ></button>
          </template>
        </b-modal>

        <b-modal size="lg" centered ref="save-modal" title="">
          <template #modal-header>
            <img src="~/assets/images/save.svg" />
          </template>
          <h5 class="comment-title" v-t="'guardar-sismograf'"></h5>

          <div
            class="copy-body"
            v-t="
              'copia-i-guarda-en-un-lloc-segur-aquesta-adreca-i-torna-quan-vulguis-a-continuar-el-teu-sismograf'
            "
          >
            Copia i guarda en un lloc segur aquesta adreça i torna quan vulguis
            a continuar el teu sismògraf:
          </div>
          <div class="copy-url mt-4 mb-4">{{ copyUrl }}</div>

          <template #modal-footer>
            <button
              @click="copyToClipboard"
              class="mt-3 mb-3 button button-3 uppercase"
              v-t="'copiar-al-portaretalls'"
            >
              Copiar al portaretalls
            </button>
            <button
              class="mt-3 mb-3 button button-4"
              @click="cancelSaveModal"
              v-t="'d-acord'"
            >
              D'acord
            </button>
          </template>
        </b-modal>

        <b-modal size="lg" centered ref="exit-modal" title="">
          <template #modal-header>
            <img src="~/assets/images/index.svg" />
          </template>
          <h5 class="comment-title" v-t="'sortir-sismograf'"></h5>

          <div
            class="copy-body"
            v-html="$t('estas-segura-sortir-sismograf')"
          ></div>

          <template #modal-footer>
            <button
              @click="exit"
              class="mt-3 mb-3 button button-3 uppercase"
              v-t="'sortir-1'"
            >
              Sortir
            </button>
            <button
              class="mt-3 mb-3 button button-4"
              @click="cancelExitModal"
              v-t="'no-continuar'"
            >
              Continuar
            </button>
            <button
              class="mt-3 mb-3 button button-4"
              @click="showModalSave"
              v-t="'guarda-continuar'"
            >
              Guardar i continuar
            </button>
          </template>
        </b-modal>

        <template v-for="(block, bi) in questionnaire.attributes.moreBlocks">
          <div class="section more-section" :key="bi">
            <div class="scope title mb-5">
              <span v-t="block.title" />
            </div>

            <div class="next-container text-center">
              <button class="button button-4 ml-auto" @click="next">
                <span v-t="'next'" />
              </button>
            </div>
          </div>

          <template v-for="(ind, indi) in block.indicators.data" class="z">
            <div class="section" :key="indi">
              <b-container class="text-center">
                <div class="scope title indicator more-title">
                  <div class="mini-breadcrumb mb-3">
                    <span v-t="block.title" />
                  </div>
                  <span v-t="ind.attributes.question" />
                </div>

                <ul class="capacities-list">
                  <li
                    class="item"
                    v-for="option in ind.attributes.indicator_options"
                    v-bind:key="option.id"
                  >
                    <div
                      v-on:click="punctuation('more', ind, option, 0, 0)"
                      class="button button-3"
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
                    class="form-control comment comment-more"
                    type="text"
                    @input="setMoreComments(ind, $event)"
                    name="organization"
                  ></textarea>
                </div>
              </b-container>

              <div class="next-container text-center">
                <button class="button button-4 ml-auto" @click="next">
                  <span v-t="'next'" />
                </button>
              </div>
            </div>
          </template>
        </template>
        <div
          class="
            section
            zfp-auto-height-responsive
            how-it-works
            view-result
            bg-result
            aligned
          "
        >
          <div
            class="info-first"
            v-t="'gracies-per-arribar-fins-al-final-ara-nomes-us-queda'"
          >
            Gràcies per arribar fins al final, ara només us queda...
          </div>
          <b-container fluid>
            <b-row>
              <b-col md="2">
                <h2 class="title-view" v-t="'veure-els-resultats'"></h2>
              </b-col>
              <b-col md="4"> </b-col>
              <b-col md="4">
                <div
                  class="email-field"
                  v-if="
                    questionnaire &&
                    questionnaire.attributes &&
                    questionnaire.attributes.showEmail
                  "
                >
                  <span
                    class="label"
                    v-t="'voleu-rebre-ls-per-correu-electronic'"
                  ></span>
                  <input
                    type="text"
                    v-model="analysis.email"
                    name="zemail"
                    class="form-control"
                    :placeholder="$t('email')"
                  />
                </div>

                <div
                  v-if="
                    questionnaire &&
                    questionnaire.attributes &&
                    questionnaire.attributes.moreFieldsText
                  "
                  class="text-left text-description"
                  v-t="questionnaire.attributes.moreFieldsText"
                ></div>
                <div
                  v-else-if="
                    (questionnaire &&
                      questionnaire.attributes &&
                      questionnaire.attributes.showEmail) ||
                    (questionnaire &&
                      questionnaire.attributes &&
                      questionnaire.attributes.showOrganization)
                  "
                  class="text-left text-description"
                  v-t="
                    'aquesta-enquesta-es-totalment-anonima-pero-si-vols-que-t-enviem-els-resultats-a-la-teva-bustia-ens-pots-deixar-un-correu-electronic'
                  "
                ></div>

                <button
                  class="button button-4 ml-auto mt-5"
                  @click="saveAndResults"
                  v-bind:disabled="!validForm"
                >
                  <span v-t="'veure-els-resultats'" />
                </button>
              </b-col>
            </b-row>
          </b-container>
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
import Progress from "~/components/Progress";

import { fas } from "@fortawesome/free-solid-svg-icons";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";
import { mapGetters } from "vuex";

export default {
  layout: "full",
  components: { Progress },
  data() {
    return {
      apiUrl: process.env.API_URL,
      template: {},
      slug: "",
      mobile: false,
      tablet: false,
      show: false,
      options: {
        licenseKey: "7C5A62B9-9F4349E0-A45C66A1-437BB3A2",
        menu: "#menu",
        sectionsColor: "#FBF7EB",
        navigation: true,
        slidesNavigation: false,
        scrollOverflow: true,
      },
      analysis: {
        id: 0,
        email: "",
        name: "",
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
      copyUrl: "",
      application: null,
      organization: null,
    };
  },
  computed: {
    ...mapGetters({
      application2: "app/get",
    }),
    anchors() {
      const anchors = []; //["init"];

      anchors.push(`name`);

      if (
        this.questionnaire &&
        this.questionnaire.attributes &&
        this.questionnaire.attributes.showOrganization
      ) {
        anchors.push(`org`);
      }

      this.questionnaire.attributes.label_categories.data.forEach((cat) => {
        anchors.push(`labels-${cat.id}`);
      });
      anchors.push(`domains`);
      anchors.push(`tricks`);

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
    principlesAnchors() {
      const anchors = []; //["init"];

      this.template.attributes.domains.forEach((domain, i) => {
        domain.principles.forEach((principle) => {
          let first = true;

          principle.patterns.forEach((pattern) => {
            pattern.indicators.forEach((indicator) => {
              if (first) {
                anchors.push([]);
                anchors[i].push(`indicator-${indicator.id}`);
              }
              first = false;
            });
          });
        });
      });

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
      return (
        ((!this.questionnaire.attributes.emailMandatory ||
          (this.questionnaire.attributes.emailMandatory &&
            this.analysis.email)) &&
          !this.analysis.email) ||
        this.validateEmail(this.analysis.email)
      );
    },
    validOrganization() {
      return (
        !this.questionnaire.attributes.organizationMandatory ||
        (this.questionnaire.attributes.organizationMandatory &&
          this.analysis.organization)
      );
    },
    validForm() {
      return this.validEmail && this.validOrganization;
    },
    answersTree() {
      const groups = [];
      for (let i = 0; i < this.template.attributes.domains.length; i++) {
        const d = this.template.attributes.domains[i];
        const domain = { id: d.id, name: d.name, principles: [] };
        for (let j = 0; j < d.principles.length; j++) {
          const pr = d.principles[j];
          const principle = { id: pr.id, name: pr.name, indicators: [] };
          const indicators = [];
          for (let k = 0; k < pr.patterns.length; k++) {
            const pt = pr.patterns[k];
            for (let l = 0; l < pt.indicators.length; l++) {
              const i = pt.indicators[l];
              indicators.push(i);
            }
          }
          principle.indicators = indicators.map((i) => i.id);
          principle.indicatorsLen = indicators.map((i) => i.id).length;
          let responses = 0;
          principle.answered = true;
          principle.indicators.forEach((i) => {
            const hasResult = this.analysis.results.find(
              (r) => r.indicator === i
            );
            if (!hasResult) {
              principle.answered = false;
            }
          });
          principle.responses = responses;
          domain.principles.push(principle);
        }

        groups.push(domain);
      }

      return groups;
    },
    labelQuestions () {
      if (this.questionnaire.attributes.label_categories && this.questionnaire.attributes.label_categories.data) {
        return _.sortBy(this.questionnaire.attributes
            .label_categories.data, 'attributes.order')
      } else {
        return this.questionnaire.attributes
            .label_categories.data, 'attributes.order'
      }
      
    }
  },
  async asyncData({ $axios, app, error, store }) {
    const headers = {
      headers: {
        Authorization: `Bearer ${process.env.apiToken}`,
      },
    };

    const appq = `/applications?filters[slug][$eq]=${process.env.application}-${app.i18n.locale}&populate=footer&populate=footer.logo1&populate=footer.logo2&locale=${app.i18n.locale}`;
    var { data } = await $axios.get(appq, headers);

    const application = data.data[0];

    const organization = app.context.route.query.org;

    var { data } = await $axios.get(
      `/templates?filters[slug][$eq]=${app.context.route.params.template}&locale=${app.i18n.locale}`,
      headers
    );
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
        if (analysis.email === application.attributes.emptyEmail) {
          analysis.email = "";
        }
        analysis.uid = data.data.attributes.uid;
        analysis.parent = data.data.attributes.parent;
        analysis.labels = data.data.attributes.labels.data;

        analysis.name = data.data.attributes.name;
        analysis.organization = data.data.attributes.organization;

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

    // console.log('application2', store.state.application)
    // console.log('application1', application)

    // const emptyEmail = store.app.

    var { data } = await $axios.get(
      `/organizations?filters[slug][$eq]=${app.context.route.params.template}&locale=${app.i18n.locale}&populate=logo&populate=questionnaires&populate=questionnaires.template&populate=questionnaires.image&token=${process.env.apiToken}`,
      headers
    );

    const q = app.context.route.params.q;

    var { data } = await $axios.get(
      `/questionnaires/?filters[slug][$eq]=${q}&populate=organization&populate=organization.logo&populate=moreBlocks&populate=moreBlocks.indicators&populate=moreBlocks.indicators.indicator_options&populate=more_label_categories&populate=label_categories&populate=label_categories.labels&locale=${app.i18n.locale}`,
      headers
    );

    if (data.data.length && data.data[0].id) {
      analysis.questionnaire = data.data[0].id;
      questionnaire = data.data[0];
    }

    return {
      slug: app.context.route.params.template,
      template,
      analysis,
      questionnaire,
      application,
      organization,
    };
  },
  created() {
    this.$nuxt.$on("go-to-init", () => {
      this.askExit();
      //Do Something
    });
  },
  async mounted() {
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
    this.options.afterLoad = (origin, destination, direction, trigger) => {
      const item = destination.item;
      const el = document.body;
      if (item.classList.contains("bg-domain-0")) {
        el.classList.add("bg-domain-0");
        el.classList.remove("bg-domain-1");
        el.classList.remove("bg-domain-2");
        el.classList.remove("bg-domain-3");
        el.classList.remove("bg-domain-content-0");
        el.classList.remove("bg-domain-content-1");
        el.classList.remove("bg-domain-content-2");
        el.classList.remove("bg-domain-content-3");
        el.classList.remove("bg-result");
      } else if (item.classList.contains("bg-domain-1")) {
        el.classList.add("bg-domain-1");
        el.classList.remove("bg-domain-0");
        el.classList.remove("bg-domain-2");
        el.classList.remove("bg-domain-3");
        el.classList.remove("bg-domain-content-0");
        el.classList.remove("bg-domain-content-1");
        el.classList.remove("bg-domain-content-2");
        el.classList.remove("bg-domain-content-3");
        el.classList.remove("bg-result");
      } else if (item.classList.contains("bg-domain-2")) {
        el.classList.add("bg-domain-2");
        el.classList.remove("bg-domain-0");
        el.classList.remove("bg-domain-1");
        el.classList.remove("bg-domain-3");
        el.classList.remove("bg-domain-content-0");
        el.classList.remove("bg-domain-content-1");
        el.classList.remove("bg-domain-content-2");
        el.classList.remove("bg-domain-content-3");
        el.classList.remove("bg-result");
      } else if (item.classList.contains("bg-domain-3")) {
        el.classList.add("bg-domain-3");
        el.classList.remove("bg-domain-0");
        el.classList.remove("bg-domain-1");
        el.classList.remove("bg-domain-2");
        el.classList.remove("bg-domain-content-0");
        el.classList.remove("bg-domain-content-1");
        el.classList.remove("bg-domain-content-2");
        el.classList.remove("bg-domain-content-3");
        el.classList.remove("bg-result");
      } else if (item.classList.contains("bg-domain-content-0")) {
        el.classList.add("bg-domain-content-0");
        el.classList.remove("bg-domain-0");
        el.classList.remove("bg-domain-1");
        el.classList.remove("bg-domain-2");
        el.classList.remove("bg-domain-3");
        el.classList.remove("bg-domain-content-1");
        el.classList.remove("bg-domain-content-2");
        el.classList.remove("bg-domain-content-3");
        el.classList.remove("bg-result");
      } else if (item.classList.contains("bg-domain-content-1")) {
        el.classList.add("bg-domain-content-1");
        el.classList.remove("bg-domain-0");
        el.classList.remove("bg-domain-1");
        el.classList.remove("bg-domain-2");
        el.classList.remove("bg-domain-3");
        el.classList.remove("bg-domain-content-0");
        el.classList.remove("bg-domain-content-2");
        el.classList.remove("bg-domain-content-3");
        el.classList.remove("bg-result");
      } else if (item.classList.contains("bg-domain-content-2")) {
        el.classList.add("bg-domain-content-2");
        el.classList.remove("bg-domain-0");
        el.classList.remove("bg-domain-1");
        el.classList.remove("bg-domain-2");
        el.classList.remove("bg-domain-3");
        el.classList.remove("bg-domain-content-0");
        el.classList.remove("bg-domain-content-1");
        el.classList.remove("bg-domain-content-3");
        el.classList.remove("bg-result");
      } else if (item.classList.contains("bg-domain-content-3")) {
        el.classList.add("bg-domain-content-3");
        el.classList.remove("bg-domain-0");
        el.classList.remove("bg-domain-1");
        el.classList.remove("bg-domain-2");
        el.classList.remove("bg-domain-3");
        el.classList.remove("bg-domain-content-0");
        el.classList.remove("bg-domain-content-1");
        el.classList.remove("bg-domain-content-2");
        el.classList.remove("bg-result");
      } else if (item.classList.contains("view-result")) {
        el.classList.add("bg-result");
        el.classList.remove("bg-domain-0");
        el.classList.remove("bg-domain-1");
        el.classList.remove("bg-domain-2");
        el.classList.remove("bg-domain-3");
        el.classList.remove("bg-domain-content-0");
        el.classList.remove("bg-domain-content-1");
        el.classList.remove("bg-domain-content-2");
        el.classList.remove("bg-domain-content-3");
      } else {
        el.classList.remove("bg-domain-0");
        el.classList.remove("bg-domain-1");
        el.classList.remove("bg-domain-2");
        el.classList.remove("bg-domain-3");
        el.classList.remove("bg-domain-content-0");
        el.classList.remove("bg-domain-content-1");
        el.classList.remove("bg-domain-content-2");
        el.classList.remove("bg-domain-content-3");
        el.classList.remove("bg-result");
      }
    };
  },
  methods: {
    async addScript(src, id) {
      return new Promise((resolve, reject) => {
        if (document.getElementById(id)) {
          resolve();
        }
        const head = document.head || document.getElementsByTagName("head")[0];
        const script = document.createElement("script");
        script.src = src;
        script.id = id;
        script.addEventListener("load", resolve);
        script.addEventListener("error", (e) => reject(e));
        script.addEventListener("abort", (e) => reject(e));
        head.appendChild(script);
      });
    },
    next: () => {
      var s = fullpage_api.getActiveSection();
      fullpage_api.moveTo(s.index + 2);
    },
    goToEnd() {
      if (
        this.questionnaire.attributes.moreBlocks &&
        this.questionnaire.attributes.moreBlocks.length > 0
      ) {
        fullpage_api.moveTo(
          `moreblock-${this.questionnaire.attributes.moreBlocks[0].id}`
        );
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
    punctuation(field, indicator, option, domainId, principleId) {
      console.log("indicator, option", domainId, principleId);
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
        domainId,
        principleId,
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
      this.$refs["comment-modal"].show();
    },
    async showModalSave(indicator) {
      await this.saveAndContinue();
      setTimeout(() => {
        this.copyToClipboard();
        this.$refs["save-modal"].show();
      }, 150);
    },
    copyToClipboard() {
      const dummy = document.createElement("input");
      const text = window.location.href;
      this.copyUrl = text;

      document.body.appendChild(dummy);
      dummy.value = text;
      dummy.select();
      document.execCommand("copy");
      document.body.removeChild(dummy);
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
      this.$refs["comment-modal"].hide();
    },
    cancelModal() {
      this.$refs["comment-modal"].hide();
    },
    cancelSaveModal() {
      this.$refs["save-modal"].hide();
    },
    cancelExitModal() {
      this.$refs["exit-modal"].hide();
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
      // this.analysis.email = this.analysis.email || this.application.attributes.emptyEmail;
      this.analysis.organization = this.analysis.organization || "";
      const headers = {
        headers: {
          Authorization: `Bearer ${process.env.apiToken}`,
          "Content-Type": "application/json",
        },
      };
      if (this.analysis.uid === null) {
        this.analysis.uid = uuidv4();
        const post = {
          data: {
            ...this.analysis,
            email:
              this.analysis.email || this.application.attributes.emptyEmail,
          },
        };
        // delete post.data.id
        var { data } = await this.$axios.post(`/analyses`, post, headers);

        this.analysis.id = data.data.id;
      } else {
        const post = {
          data: {
            ...this.analysis,
            email:
              this.analysis.email || this.application.attributes.emptyEmail,
          },
        };

        var { data } = await this.$axios.put(
          `/analyses/${this.analysis.id}`,
          post,
          headers
        );
      }
    },
    async saveAndResults() {
      await this.save();

      this.$router.push(
        this.localePath({
          name: "template-view-all",
          params: { slug: this.slug, q: this.questionnaire.attributes.slug, uid: this.analysis.uid },
          query: { org: this.organization },
        })
      );
    },
    async saveAndContinue() {
      await this.save();

      this.$router.push(
        this.localePath({
          name: "template-template-q",
          params: {
            template: this.slug,
            q: this.questionnaire.attributes.slug,
          },
          query: {
            r: this.analysis.uid,
            org: this.organization,
          },
          hash: window.location.hash,
        })
      );
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
    principleIsAnswered(domainId, principleId) {
      const domain = this.answersTree.find((a) => a.id === domainId);
      return domain.principles.find((p) => p.id === principleId).answered;
    },
    askExit() {
      console.log("this.$refs", this.$refs);
      if (this.$refs["exit-modal"]) {
        this.$refs["exit-modal"].show();
      } else {
        setTimeout(() => {
          this.$refs["exit-modal"].show();
        }, 100);
      }
    },
    exit() {
      const url = "/";
      this.$router.push(
        this.localePath({
          name: "index",
          params: { slug: this.slug, q: this.questionnaire.attributes.slug },
          query: { org: this.organization },
        })
      );
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
  nuxtI18n: {
    paths: {
      ca: "/sismograf/:template/:q",
      en: "/seismograph/:template/:q",
      es: "/sismografo/:template/:q",
    },
  },
};
</script>
  
  
  <style scoped>
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
  color: #020034;
  text-decoration: none;
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
.breadcrumb {
  position: absolute;
  top: 2.5rem;
  left: 3rem;
  width: calc(100% - 10vw);
  background: transparent;
}
.breadcrumb a {
  color: #020034;
}
.breadcrumb span {
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
  background: #FBF7EB url("~@/assets/images/bg01_1920.png") no-repeat top center;
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
    background: #FBF7EB url("~@/assets/images/bg01_1920.png") no-repeat top
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
</style>
  