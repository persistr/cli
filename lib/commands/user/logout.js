module.exports = {
  summary: 'logout from Persistr Server',
  description: `
    Logs you out
  `,
  examples: [
    '$ persistr user:logout'
  ],
  labels: [ 'logged-in' ],
  run: async (toolbox, args) => {
    const { log, session } = toolbox
    const username = await session.end()
    log(`${username} logged out`)
  }
}
