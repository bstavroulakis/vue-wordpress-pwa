import Config from '../app.config.js'

let pathHelper = {
  getRelativePath : (url) => {
     return ('/' + url.replace(Config.wpDomain,"")).replace('//','/');
  }
}

export default pathHelper