module.exports = {
  summary: 'list cursors',
  args: {
    DB: 'database name'
  },
  description: `
    List cursors available in a given database.
  `,
  examples: [
    '$ persistr cursors:list mydb'
  ],
  labels: [ 'logged-in' ],
  run: async (toolbox, args) => {
    const { connection, log } = toolbox
    const cursors = await connection.use(args.DB).cursors().all()
    cursors.forEach(cursor => log(`${cursor.name}`))
    log(`${cursors.length} cursor${cursors.length === 1 ? '' : 's'}`)
  }
}
