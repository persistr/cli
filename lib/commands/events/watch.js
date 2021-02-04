const { DateTime } = require('luxon')
module.exports = {
  summary: 'watch event log',
  args: {
    DB: 'database to watch'
  },
  options: [
    { name: 'TOPIC',  short: 'i', long: 'topic',                  description: 'display event topic' },
    { name: 'TS',     short: 't', long: 'ts',                     description: 'display event timestamp' },
    { name: 'NS',     short: 'n', long: 'ns',     type: 'string', description: 'namespace to watch' },
    { name: 'STREAM', short: 's', long: 'stream', type: 'string', description: 'event stream to watch' },
    { name: 'TYPES',  short: 'f', long: 'types',  type: 'string', description: 'event types to watch' }
  ],
  description: `
    Establishes a live subscription to the event log and watches for new events
    appended to the event log. Events are displayed on the console.
  `,
  examples: [
    `$ persistr events:watch mydb -n myns -s mystream ` + '   (watch an event stream)'.grey,
    `$ persistr events:watch mydb -n myns ` + '               (watch events in a namespace)'.grey,
    `$ persistr events:watch mydb ` + '                       (watch all events)'.grey,
    `$ persistr events:watch mydb --types='User Created' ` + '(watch all events of a given type)'.grey
  ],
  labels: [ 'logged-in' ],
  run: async (toolbox, args) => {
    const { connection, JSON5, log } = toolbox
    const filters = { types: args.TYPES, after: 'past-events' }
    if (args.NS) filters.ns = connection.use(args.DB).ns(args.NS)
    if (args.STREAM) filters.stream = (filters.ns || connection.use(args.DB)).stream(args.STREAM)
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

    log('Watching for new events ... Ctrl+C to cancel')
    await promise
  }
}
