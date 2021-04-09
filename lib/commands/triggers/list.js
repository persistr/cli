module.exports = {
  summary: 'list triggers',
  args: {
    DB: 'database name'
  },
  description: `
    List triggers defined in a given database.
  `,
  examples: [
    '$ persistr triggers:list mydb'
  ],
  labels: [ 'logged-in' ],
  run: async (toolbox, args) => {
    const { connection, log } = toolbox
    const triggers = await connection.use(args.DB).triggers().all()
    triggers.forEach(trigger => log(`${trigger.name}`))
    log(`${triggers.length} trigger${triggers.length === 1 ? '' : 's'}`)
  }
}
