const { build } = require('@persistr/clif')
const pkg = require('../package.json')
const commands = require('./commands')

// Plugins.
const default_plugins = {
  settings: require('@persistr/clif-plugin-settings'),
  persistr: require('@persistr/clif-plugin-persistr'),
  json5: require('@persistr/clif-plugin-json5')
}

module.exports = {
  build: (options) => {
    // Configure the Persistr CLI.
    return build(pkg.name, 'persistr', pkg.repository.url.replace(/\.git$/, ''))
      .plugins(Object.values({ ...default_plugins, ...options?.plugins }))
      .toolbox(options?.toolbox)
      .version(pkg.version, '-v, --version')
      .description(pkg.description)
      .commands(commands)
      .done()
  }
}
