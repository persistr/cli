module.exports = {
  summary: 'display JSON document attached to a stream',
  args: {
    STREAM: { description: 'fully-qualified stream name', validate: STREAM => {
      const tokens = STREAM.split('.')
      if (tokens.length != 2 && tokens.length != 3) {
        throw new Error(`STREAM must be a fully qualified stream name`)
      }
    }}
  },
  description: `
    Reads and displays the JSON document attached to a stream. The JSON document
    is displayed in JSON5 format.

    A note can be attached to a stream. Notes are arbitrary JSON documents. One
    stream can have a maximum of one note attached to it. Notes are entirely
    optional and streams are not required to have notes attached to them.
  `,
  examples: [
    `$ persistr annotations:read mydb.myns.mystream`,
    `$ persistr annotations:read mydb.mystream`
  ],
  labels: [ 'logged-in' ],
  run: async (toolbox, args) => {
    const { account, JSON5, log } = toolbox
    const tokens = args.STREAM.split('.')
    const [ db, ns, stream ] = tokens.length == 3 ? tokens : [ tokens[0], '', tokens[1] ]
    const annotation = await account.db(db).ns(ns).stream(stream).annotation().read()
    log(JSON5.stringify(annotation))
  }
}
