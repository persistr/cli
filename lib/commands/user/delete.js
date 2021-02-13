module.exports = {
  summary: 'delete user account',
  args: {
    USERNAME: 'username'
  },
  description: `
    Delete a user account, including all data owned by the account. If you don't
    want to lose data, transfer ownership over databases to a different account
    prior to account deletion.

    Databases are deleted when the only owner is the user account being deleted.
    If a database has multiple owners then the database won't be deleted. In that
    case, the user account being deleted will be removed from the list of owners and
    the other database owners will remain.

    You will be prompted to authenticate with root credentials.
  `,
  examples: [
    '$ persistr user:delete myusername'
  ],
  run: async (toolbox, args) => {
    const { log, persistr, prompts, settings } = toolbox

    const { rootUsername } = await prompts({ type: 'text', name: 'rootUsername', message: 'Root username?' })
    const { rootPassword } = await prompts({ type: 'text', name: 'rootPassword', message: 'Root password?' })

    const connection = await persistr.connect({
      server: settings.server,
      credentials: { username: rootUsername, password: rootPassword }
    })

    await connection.account({ username: args.USERNAME }).destroy()
    log(`Account deleted`)
  }
}
