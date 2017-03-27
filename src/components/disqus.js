  /**
   *  RECOMMENDED CONFIGURATION VARIABLES: EDIT AND UNCOMMENT THE SECTION BELOW TO INSERT DYNAMIC VALUES FROM YOUR PLATFORM OR CMS.
   *  LEARN WHY DEFINING THESE VARIABLES IS IMPORTANT: https://disqus.com/admin/universalcode/#configuration-variables
   */
  /*
  var disqus_config = function () {
      this.page.url = PAGE_URL;  // Replace PAGE_URL with your page's canonical URL variable
      this.page.identifier = PAGE_IDENTIFIER; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
  };
  */
(function (id) {  // DON'T EDIT BELOW THIS LINE
  let d = document
  let s = d.createElement('script')
  let dateNow = new Date()
  if (d.getElementById(id)) { return }
  s.src = 'https://bstavroulakis.disqus.com/embed.js'
  s.id = id
  s.setAttribute('data-timestamp', dateNow)
  let appendDom = (d.head || d.body)
  appendDom.appendChild(s)
})('disqus-wjs')

export {

}
