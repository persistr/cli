module.exports = {
  summary: 'create new cursor',
  args: {
    DB: 'database name',
    CURSOR: 'cursor name'
  },
  options: [
    { name: 'NS',     short: 'n', long: 'ns',     type: 'string', description: 'namespace' },
    { name: 'STREAM', short: 's', long: 'stream', type: 'string', description: 'stream ID' },
    { name: 'TYPES',  short: 't', long: 'types',  type: 'string', description: 'event types' },
    { name: 'AFTER',  short: 'a', long: 'after',  type: 'string', description: 'start after this event' },
    { name: 'UNTIL',  short: 'u', long: 'until',  type: 'string', description: 'read until this event' },
    { name: 'FROM',   short: 'b', long: 'from',   type: 'string', description: 'begin from this event' },
    { name: 'TO',     short: 'e', long: 'to',     type: 'string', description: 'read to and including this event' },
    { name: 'LIMIT',  short: 'l', long: 'limit',  type: 'string', description: 'number of events to read' }
  ],
  description: `
    Create a new cursor with the given name. The cursor is created
    in the database provided.

    All users with 'reader' or greater access to the database are
    able to access and advance the cursor.

    Cursor names must be unique within a database. If a cursor with
    the same name already exists, creation will fail.
  `,
  examples: [
    '$ persistr cursors:create mydb mycursor',
    '$ persistr cursors:create mydb mycursor -t mytype1,mytype2,mytype3 --limit=10',
  ],
  labels: [ 'logged-in' ],
  run: async (toolbox, args) => {
    const { connection, log } = toolbox
    const filters = { ns: args.NS, stream: args.STREAM, types: args.TYPES, after: args.AFTER, until: args.UNTIL, from: args.FROM, to: args.TO, limit: args.LIMIT }
    await connection.use(args.DB).cursor(args.CURSOR, filters).create()
    log(`Created cursor ${args.CURSOR} on database ${args.DB}`)
  }
}
