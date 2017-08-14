(function (id) {
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
