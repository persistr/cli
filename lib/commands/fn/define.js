module.exports = {
  summary: 'define function',
  args: {
    DB: 'database name',
    FN: 'function name',
    FILE: 'file name',
  },
  description: `
    Define a function with the given name. If the function already exists,
    it is overwritten. If it doesn't exist, it is created. The function is
    defined in the database provided.

    Function names must be unique within a database.

    Functions must be implemented in Javascript. Each function should be a
    CommonJS module that exports exactly one anonymous closure. The module
    source is uploaded to Persistr Server and executed server-side.
  `,
  examples: [
    '$ persistr fn:define mydb myfn fn.js'
  ],
  labels: [ 'logged-in' ],
  run: async (toolbox, args) => {
    const { connection, log } = toolbox
    await connection.use(args.DB).fn(args.FN, { filename: args.FILE }).define()
    log(`Defined function ${args.FN} on database ${args.DB}`)
  }
}
