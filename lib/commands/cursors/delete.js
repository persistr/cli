module.exports = {
  summary: 'delete cursor',
  args: {
    DB: 'database name',
    CURSOR: 'name of cursor to delete'
  },
  description: `
    Delete the named CURSOR from database DB.

    NOTE: Deleting the cursor does not affect any data in the database.
  `,
  examples: [
    '$ persistr cursors:delete mydb mycursor'
  ],
  labels: [ 'logged-in' ],
  run: async (toolbox, args) => {
    const { connection, log } = toolbox
    await connection.use(args.DB).cursor(args.CURSOR).destroy()
    log(`Cursor '${args.CURSOR}' deleted from database ${args.DB}`)
  }
}
