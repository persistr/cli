const { DateTime } = require('luxon')
module.exports = {
  summary: 'read from cursor',
  args: {
    DB: 'database name',
    CURSOR: 'cursor name'
  },
  options: [
    { name: 'ADVANCE', short: 'a', long: 'advance', description: 'auto-advance cursor' },
    { name: 'TOPIC',   short: 'i', long: 'topic',   description: 'display event topic' },
    { name: 'TS',      short: 'd', long: 'ts',      description: 'display event timestamp' },
  ],
  description: `
    Read from the cursor.

    By default, the cursor is not actively advanced. To advance the cursor after each
    event, pass in the ADVANCE option.
  `,
  examples: [
    '$ persistr cursors:read mydb mycursor',
    '$ persistr cursors:read mydb mycursor -a',
    '$ persistr cursors:read mydb mycursor --advance'
  ],
  labels: [ 'logged-in' ],
  run: async (toolbox, args) => {
    const { connection, JSON5, log } = toolbox
    await connection.use(args.DB).cursor(args.CURSOR).events().each(async (event, subscription) => {
      log()
      if (args.TS) log('timestamp: '.grey + DateTime.fromISO(event.meta.ts).toLocaleString(DateTime.DATETIME_HUGE_WITH_SECONDS).grey)
      if (args.TOPIC) log(`topic: ${args.DB}${event.meta.ns ? '.' + event.meta.ns : ''}.${event.meta.stream}.${event.meta.id}`.grey)
      log(`${event.meta.type}`.bold + ' ' + JSON5.stringify(event.data, { indent: 2, no_trailing_comma: true }))
      if (!args.ADVANCE) await subscription.cancel()
    })
  }
}
