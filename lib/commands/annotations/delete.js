module.exports = {
  summary: 'delete JSON stream annotation',
  args: {
    STREAM: { description: 'fully-qualified stream name', validate: STREAM => {
      const tokens = STREAM.split('.')
      if (tokens.length != 2 && tokens.length != 3) {
        throw new Error(`STREAM must be a fully qualified stream name`)
      }
    }}
  },
  description: `
    Detach and delete the JSON annotation attached to a stream.

    A note can be attached to a stream. Notes are arbitrary JSON documents. One
    stream can have a maximum of one note attached to it. Notes are entirely
    optional and streams are not required to have notes attached to them.
  `,
  examples: [
    `$ persistr annotations:delete mydb.myns.mystream`,
    `$ persistr annotations:delete mydb.mystream`
  ],
  labels: [ 'logged-in' ],
  run: async (toolbox, args) => {
    const { account, log } = toolbox
    const tokens = args.STREAM.split('.')
    const [ db, ns, stream ] = tokens.length == 3 ? tokens : [ tokens[0], '', tokens[1] ]
    await account.db(db).ns(ns).stream(stream).annotation().destroy()
    log(`Annotation deleted from stream ${args.STREAM}`)
  }
}
