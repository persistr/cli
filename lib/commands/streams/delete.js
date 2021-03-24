module.exports = {
  summary: 'delete stream',
  args: {
    DB: 'database',
    STREAM: 'stream to delete'
  },
  options: [
    { name: 'NS', short: 'n', long: 'ns', type: 'string', description: 'namespace' }
  ],
  description: `
    Deletes the STREAM in database DB. Optionally, specify the namespace that the
    stream is located in with the NS option.

    WARNING: This operation cannot be undone. All data will be deleted permanently.
  `,
  examples: [
    '$ persistr stream:delete mydb mystream',
    '$ persistr stream:delete mydb mystream -n myns'
  ],
  labels: [ 'logged-in' ],
  run: async (toolbox, args) => {
    const { connection, log, session } = toolbox
    await connection.use(args.DB).ns(args.NS ?? '').stream(args.STREAM).destroy()
    log(`Stream '${args.STREAM}' deleted in ${args.NS ? `namespace '${args.NS}' of ` : ''}database '${args.DB}'`)
  }
}
