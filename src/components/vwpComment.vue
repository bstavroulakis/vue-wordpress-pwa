<template>
  <div id="disqus_thread"></div>
</template>

<script>
export default {
  name: 'vwp-comment',
  created () {
    const inBrowser = typeof window !== 'undefined'
    if (!inBrowser) {
      return
    }
    require.ensure(['../components/disqus.js'], () => {
      require('../components/disqus.js')
      setTimeout(() => {
        try {
          if (window.DISQUS !== null && window.DISQUS !== undefined) {
            window.DISQUS.reset({
              reload: true,
              config: function () {
                this.page.identifier = window.location.pathname
                this.page.url = window.location
              }
            })
          }
        } catch (ex) {}
      }, 100)
    })
  }
}
</script>