module.exports = {
  summary: 'displays which server the CLI is configured to connect to',
  description: `
    Displays whether the CLI is configured to use Persistr Cloud or a hosted
    Persistr Server instance.
  `,
  examples: [
    '$ persistr server:show'
  ],
  run: async (toolbox, args) => {
    const { log, settings } = toolbox

    // Display server configuration.
    if (settings.server) return log('Persistr Server at %s', settings.server)
    return log('Persistr Cloud')
  }
}
