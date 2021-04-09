module.exports = {
  summary: 'write object',
  args: {
    DB: 'database name',
    ID: 'unique object identifier',
    DATA: 'object data in JSON format'
  },
  description: `
    Commits a JSON object to the object store. JSON5 is used to parse object data.

    The object name can be any string, up to a maximum of 100 characters. Object
    names have to be unique within the database they're in.
  `,
  examples: [
    `$ persistr objects:write mydb myobject "{ name: 'John' }"`
  ],
  labels: [ 'logged-in' ],
  run: async (toolbox, args) => {
    const { connection, JSON5, log } = toolbox
    await connection.use(args.DB).object(args.ID, JSON5.parse(args.DATA)).write()
    log(`Object ${args.ID} committed to object store in database ${args.DB}`)
  }
}
