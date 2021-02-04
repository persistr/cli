module.exports = {
  summary: 'revoke database access',
  args: {
    USERNAME: 'username',
    DB: 'database'
  },
  description: `
    Revokes access to the specified DB database for USERNAME user account
  `,
  examples: [
    '$ persistr access:revoke myusername mydb'
  ],
  labels: [ 'logged-in' ],
  run: async (toolbox, args) => {
    const { connection, log, session } = toolbox
    await connection.use(args.DB).revoke({ username: args.USERNAME })
    log(`Revoked access to ${args.DB} for ${args.USERNAME}`)
  }
}
