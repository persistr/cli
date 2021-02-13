module.exports = {
  summary: 'list databases',
  description: `
    List databases you have access to.
  `,
  examples: [
    '$ persistr db:list'
  ],
  labels: [ 'logged-in' ],
  run: async (toolbox, args) => {
    const { connection, log, session } = toolbox

    // Get a list of databases.
    const databases = await connection.databases().all()

    // Display databases.
    databases.forEach(db => log(`${db}`))
    log(`${databases.length} database${databases.length === 1 ? '' : 's'}`)
  }
}
