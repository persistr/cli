module.exports = {
  summary: 'connect to a hosted Persistr Server',
  args: {
    SERVER: 'server hostname'
  },
  description: `
    Host your own open-source Persistr Server instance anywhere you can
    run Node.js. Download the latest version of Persistr Server from
    https://github.com/persistr/server and follow our getting started instructions

    Server hostname should be given in this format:
      https://your.hostname.com
  `,
  examples: [
    '$ persistr server:url https://localhost:3010',
    '$ persistr server:url https://192.168.1.10',
    '$ persistr server:url https://my.hostname.com'
  ],
  run: async (toolbox, args) => {
    const { settings } = toolbox
    settings.server = args.SERVER
  }
}
