<template>
  <div id="app">
    <app-header></app-header>
    <section class="main-section section">
      <div class="container content">
        <router-view>
          <img alt="loading" src="../assets/loading.gif" />
        </router-view>
      </div>
    </section>
    <app-footer></app-footer>
    <vwp-notification></vwp-notification>
    <ga-analytics data-ud="UA-31484897-2"></ga-analytics>
  </div>
</template>

<script>
import VwpNotification from '../components/vwpNotification.vue'
import GaAnalytics from '../components/gaAnalytics.vue'
let AppHeader = require('./shared/AppHeader.vue');
let AppFooter = require('./shared/AppFooter.vue');

export default {
  name: 'app',
  components: { AppHeader, AppFooter, VwpNotification, GaAnalytics }
}
</script>

<style lang="scss">
  @import '_variables';
  @import '~bulma';
  @import '../assets/fontello/css/fontello.css';

  #app > .main-section{
    background-color: $background;
  }
  #app > .main-section.section{
    min-height: 530px;
  }
  .vwp-loading{
    text-align: center;
  }
</style>
