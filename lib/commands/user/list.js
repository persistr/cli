module.exports = {
  summary: 'list user accounts',
  description: `
    List all user accounts.

    You will be prompted to authenticate with root credentials.
  `,
  examples: [
    '$ persistr user:list'
  ],
  run: async (toolbox, args) => {
    const { log, persistr, prompts, settings } = toolbox

    const { rootUsername } = await prompts({ type: 'text', name: 'rootUsername', message: 'Root username?' })
    const { rootPassword } = await prompts({ type: 'text', name: 'rootPassword', message: 'Root password?' })

    const connection = await persistr.connect({
      server: settings.server,
      credentials: { username: rootUsername, password: rootPassword }
    })

    const accounts = await connection.accounts().all()
    accounts.forEach(account => log(`[${account.isActive ? 'active' : 'inactive'}] ${account.username} "${account.name}"`))
    log(`${accounts.length} account${accounts.length === 1 ? '' : 's'}`)
  }
}
