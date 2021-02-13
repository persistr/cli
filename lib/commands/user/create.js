module.exports = {
  summary: 'create a new user account',
  args: {
    FULLNAME: 'full name (first and last name)',
    USERNAME: 'username',
    PASSWORD: { description: 'password', optional: true }
  },
  description: `
    Create a new user account. If you don't provide a password as an argument,
    you will be prompted to enter one in.

    You will be prompted to authenticate with root credentials.
  `,
  examples: [
    '$ persistr user:create "John Doe" myusername',
    '$ persistr user:create "John Doe" myusername mypassword'
  ],
  run: async (toolbox, args) => {
    const { log, persistr, prompts, settings } = toolbox

    if (!args.PASSWORD) {
      const response = await prompts({ type: 'password', name: 'password', message: 'Password?' })
      args.PASSWORD = response.password
    }

    const { rootUsername } = await prompts({ type: 'text', name: 'rootUsername', message: 'Root username?' })
    const { rootPassword } = await prompts({ type: 'text', name: 'rootPassword', message: 'Root password?' })

    const connection = await persistr.connect({
      server: settings.server,
      credentials: { username: rootUsername, password: rootPassword }
    })

    await connection.account({ name: args.FULLNAME, username: args.USERNAME }).create({ password: args.PASSWORD })
    log(`Account created`)
  }
}
