const generate = require('project-name-generator')
module.exports = {
  summary: 'create new database',
  args: {
    DB: { description: 'database name', optional: true }
  },
  description: `
    Creates a new database with the given DB name. If DB name is not
    provided, a random name is generated.
  `,
  examples: [
    '$ persistr db:create',
    '$ persistr db:create mydb'
  ],
  labels: [ 'logged-in' ],
  run: async (toolbox, args) => {
    const { account, log, session } = toolbox

    if (!args.DB) {
      args.DB = generate({ number: true }).dashed
    }

    await account.db(args.DB).create()
    log(`Created database ${args.DB}`)
  }
}
