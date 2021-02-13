module.exports = {
  summary: 'display name of logged-in user',
  description: `
    Displays the username and full name of the user currently logged in.
  `,
  examples: [
    '$ persistr user:whoami'
  ],
  labels: [ 'logged-in' ],
  run: async (toolbox, args) => {
    const { connection, log, settings, session } = toolbox
    const profile = await connection.account().profile()
    log(`${session.username} "${profile.name}" is logged into ${settings.server ? 'Persistr Server at ' + settings.server : 'Persistr Cloud'}`)
  }
}
