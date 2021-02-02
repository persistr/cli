#!/usr/bin/env node

require('dotenv').config()
const cli = require('./lib')

// Detect if we're running in the browser or on the command line.
const isBrowser = typeof window !== 'undefined' && ({}).toString.call(window) === '[object Window]'

// Check for updates (not in browsers).
if (!isBrowser) cli.checkForUpdates()

// Export the configured CLI module. In browsers, install a global 'cli' object.
module.exports = cli
if (isBrowser) global.cli = cli

// Finally, run the command given on the command line.
if (!isBrowser) cli.run()
