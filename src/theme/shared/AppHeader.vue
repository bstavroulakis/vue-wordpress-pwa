<template>
    <nav id="app-header" class="nav has-shadow">
    <div class="container">
      <router-link to="/category/blog/" class="nav-item"><img src="../../assets/logo-horizontal.png" id="vwp-logo" v-bind:alt="siteName" /></router-link>
      <span class="nav-toggle" v-on:click="toggleMenu">
        <span></span>
        <span></span>
        <span></span>
      </span>
      <div v-bind:class="{ 'nav-right nav-menu': true, 'is-active': isMenuActive }">
          <template v-for="(item, index) in blogMenu" v-if="item.type_label === 'Page'">
            <span v-on:click="closeMenu">
              <router-link class="is-tab nav-item" v-bind:to="'/page' + item.url">{{item.title}}</router-link>
            </span>
          </template>
          <template v-else>
            <span v-on:click="closeMenu">
              <router-link  class="is-tab nav-item" v-bind:to="item.url">{{item.title}}</router-link>
            </span>
          </template>

        <span class="nav-item">
          <a class="button" target="_blank" href="https://twitter.com/bstavroulakis">
            <span class="icon">
              <i class="icon-twitter"></i>
            </span>
            <span>Bill Stavroulakis</span>
          </a>
        </span>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'app-header',
  data: () => {
    return { 
      isMenuActive: false,
      siteName: ""
    }
  },
  computed: {
    ...mapGetters([
      'blogMenu'
    ])
  },
  methods: {
    toggleMenu(){
      this.isMenuActive = !this.isMenuActive;
    },
    closeMenu(){
      this.isMenuActive = false;
    }
  },
  created(){
    let self = this;
    require.ensure(['../../app.service.js','../../app.config.js'], function(){
      let wordpressService  = require('../../app.service.js').default
      let Config = require('../../app.config.js');
      wordpressService.getMenuByName(self, 'Main');
      self.siteName = Config.appName;
    });
  }
}
</script>

<style>
  #vwp-logo{
     max-width:350px;
     max-height:3rem;
  }
  #app-header .nav-menu > span > a{
    line-height: 3rem;
    vertical-align: middle;
  }
  .nav-toggle{
    position:absolute;
    right:0;
  }
</style>