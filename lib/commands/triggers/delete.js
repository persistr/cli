module.exports = {
  summary: 'delete trigger',
  args: {
    DB: 'database name',
    TRIGGER: 'name of trigger to delete'
  },
  description: `
    Delete the given TRIGGER from database DB.
  `,
  examples: [
    '$ persistr triggers:delete mydb mytrigger'
  ],
  labels: [ 'logged-in' ],
  run: async (toolbox, args) => {
    const { connection, log } = toolbox
    await connection.use(args.DB).trigger(args.TRIGGER).destroy()
    log(`Trigger '${args.TRIGGER}' deleted from database ${args.DB}`)
  }
}
