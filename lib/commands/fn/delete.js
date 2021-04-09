module.exports = {
  summary: 'delete function',
  args: {
    DB: 'database name',
    FN: 'name of function to delete'
  },
  description: `
    Delete the function FN from database DB.
  `,
  examples: [
    '$ persistr fn:delete mydb myfn'
  ],
  labels: [ 'logged-in' ],
  run: async (toolbox, args) => {
    const { connection, log } = toolbox
    await connection.use(args.DB).fn(args.FN).destroy()
    log(`Function '${args.FN}' deleted from database ${args.DB}`)
  }
}
