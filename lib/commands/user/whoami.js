module.exports = {
  summary: 'display email and name of logged-in user',
  description: `
    Displays the email address and full name of the user currently logged in.
  `,
  examples: [
    '$ persistr user:whoami'
  ],
  labels: [ 'logged-in' ],
  run: async (toolbox, args) => {
    const { account, log, settings, session } = toolbox

    log(`${session.email} is logged into ${settings.server ? 'Persistr Server at ' + settings.server : 'Persistr Cloud'}`)

    const details = await account.details()
    log(`${details.name}`)
  }
}
