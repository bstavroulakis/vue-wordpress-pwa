export default (url, callback) => {
  const script = document.createElement('script')
  callback = callback || (() => {})
  if (script.readyState) {
    script.onreadystatechange = () => {
      if (script.readyState === 'loaded' || script.readyState === 'complete') {
        script.onreadystatechange = null
        callback()
      }
    }
  } else {
    script.onload = () => { callback() }
  }
  script.async = true
  document.getElementsByTagName('head')[0].appendChild(script)
  script.src = url
  return script
}
