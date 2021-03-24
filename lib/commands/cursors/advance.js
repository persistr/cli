module.exports = {
  summary: 'advance cursor',
  args: {
    DB: 'database name',
    CURSOR: 'cursor name'
  },
  description: `
    Advance cursor.
  `,
  examples: [
    '$ persistr cursors:advance mydb mycursor'
  ],
  labels: [ 'logged-in' ],
  run: async (toolbox, args) => {
    const { connection, log } = toolbox
    await connection.use(args.DB).cursor(args.CURSOR).advance()
  }
}
