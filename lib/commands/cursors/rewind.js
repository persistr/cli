module.exports = {
  summary: 'rewind cursor',
  args: {
    DB: 'database name',
    CURSOR: 'cursor name'
  },
  description: `
    Rewind cursor back to the beginning.

    After rewinding a cursor, you can advance it to replay all events from
    the beginning again that match cursor's event selectors.
  `,
  examples: [
    '$ persistr cursors:rewind mydb mycursor'
  ],
  labels: [ 'logged-in' ],
  run: async (toolbox, args) => {
    const { connection, log } = toolbox
    await connection.use(args.DB).cursor(args.CURSOR).rewind()
  }
}
