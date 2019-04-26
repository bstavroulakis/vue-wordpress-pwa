<template>
  <div class="vwp-single">
    <div v-if="single && single.content">
      <div v-show="!hideBack">
        <router-link
          :to="'/category/' + single.pure_taxonomies.categories[0].slug + '/'"
          class="single-back button is-pulled-left"
        >
          <span class="icon">
            <i class="icon-left-big"></i>
          </span>
          <span>{{ single.pure_taxonomies.categories[0].name }}</span>
        </router-link>
      </div>
      <h1 v-html="single.title.rendered"></h1>
      <div class="single-content card">
        <div
          class="is-pulled-left"
          v-if="single.tags && single.tags.length > 0"
        >
          <i class="icon-tags" aria-hidden="true"></i>
          <span
            class="tag"
            v-for="tag in single.pure_taxonomies.tags"
            v-bind:key="tag.id"
          >
            {{ tag.name }}
          </span>
        </div>
        <div class="is-pulled-right single-date">
          {{new Date(single.date).toDateString()}}
        </div>
        <div class="is-clearfix"></div>
        <div class="card-content">
          <div v-html="single.content.rendered"></div>
          <p class="is-clearfix"></p>
          <div v-if="single.rest_api_enabler && single.rest_api_enabler.Link">
            <a :href="single.rest_api_enabler.Link" target="_blank">{{
              single.rest_api_enabler.Link
            }}</a>
          </div>
        </div>
      </div>
    </div>
    <div class="is-clearfix"></div>
  </div>
</template>

<script>
  export default {
    props: ["single", "hideBack"]
  };
</script>

<style lang="scss">
  @import "../_variables";
  .vwp-single {
    pre {
      white-space: pre-wrap;
      white-space: -moz-pre-wrap;
      white-space: -pre-wrap;
      white-space: -o-pre-wrap;
      word-wrap: break-word;
    }
    .single-content {
      background-color: $white;
      padding: 20px;
      display: inline-block;
      width: 100%;
    }
    .single-back {
      margin-right: 1rem;
    }
    .single-date {
      font-style: italic;
      font-size: $size-7;
    }
  }
</style>
