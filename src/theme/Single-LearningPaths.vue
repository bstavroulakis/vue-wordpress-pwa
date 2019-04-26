<template>
  <div>
    <div class="columns">
      <div class="column is-three-quarters">
        <div v-if="single && getPrev(single.id)" class="is-pulled-left">
          <router-link :to="'./' + getPrev(single.id)" class="button">
            <span class="icon">
              <i class="icon-left-big"></i>
            </span>
            <span>Previous</span>
          </router-link>
        </div>
        <div v-if="single && getNext(single.id)" class="is-pulled-right">
          <router-link :to="'./' + getNext(single.id)" class="button">
            <span class="icon">
              <i class="icon-right-big"></i>
            </span>
            <span>Next</span>
          </router-link>
        </div>
        <div class="is-clearfix"></div>
        <div v-if="!single || !single.slug">
          <h1>Loading...</h1>
          <div class="single-content fake-single-content card"></div>
        </div>
        <vwp-single :single="single" hideBack="true"></vwp-single>
      </div>
      <div class="column is-one-quarter">
        <aside class="menu">
          <p class="menu-label">
            Table of Contents
          </p>
          <ul class="menu-list">
            <li v-for="(item) in posts" v-bind:key="item.slug">
              <router-link
                :to="'./' + item.slug"
                v-html="item.title.rendered"
              ></router-link>
            </li>
          </ul>
        </aside>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from "vuex";
  import VwpSingle from "components/vwpSingle.vue";

  const fetchInitialData = (store, route) => {
    return store.dispatch(`learningPaths/getPath`, {
      categorySlug: route.params.id,
      page: route.params.page
    });
  };
  export default {
    name: "ThemeSingleLearningPaths",
    components: {
      "vwp-single": VwpSingle
    },
    computed: {
      ...mapGetters("learningPaths", ["posts", "single"])
    },
    methods: {
      getPrev: function() {
        var self = this;
        for (var i = 0; i < self.posts.length; i++) {
          if (i > 0 && self.posts[i].id === self.single.id) {
            return self.posts[i - 1].slug;
          }
        }
      },
      getNext: function() {
        var self = this;
        var postLength = self.posts.length;
        for (var i = 0; i < postLength; i++) {
          if (i < postLength - 1 && self.posts[i].id === self.single.id) {
            return self.posts[i + 1].slug;
          }
        }
      },
      ...mapActions("learningPaths", {
        getPost: "getPost"
      }),
      loadData() {
        fetchInitialData(this.$store, this.$route);
      }
    },
    watch: {
      $route(to, from) {
        this.getPost({ page: to.params.page });
      }
    },
    prefetch: fetchInitialData,
    mounted() {
      this.loadData();
    }
  };
</script>
