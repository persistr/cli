const { DateTime } = require('luxon')
module.exports = {
  summary: 'read one or more events',
  args: {
    DB: 'database to read from'
  },
  options: [
    { name: 'TOPIC',  short: 'i', long: 'topic',                  description: 'display event topic' },
    { name: 'TS',     short: 'd', long: 'ts',                     description: 'display event timestamp' },
    { name: 'NS',     short: 'n', long: 'ns',     type: 'string', description: 'namespace' },
    { name: 'STREAM', short: 's', long: 'stream', type: 'string', description: 'stream ID' },
    { name: 'EVENT',  short: 'o', long: 'event',  type: 'string', description: 'event ID' },
    { name: 'TYPES',  short: 't', long: 'types',  type: 'string', description: 'event types' },
    { name: 'AFTER',  short: 'a', long: 'after',  type: 'string', description: 'start after this event' },
    { name: 'UNTIL',  short: 'u', long: 'until',  type: 'string', description: 'read until this event' },
    { name: 'FROM',   short: 'b', long: 'from',   type: 'string', description: 'begin from this event' },
    { name: 'TO',     short: 'e', long: 'to',     type: 'string', description: 'read to and including this event' },
    { name: 'LIMIT',  short: 'l', long: 'limit',  type: 'string', description: 'number of events to read' }
  ],
  description: `
    Read one or more events from an event stream.
  `,
  examples: [
    `$ persistr events:read mydb.myns.mystream.myevent ` + '(read one event)'.grey,
    `$ persistr events:read mydb.myns.mystream ` + '        (all events from a stream)'.grey,
    `$ persistr events:read mydb.myns ` + '                 (all events from a namespace)'.grey,
    `$ persistr events:read mydb ` + '                      (all events from a database)'.grey,
    `$ persistr events:read mydb --type='User Created' ` + '(all events of one type)'.grey
  ],
  labels: [ 'logged-in' ],
  run: async (toolbox, args) => {
    const { connection, JSON5, log } = toolbox
    if (!args.UNTIL && !args.TO) args.UNTIL = 'caught-up'
    const filters = { types: args.TYPES, after: args.AFTER, until: args.UNTIL, from: args.FROM, to: args.TO, limit: args.LIMIT }
    if (args.NS) filters.ns = connection.use(args.DB).ns(args.NS)
    if (args.STREAM) filters.stream = (filters.ns || connection.use(args.DB)).stream(args.STREAM)
    if (args.EVENT) {
      filters.from = args.EVENT
      filters.limit = 1
    }
    const promise = connection.use(args.DB).events(filters).each(event => {
      log()
      if (args.TS) log('timestamp: '.grey + DateTime.fromISO(event.meta.ts).toLocaleString(DateTime.DATETIME_HUGE_WITH_SECONDS).grey)
      if (args.TOPIC) log(`topic: ${args.DB}${event.meta.ns ? '.' + event.meta.ns : ''}.${event.meta.stream}.${event.meta.id}`.grey)
      log(`${event.meta.type}`.bold + ' => ' + JSON5.stringify(event.data, { indent: 2, no_trailing_comma: true }))
    })

    // TODO: Cancellable promises.
/*
    process.once('SIGINT', () => {
      promise.cancel()
    })
*/

    log('Reading events ... Ctrl+C to cancel')
    await promise
  }
}
