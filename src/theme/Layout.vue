<template>
  <div id="app">
    <app-header></app-header>
    <section class="main-section section">
      <div class="container content">
        <router-view></router-view>
      </div>
    </section>
    <app-footer></app-footer>
    <ga-analytics ua="UA-31484897-2"></ga-analytics>
  </div>
</template>

<script>
import AppHeader from './AppHeader.vue'
import AppFooter from './AppFooter.vue'
import gaAnalytics from 'components/gaAnalytics.vue'

export default {
  name: 'app',
  components: {
    'app-header': AppHeader,
    'app-footer': AppFooter,
    'ga-analytics': gaAnalytics
  }
}
</script>

<style lang="scss">
  @import '../_variables';
  @import '~bulma';
  @import '../assets/fontello/css/fontello.css';

  #app > .main-section{
    background-color: $background;
  }
  #app > .main-section.section{
    min-height: 800px;
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
  .display-inline{
    display: inline-block;
  }
  .control {
    position: relative;
    text-align: left;
  }
  .control.is-grouped>.control.is-expanded {
    flex-grow: 1;
    flex-shrink: 1;
  }
  .control.is-grouped>.control:not(:last-child) {
    margin-bottom: 0;
    margin-right: .75rem;
  }
  .control.is-grouped {
    display: flex;
    justify-content: flex-start;
  }
  .control.is-grouped>.control {
    flex-basis: 0;
    flex-shrink: 0;
  }
  .alignleft{
    float: left;
    padding-right: 10px;
  }
</style>
