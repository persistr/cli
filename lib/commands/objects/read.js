const { DateTime } = require('luxon')
module.exports = {
  summary: 'read object',
  args: {
    DB: 'database to read from',
    ID: 'object name'
  },
  description: `
    Read object with identifier ID from the object store.
  `,
  examples: [
    `$ persistr objects:read mydb myobject`,
  ],
  labels: [ 'logged-in' ],
  run: async (toolbox, args) => {
    const { connection, JSON5, log } = toolbox
    const object = await connection.use(args.DB).object(args.ID).read()
    log(`${args.ID}`.bold + ' ' + JSON5.stringify(object, { indent: 2, no_trailing_comma: true }))
  }
}
