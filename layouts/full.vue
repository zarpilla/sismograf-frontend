<template>
  <div class="full-page-container">
    <nuxt-link to="/" class="navbar-item navbar-abs">
      <img
        src="~assets/resilience_earth_w.svg"
        alt="Resilience.earth"            
        height="80"
      >
    </nuxt-link>
    <div class="xcontainer">
      <nuxt />
    </div>    
  </div>
</template>

<style>
.navbar-abs{
  position: absolute;
  z-index: 10;
}
.navbar-abs img{
  margin-top: 5px;
  margin-left: 5px;
}
</style>