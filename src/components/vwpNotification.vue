<template>
  <div id="vwp-notification">
    <div v-on:click="hideNotificationBtn" v-bind:class="{'hidden':appNotification.hidden}">
      <div class="notification is-danger">
        <button class="delete"></button>
        {{appNotification.message}}
      </div>
    </div>
  </div>
</template> 

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'vwp-notification',
  data: () => {
    return { 
    }
  },
  computed: {
    ...mapGetters([
      'appNotification'
    ])
  },
  methods: {
    ...mapActions([
      'showNotification',
      'hideNotification'
    ]),
    hideNotificationBtn: function(){
      this.hideNotification();
    }
  },
  created(){
    
  }
}
</script>

<style>
  #vwp-notification{
    position: fixed;
    top:10px;
    right:10px;
    width:300px;
    z-index:3;
  }
  #vwp-notification .hidden{
    display: none;
  }
</style>