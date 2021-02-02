module.exports = {
  summary: 'grant database access',
  args: {
    ROLE: { description: 'role', validate: ROLE => {
      if (!['owner', 'admin', 'member', 'reader'].includes(ROLE.toLowerCase())) {
        throw new Error(`Invalid role '${ROLE}'`)
      }
    }},
    EMAIL: 'user account',
    DB: 'database'
  },
  description: `
    Grants ROLE to EMAIL user account on the specified DB database

    Available roles are:
    reader - read-only access to database
    member - read/write access to database
    admin - read/write access + invite members
    owner - full control including deleting data and accounts
  `,
  examples: [
    '$ persistr access:grant reader user@myemail.com mydb',
    '$ persistr access:grant admin user@myemail.com mydb'
  ],
  labels: [ 'logged-in' ],
  run: async (toolbox, args) => {
    const { account, log, session } = toolbox
    await account.db(args.DB).grant({ role: args.ROLE.toLowerCase(), email: args.EMAIL })
    log(`Granted ${args.ROLE.toLowerCase()} role to ${args.EMAIL} on ${args.DB}`)
  }
}
