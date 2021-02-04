module.exports = {
  summary: 'delete event',
  args: {
    FQN: { description: 'fully-qualified event name', validate: FQN => {
      const tokens = FQN.split('.')
      if (tokens.length != 3 && tokens.length != 4) {
        throw new Error(`FQN must be a fully qualified event name`)
      }
    }}
  },
  description: `
    Deletes an event from an event stream.

    A fully-qualified event name is composed of the database name, an optional
    namespace, the stream identifier, and the event identifier. If the namespace
    is ommitted then the default anonymous namespace is used.

    Examples of fully-qualified event names:

    mydb.myns.mystream.myevent - database, namespace, stream ID, and event ID are given
    mydb.mystream.myevent - uses the default anonymous namespace
  `,
  examples: [
    `$ persistr events:delete mydb.myns.mystream.myevent`,
    `$ persistr events:delete mydb.mystream.myevent`
  ],
  labels: [ 'logged-in' ],
  run: async (toolbox, args) => {
    const { connection, JSON5, log } = toolbox
    const tokens = args.FQN.split('.')
    const [ db, ns, stream, event ] = tokens.length == 4 ? tokens : [ tokens[0], '', tokens[1], tokens[2] ]
    await connection.use(db).ns(ns).stream(stream).event(event).destroy()
    log(`Event deleted`)
  }
}
