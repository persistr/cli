module.exports = {
  summary: 'list database access',
  args: {
    ROLE: { description: 'role', optional: true, validate: ROLE => {
      if (!['owner', 'admin', 'member', 'reader'].includes(ROLE.toLowerCase())) {
        throw new Error(`Invalid role '${ROLE}'`)
      }
    }}
  },
  description: `
    Lists databases you have access to along with the access role you have for each
    database.

    If ROLE is provided then only databases to which you have been given ROLE access
    will be listed.
  `,
  examples: [
    '$ persistr access:list',
    '$ persistr access:list admin'
  ],
  labels: [ 'logged-in' ],
  run: async (toolbox, args) => {
    const { connection, log, persistr, session, settings } = toolbox

    // Get a list of databases that the logged-in user has access to.
    const access = await connection.details()

    // Filter by given role.
    if (args.ROLE) access.dbs = access.dbs.filter(db => db.role.toLowerCase() === args.ROLE.toLowerCase())

    // Display databases.
    access.dbs.forEach(db => log(`[${db.role}] ${db.name}`))
    log(`${access.dbs.length} database${access.dbs.length === 1 ? '' : 's'}${args.ROLE ? ' where role=' + args.ROLE : ''}`)
  }
}
