
var fs = require('fs')
var wipeDependencies = function () {
  var file = fs.readFileSync('package.json')
  var content = JSON.parse(file)

  for (var devDep in content.devDependencies) {
    content.devDependencies[devDep] = '*'
  }

  for (var dep in content.dependencies) {
    content.dependencies[dep] = '*'
  }

  fs.writeFileSync('package.json', JSON.stringify(content))
}

if (require.main === module) {
  wipeDependencies()
} else {
  module.exports = wipeDependencies
}
