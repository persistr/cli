const fs = require('fs')
module.exports = {
  summary: 'export database',
  args: {
    DB: 'name of database to export',
    FILENAME: { description: 'output file name', optional: true }
  },
  description: `
    Exports all data contained in database DB into the output file FILENAME.
    If FILENAME is not given then a file is created with the same name as the
    database name and with the .json extension. If a file with the same FILENAME
    already exists, it will be overwritten.

    Export file will contain a list of events, one event per line. Each event
    will be exported as a self-contained JSON data structure. You can parse the
    file line-by-line by decoding each event individually.
  `,
  examples: [
    '$ persistr db:export mydb',
    '$ persistr db:export mydb data.json'
  ],
  labels: [ 'logged-in' ],
  run: async (toolbox, args) => {
    const { connection, log, session } = toolbox

    if (!args.FILENAME) {
      args.FILENAME = `${args.DB}.json`
    }

    log(`Exporting database ${args.DB} to ${args.FILENAME} ...`)

    if (fs.existsSync(args.FILENAME)) {
      fs.truncateSync(args.FILENAME)
    }

    let count = 0
    await connection.use(args.DB).events({ until: 'caught-up' }).each(event => {
      fs.appendFileSync(args.FILENAME, `${JSON.stringify(event)}\n`)
      count++
    })

    log(`${count} events exported`)
  }
}
