module.exports = {
  summary: 'delete database',
  args: {
    DB: 'name of database to delete',
  },
  description: `
    Deletes the DB database.

    WARNING: This operation cannot be undone. All data will be deleted permanently.
  `,
  examples: [
    '$ persistr db:delete mydb'
  ],
  labels: [ 'logged-in' ],
  run: async (toolbox, args) => {
    const { account, log, session } = toolbox
    await account.db(args.DB).destroy()
    log(`Database '${args.DB}' deleted`)
  }
}
