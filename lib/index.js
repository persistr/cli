const { build } = require('@persistr/clif')
const pkg = require('../package.json')
const commands = require('./commands')

// Configure the Persistr CLI.
const cli = build(pkg.name, 'persistr', pkg.repository.url.replace(/\.git$/, ''))
  .plugins([
    require('@persistr/clif-plugin-settings'),
    require('@persistr/clif-plugin-persistr'),
    require('@persistr/clif-plugin-json5')
  ])
  .version(pkg.version, '-v, --version')
  .description(pkg.description)
  .commands(commands)
  .done()

module.exports = cli
