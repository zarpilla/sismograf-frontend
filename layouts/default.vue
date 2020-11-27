<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <nuxt-link to="/" class="navbar-item">
          <img
            src="~assets/resilience_earth_w.svg"
            alt="Resilience.earth"            
            height="48"
          >
        </nuxt-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li
            v-for="(item, key) of items"
            :key="key"
            class="nav-item"
          >
            <nuxt-link
              :to="localePath({ name: item.to.name })"
              class="nav-link"
              exact-active-class="is-active"
            >
              {{ item.title }}
            </nuxt-link>
          </li>
        </ul>
      </div>
    </nav>

    <div class="container">
      <nuxt />
    </div>

  </div>
</template>

<script>
export default {
  data () {
    return {
      items: [
        {
          title: 'Home',
          icon: 'home',
          to: { name: 'index' }
        },
        {
          title: 'Analyses',
          icon: 'lightbulb',
          to: { name: 'analysis' }
        },
        // {
        //   title: 'full',
        //   icon: 'lightbulb',
        //   to: { name: 'full' }
        // }
      ]
    }
  }
}
</script>
<style>
.navbar.bg-dark{background: #1f1f1f!important;}
.navbar-item img{max-height: 5rem;}
.menu-list a.is-active{background-color:#1f1f1f;}
.navbar.is-primary .navbar-brand > a.navbar-item:focus,.navbar.is-primary .navbar-brand > a.navbar-item:hover{background-color:#1f1f1f;} 
a{color: #1f1f1f;}
</style>