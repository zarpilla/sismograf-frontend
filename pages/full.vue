<template>
  <div class="fullpage-container">

    <full-page ref="fullpage" :options="options" id="fullpage">
        <div class="section">First section ...</div>
        <div class="section">Second section ...</div>
      </full-page>


    <!-- <div class="button-group">
      <button type="button" :class="{active:index ==0}" @click="moveTo(0)">first page</button>
      <button type="button" :class="{active:index ==1}" @click="moveTo(1)">Second page</button>
      <button type="button" :class="{active:index ==2}" @click="moveTo(2)">Third page</button>
      <button type="button" v-for="btn in pageNum" v-bind:key="btn" :class="{active:index == btn + 2}" @click="moveTo(btn+2)">page {{btn+2}}
      </button>
      <button type="button" @click="showPage()">add page</button>
    </div>
    <div class="fullpage-wp" v-fullpage="opts" ref="fullpage">
      <div class="page-1 page">
        <h1 class="part-1" v-animate="{value: 'bounceInLeft'}">vue-fullpage.js</h1>
        <h3 class="" v-animate="{value: 'bounceInLeft'}">A sigle-page scroll plugin based on vue@2.x,support for mobile and PC .</h3>
        <div>
          <p class="part-1" v-animate="{value: 'bounceInRight'}">vue-fullpage</p>
        </div>
      </div>
      <div class="page-2 page">
        <h2 class="part-2" v-animate="{value: 'bounceInRight'}">Easy to use plugin</h2>
      </div>
      <div class="page-3 page">
        <h2 class="" v-animate="{value: 'bounceInTop'}">Working On Tablets</h2>
        <h3 class="" v-animate="{value: 'bounceInBotton'}">Designed to fit different screen sizes as well as tablet and mobile devices. </h3>
        <p class="part-3" v-animate="{value: 'bounceInLeft', delay: 0}">vue-fullpage</p>
        <p class="part-3" v-animate="{value: 'bounceInRight', delay: 300}">vue-fullpage</p>
        <p class="part-3" v-animate="{value: 'bounceInDown', delay: 600}">vue-fullpage</p>
        <p class="part-3" v-animate="{value: 'zoomInDown', delay: 900}">vue-fullpage</p>
      </div>
      <div class="page-2 page" v-for="page in pageNum" v-bind:key="page">
        <h2 class="part-2" v-animate="{value: 'bounceInRight'}">page {{page}}</h2>
      </div>
    </div> -->
  </div>
</template>

<script>
  export default {
    name: 'Fullpage',
    data () {
      return {
        index: 0,
        pageNum: 0,
        options: {
          scrollOverflow: false,
          licenseKey: 'z',
          menu: '#menu',
          sectionsColor: ['#55AFB8', '#394335', '#4A8FAD', '#87dbb3', '#DB8077', '#394335', '#4A8FAD', '#87dbb3', '#DB8077', '#394335', '#4A8FAD', '#87dbb3', '#DB8077', '#394335', '#4A8FAD', '#87dbb3', '#DB8077', '#55AFB8', '#55AFB8', '#55AFB8', '#55AFB8', '#55AFB8', '#55AFB8', '#55AFB8'],
          navigation: true
        },
        opts: {
          start: 0,
          dir: 'v',
          loop: false,
          duration: 300,
          navigation: true,
          beforeChange: function (ele, current, next) {
            console.log('before', current, next)
            this.index = next
          },
          afterChange: function (ele, current) {
            this.index = current
            console.log('after', current)
          }
        }
      }
    },
    methods: {
      moveTo: function (index) {
        this.$refs.fullpage.$fullpage.moveTo(index, true)
      },
      showPage: function () {
        this.pageNum++
        this.$refs.fullpage.$fullpage.$update()
      }
    }
  }
</script>

<style>
  body {
    margin: 0;
  }
  .fullpage-container {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
  .page {
    display: block;
    text-align: center;
    font-size: 26px;
    color: #eee;
  }
  .page-1 {
    padding-top: 100px;
    background: #1bbc9b;
  }
  .page-2 {
    padding-top: 100px;
    background-color: rgb(75, 191, 195);
  }
  .page-3 {
    padding-top: 50px;
    background: #aabbcc;
  }
  h3,
  p {
    font-size: 16px;
  }
  .button-group {
    position: absolute;
    top: 30px;
    left: 30px;
    z-index: 9;
  }
  .button-group button {
    display: inline-block;
    margin: 10px;
    color: #000;
    background: #fff;
    background: rgba(255, 255, 255, .5);
    -webkit-border-radius: 10px;
    border-radius: 10px;
    padding: 9px 18px;
    border: none;
    outline: none;
  }
  .button-group button.active {
    background: rgba(0, 0, 0, .5);
    color: #fff;
  }
</style>