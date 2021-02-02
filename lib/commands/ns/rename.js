module.exports = {
  summary: 'rename namespace',
  args: {
    DB: 'database name',
    SRCNS: 'namespace name',
    DSTNS: 'new namespace name'
  },
  description: `
    Renames a namespace in database DB from old SRCNS name to new DSTNS name.
  `,
  examples: [
    '$ persistr ns:rename mydb myns newns'
  ],
  labels: [ 'logged-in' ],
  run: async (toolbox, args) => {
    const { account, log, session } = toolbox
    await account.db(args.DB).ns(args.SRCNS).rename(args.DSTNS)
    log(`Renamed namespace ${args.SRCNS} to ${args.DSTNS} within database ${args.DB}`)
  }
}
