<template>
    <div id="vwp-post-card" :class="{'card':true,'new':isNew(post.date)}">
      <div class="card-image">
        <figure class="image" v-if="post.better_featured_image && post.better_featured_image.media_details.sizes.medium">
          <img v-bind:src="post.better_featured_image.media_details.sizes.medium.source_url" v-bind:alt="post.better_featured_image.description">
        </figure>
      </div>
      <div class="card-content">
        <div class="content">
          <div v-if="isNew(post.date)" class="is-new">new</div>
          <div class="post-title">
            <router-link :to="'/category/' + category.slug + '/' + post.slug" v-html="post.title.rendered"></router-link>
          </div>
          <p class="is-clearfix"></p>
          <div v-html="post.excerpt.rendered"></div>
          <span v-for="tag in post.tags">#{{tag}}</span>
          <br>
          <small>{{post.date}}</small>
        </div>
      </div>
      <footer class="card-footer">
        <router-link :to="'/category/' + category.slug + '/' + post.slug" class="card-footer-item">Read More</router-link>
      </footer>
    </div>
</template>

<script>
export default {
  name: 'vwp-post-card',
  props: ['post', 'category', 'newFlag'],
  methods: {
    isNew: function (postDateStr) {
      let postDate = new Date(postDateStr)
      postDate.setDate(postDate.getDate() + 6)
      // If new flag is set and it is posted in the last 6 days
      return (this.newFlag && postDate.getTime() - (new Date().getTime()) > 0)
    }
  }
}
</script>

<style lang="scss">
  @import '../_variables';
  #vwp-post-card{
    min-height: 350px;
    padding-bottom: 40px;
    height:100%;
    &.new{
      border: 1px solid #898989;
    }
    .post-title a{
      font-size: $size-4;
      color: $primary;
      padding:0 0 10px 0;
      font-weight: bold;
    }
    .card-image img{
      max-height:250px;
      width: auto;
      margin: 0 auto;
    }
    .content{
      word-break: normal;
      word-wrap: break-word;
      .is-new{
        float:right;
        font-size:80%;
        font-style: italic;
      }
    }
    footer{
      position: absolute;
      bottom: 0;
      width: 100%;
      left: 0;
    }
  }
</style>
