module.exports = {
  summary: 'append event to stream',
  args: {
    FQN: { description: 'fully-qualified stream name', validate: FQN => {
      const tokens = FQN.split('.')
      if (tokens.length != 2 && tokens.length != 3) {
        throw new Error(`FQN must be a fully qualified stream name`)
      }
    }},
    TYPE: 'event type',
    DATA: { description: 'event data in JSON format', optional: true }
  },
  description: `
    Commits a JSON event to an event stream. JSON5 is used to parse event data.

    A fully-qualified stream name is composed of the database name, an optional
    namespace, and the stream identifier. If the namespace is ommitted then the
    default anonymous namespace is used.

    Examples of fully-qualified stream names:

    mydb.myns.mystream - database, namespace, and stream ID are given
    mydb.mystream - uses the default anonymous namespace
  `,
  examples: [
    `$ persistr events:append mydb.myns.mystream created "{ name: 'John' }"`,
    `$ persistr events:append mydb.mystream 'user created' '{name:"John"}'`,
    `$ persistr events:append mydb.mystream 'User Created' '{"hello":"world"}'`
  ],
  labels: [ 'logged-in' ],
  run: async (toolbox, args) => {
    const { account, JSON5, log } = toolbox
    const tokens = args.FQN.split('.')
    const [ db, ns, stream ] = tokens.length == 3 ? tokens : [ tokens[0], '', tokens[1] ]
    const eventFQN = await account.db(db).ns(ns).stream(stream).events().write(args.TYPE, JSON5.parse(args.DATA ?? '{}'))
    log(`Event committed ${eventFQN}`)
  }
}
