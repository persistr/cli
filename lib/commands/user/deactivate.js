module.exports = {
  summary: 'deactivate user account',
  args: {
    USERNAME: 'username'
  },
  description: `
    Deactivate a user account, preventing the user from logging in.

    You will be prompted to authenticate with root credentials.
  `,
  examples: [
    '$ persistr user:deactivate myusername'
  ],
  run: async (toolbox, args) => {
    const { log, persistr, prompts, settings } = toolbox

    const { rootUsername } = await prompts({ type: 'text', name: 'rootUsername', message: 'Root username?' })
    const { rootPassword } = await prompts({ type: 'text', name: 'rootPassword', message: 'Root password?' })

    const connection = await persistr.connect({
      server: settings.server,
      credentials: { username: rootUsername, password: rootPassword }
    })

    await connection.account({ username: args.USERNAME }).deactivate()
    log(`Account deactivated`)
  }
}
