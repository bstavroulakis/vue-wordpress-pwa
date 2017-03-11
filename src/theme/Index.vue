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
    <ga-analytics ua="UA-31484897-2"></ga-analytics>
  </div>
</template>

<script>

export default {
  name: 'app',
  components: { 
    'app-header': require('./shared/AppHeader.vue'),
    'app-footer': require('./shared/AppFooter.vue'),
    'vwp-notification': require('../components/vwpNotification.vue'),
    'ga-analytics': require('../components/gaAnalytics.vue')
  }
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
  .fake-card{
    min-height: 300px;
  }
  .fake-single-content {
    min-height: 500px;
  }
  .is-fullwidth{
    width: 100%;
  }
</style>
