module.exports = {
  summary: 'attach a JSON document to a stream',
  args: {
    STREAM: { description: 'fully-qualified stream name', validate: STREAM => {
      const tokens = STREAM.split('.')
      if (tokens.length != 2 && tokens.length != 3) {
        throw new Error(`STREAM must be a fully qualified stream name`)
      }
    }},
    ANNOTATION: 'annotation in JSON format'
  },
  description: `
    Attaches a JSON document to a stream. JSON5 is used to parse the JSON document.

    A note can be attached to a stream. Notes are arbitrary JSON documents. One
    stream can have a maximum of one note attached to it. Notes are entirely
    optional and streams are not required to have notes attached to them.
  `,
  examples: [
    `$ persistr annotations:write mydb.myns.mystream "{hello:'world'}"`,
    `$ persistr annotations:write mydb.mystream '{hello:"world"}'`,
    `$ persistr annotations:write mydb.mystream '{"hello":"world"}'`
  ],
  labels: [ 'logged-in' ],
  run: async (toolbox, args) => {
    const { connection, JSON5, log } = toolbox
    const tokens = args.STREAM.split('.')
    const [ db, ns, stream ] = tokens.length == 3 ? tokens : [ tokens[0], '', tokens[1] ]
    await connection.use(db).ns(ns).stream(stream).annotate(JSON5.parse(args.ANNOTATION))
    log(`Annotated stream ${args.STREAM}`)
  }
}
