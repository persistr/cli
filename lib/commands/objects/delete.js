module.exports = {
  summary: 'delete object',
  args: {
    DB: 'database name',
    ID: 'identifier of object to delete'
  },
  description: `
    Delete the object with identifier ID from database DB.
  `,
  examples: [
    '$ persistr objects:delete mydb myobject'
  ],
  labels: [ 'logged-in' ],
  run: async (toolbox, args) => {
    const { connection, log } = toolbox
    await connection.use(args.DB).object(args.ID).destroy()
    log(`Object '${args.ID}' deleted from database ${args.DB}`)
  }
}
