module.exports = {
  summary: 'list streams',
  args: {
    DB: 'database',
    NS: { description: 'namespace', optional: true }
  },
  options: [
    { name: 'CREATED',   short: 'c', long: 'created',  description: 'display created timestamp' },
    { name: 'MODIFIED',  short: 'm', long: 'modified', description: 'display last modified timestamp' },
    { name: 'NAMESPACE', short: 'n', long: 'ns',       description: 'display namespace' },
    { name: 'SIZE',      short: 's', long: 'size',     description: 'display number of events' }
  ],
  description: `
    List streams in database DB. If namespace NS is given then list streams in
    namespace NS in database DB. Otherwise, all streams in database DB are listed.
  `,
  examples: [
    '$ persistr streams:list mydb',
    '$ persistr streams:list mydb myns',
    '$ persistr streams:list mydb myns -cmns',
    '$ persistr streams:list mydb myns -c -m -n -s',
    '$ persistr streams:list mydb myns --created --modified --ns --size'
  ],
  labels: [ 'logged-in' ],
  run: async (toolbox, args) => {
    const { account, log, session } = toolbox
    const streams = await account.db(args.DB).streams({ ns: args.NS }).all()
    streams.forEach(stream => {
      let line = `${stream.id}`
      if (args.CREATED)   line += ` created=${stream.created}`
      if (args.MODIFIED)  line += ` modified=${stream.modified}`
      if (args.NAMESPACE) line += ` ns=${stream.ns.name}`
      if (args.SIZE)      line += ` events=${stream.size}`
      log(line)
    })
    log(`${streams.length} stream${streams.length === 1 ? '' : 's'}`)
  }
}
