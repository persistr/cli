const { DateTime } = require('luxon')
module.exports = {
  summary: 'watch object',
  args: {
    DB: 'database to read from',
    ID: 'object identifier'
  },
  description: `
    Establishes a live subscription to the object store and watches for updates
    to the object given by ID. Anytime the object is updated, it will be shown
    on the terminal.
  `,
  examples: [
    `$ persistr objects:watch mydb myobject`,
  ],
  labels: [ 'logged-in' ],
  run: async (toolbox, args) => {
    const { connection, JSON5, log } = toolbox
    log('Watching object ... Ctrl+C to cancel')
    await connection.use(args.DB).object(args.ID).watch(
      object => {
        log(`${args.ID}`.bold + ' ' + JSON5.stringify(object, { indent: 2, no_trailing_comma: true }))
      },
      (object, event) => {
        log()
        log(`${event.meta.type}`.bold + ' ' + JSON5.stringify(event.data, { indent: 2, no_trailing_comma: true }))
        log('=>')
        log(`${args.ID}`.bold + ' ' + JSON5.stringify(object, { indent: 2, no_trailing_comma: true }))
      })
  }
}
