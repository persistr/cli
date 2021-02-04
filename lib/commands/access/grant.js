module.exports = {
  summary: 'grant database access',
  args: {
    ROLE: { description: 'role', validate: ROLE => {
      if (!['owner', 'admin', 'member', 'reader'].includes(ROLE.toLowerCase())) {
        throw new Error(`Invalid role '${ROLE}'`)
      }
    }},
    USERNAME: 'username',
    DB: 'database'
  },
  description: `
    Grants ROLE to USERNAME user account on the specified DB database

    Available roles are:
    reader - read-only access to database
    member - read/write access to database
    admin - read/write access + invite members
    owner - full control including deleting data and accounts
  `,
  examples: [
    '$ persistr access:grant reader myusername mydb',
    '$ persistr access:grant admin myusername mydb'
  ],
  labels: [ 'logged-in' ],
  run: async (toolbox, args) => {
    const { connection, log, session } = toolbox
    await connection.use(args.DB).grant({ role: args.ROLE.toLowerCase(), username: args.USERNAME })
    log(`Granted ${args.ROLE.toLowerCase()} role to ${args.USERNAME} on ${args.DB}`)
  }
}
