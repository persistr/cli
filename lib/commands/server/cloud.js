module.exports = {
  summary: 'connect to Persistr Cloud',
  description: `
    Persistr Cloud offers fully-managed cloud-hosted Persistr Server instances.
    Sign up on https://cloud.persistr.com
  `,
  examples: [
    '$ persistr server:cloud'
  ],
  run: async (toolbox, args) => {
    const { settings } = toolbox
    delete settings.server
  }
}
