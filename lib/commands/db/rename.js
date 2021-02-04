module.exports = {
  summary: 'rename database',
  args: {
    SRCDB: 'database name',
    DSTDB: 'new database name'
  },
  description: `
    Renames a database from old SRCDB name to new DSTDB name.
  `,
  examples: [
    '$ persistr db:rename mydb newdbname'
  ],
  labels: [ 'logged-in' ],
  run: async (toolbox, args) => {
    const { connection, log, session } = toolbox
    await connection.use(args.SRCDB).rename(args.DSTDB)
    log(`Renamed ${args.SRCDB} to ${args.DSTDB}`)
  }
}
