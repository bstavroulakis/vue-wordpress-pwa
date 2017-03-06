<template>
  <div id="vwp-single">
    <div v-if="single.content">

      <router-link :to="'/category/' + single.pure_taxonomies.categories[0].slug + '/'" class="single-back button is-pulled-left">
        <span class="icon">
          <i class="icon-left-big"></i>
        </span>
        <span>Back</span>
      </router-link>

      <h1 v-html="single.title.rendered"></h1>
      <div class="single-content card">
        <div class="is-pulled-left" v-if="single.tags.length > 0">
          <i class="icon-tags" aria-hidden="true"></i>
          <span class="tag" v-for="tag in single.pure_taxonomies.tags">
            {{tag.name}}
          </span>
        </div>
        <div class="is-pulled-right single-date">{{new Date(single.date).toDateString()}}</div>
        <div class="is-clearfix"></div>
        <div class="card-content">
          <div v-html="single.content.rendered"></div>
          <p class="is-clearfix"></p>
          <a :href="single.rest_api_enabler.Link" target="_blank">{{single.rest_api_enabler.Link}}</a>
        </div>
      </div>
    </div>
    <div class="is-clearfix"></div>
  </div>
</template>

<script>
export default {
  name: 'vwp-single',
  props: ['single']
}
</script>

<style lang="scss">
  @import '../theme/_variables';
  #vwp-single{ 
    pre {
      white-space: pre-wrap;
      white-space: -moz-pre-wrap;
      white-space: -pre-wrap;
      white-space: -o-pre-wrap;
      word-wrap: break-word;
      }
    .single-content{
      background-color: $white;
      padding:20px;
      display:inline-block;
      width:100%;
    }
    .single-back{
      margin-right: 1rem;
    }
    .single-date{
      font-style: italic;
      font-size: $size-7;
    }
  }
</style>
