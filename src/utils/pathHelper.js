let pathHelper = {
  getRelativePath : (url) => {
    var parts = url.replace('://','').split('/');
    return (parts.length > 2) ? parts[1] : parts[0];
  }
}

export default pathHelper