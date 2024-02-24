#!/usr/bin/env node

const printUsage = require("./helpers/useges/printUseage.js")
const task = require("./commads/task.js")
const init = require("./commads/init.js")
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const getUseremail = require("./helpers/git/getUseremail.js")
const argv = yargs(hideBin(process.argv)).argv

let command = argv._[0]

switch (command) {
    case undefined:
        printUsage()
        break
    case 'init':
        init()
        break
    case 'task':
        task(argv._, argv.w, argv.c)
        break
    case 'role':
        

}