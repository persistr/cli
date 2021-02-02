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
    const { account, log, session } = toolbox
    await account.db(args.SRCDB).rename(args.DSTDB)
    log(`Renamed ${args.SRCDB} to ${args.DSTDB}`)
  }
}
