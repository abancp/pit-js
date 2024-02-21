const setTask = require('../helpers/task/setTask.js')
const getTasks = require('../helpers/task/getTasks.js')
const toWorking = require('../helpers/task/toWorking.js')

module.exports = function task(args, _w = false, _c = false) {
    console.log(args, _w)
    switch (args[1]) {
        case undefined:
            getTasks()
            break
        case 'add':
            switch (_w) {
                case false:
                    setTask(args[2])
                    break
                case true:
                    console.log("usage")
                    break
                default:
                    toWorking(_w)
                    break
            }
            break
        case 'remove':

    }
}