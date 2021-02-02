module.exports = {
  summary: 'revoke database access',
  args: {
    EMAIL: 'user account',
    DB: 'database'
  },
  description: `
    Revokes access to the specified DB database for EMAIL user account
  `,
  examples: [
    '$ persistr access:revoke user@myemail.com mydb'
  ],
  labels: [ 'logged-in' ],
  run: async (toolbox, args) => {
    const { account, log, session } = toolbox
    await account.db(args.DB).revoke({ email: args.EMAIL })
    log(`Revoked access to ${args.DB} for ${args.EMAIL}`)
  }
}
