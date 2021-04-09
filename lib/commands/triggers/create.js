module.exports = {
  summary: 'create new trigger',
  args: {
    DB: 'database name',
    TRIGGER: 'trigger name',
    CURSOR: 'cursor name',
    FN: 'functon name'
  },
  description: `
    Create a new trigger with the given name. The trigger is created in the
    database provided. Trigger names must be unique within a database.

    Trigger executes function FN whenever given CURSOR advances to next event.
    Common usage is to create a projection and update the state of an object after
    processing an event. Functions have access to the Persistr Object Store.
  `,
  examples: [
    '$ persistr triggers:create mydb mytrigger mycursor myfn'
  ],
  labels: [ 'logged-in' ],
  run: async (toolbox, args) => {
    const { connection, log } = toolbox
    await connection.use(args.DB).trigger(args.TRIGGER, { cursor: args.CURSOR, fn: args.FN }).create()
    log(`Created trigger ${args.TRIGGER} on database ${args.DB}`)
  }
}
