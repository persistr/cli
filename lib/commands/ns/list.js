module.exports = {
  summary: 'list namespaces',
  args: {
    DB: 'database name'
  },
  description: `
    Lists namespaces in database DB.
  `,
  examples: [
    '$ persistr ns:list mydb'
  ],
  labels: [ 'logged-in' ],
  run: async (toolbox, args) => {
    const { connection, log, session } = toolbox

    // Get a list of namespaces.
    const namespaces = await connection.use(args.DB).namespaces().all()

    // Display namespaces.
    namespaces.forEach(ns => log(`${ns.name}`))
    log(`${namespaces.length} namespace${namespaces.length === 1 ? '' : 's'}`)
  }
}
