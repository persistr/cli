module.exports = {
  summary: 'list functions',
  args: {
    DB: 'database name'
  },
  description: `
    List functions defined in a given database.
  `,
  examples: [
    '$ persistr fn:list mydb'
  ],
  labels: [ 'logged-in' ],
  run: async (toolbox, args) => {
    const { connection, log } = toolbox
    const functions = await connection.use(args.DB).functions().all()
    functions.forEach(fn => log(`${fn.name}`))
    log(`${functions.length} function${functions.length === 1 ? '' : 's'}`)
  }
}
