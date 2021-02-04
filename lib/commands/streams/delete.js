module.exports = {
  summary: 'delete stream',
  args: {
    DB: 'database',
    NS: 'namespace',
    STREAM: 'stream to delete'
  },
  description: `
    Deletes the STREAM in database DB and namespace NS.

    WARNING: This operation cannot be undone. All data will be deleted permanently.
  `,
  examples: [
    '$ persistr stream:delete mydb myns mystream'
  ],
  labels: [ 'logged-in' ],
  run: async (toolbox, args) => {
    const { connection, log, session } = toolbox
    await connection.use(args.DB).ns(args.NS).stream(args.STREAM).destroy()
    log(`Stream '${args.STREAM}' deleted in namespace '${args.NS}' of database '${args.DB}'`)
  }
}
