module.exports = {
  summary: 'login to Persistr Server',
  args: {
    USERNAME: 'username',
    PASSWORD: { description: 'password', optional: true }
  },
  description: `
    Logs you into a Persistr Server. The server to log into depends on the settings
    you may have set previously with the server:cloud or server:url commands. By default,
    server:cloud is used.

    If you don't provide a password as an argument on the command-line, you will be
    prompted to enter one in.
  `,
  examples: [
    '$ persistr user:login myusername',
    '$ persistr user:login myusername mypassword'
  ],
  labels: [ 'logged-out' ],
  run: async (toolbox, args) => {
    const { log, prompts, session } = toolbox

    if (!args.PASSWORD) {
      const response = await prompts({ type: 'password', name: 'password', message: 'Password?' })
      args.PASSWORD = response.password
    }

    await session.begin({ username: args.USERNAME, password: args.PASSWORD })
    log(`${args.USERNAME} logged in`)
  }
}
