module.exports = {
  summary: 'display cursor state',
  args: {
    DB: 'database name',
    CURSOR: 'cursor name'
  },
  description: `
    Display current cursor state.
  `,
  examples: [
    '$ persistr cursors:display mydb mycursor'
  ],
  labels: [ 'logged-in' ],
  run: async (toolbox, args) => {
    const { connection, log } = toolbox
    const cursor = await connection.use(args.DB).cursor(args.CURSOR).details()
    log(`Events seen: ${cursor.count}`)
    if (cursor.last) log(`Last event seen: ${cursor.last}`)
    const selectors = Object.entries(cursor.selectors)
    if (selectors.length > 0) {
      log(`Selectors:`)
      Object.entries(cursor.selectors).forEach(([key, value]) => log(`  ${key}: ${value}`))
    }
    else {
      log(`Selectors: all events`)
    }
  }
}
