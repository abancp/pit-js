const setTask = require('../helpers/task/setTask.js')
const getTasks = require('../helpers/task/getTasks.js')
const toWorking = require('../helpers/task/toWorking.js');
const toCompleted = require('../helpers/task/toCompleted.js');

module.exports = function task(args, _w = false, _c = false) {
    console.log(args);
    switch (args[1]) {
        case undefined:
            getTasks()
            break
        case 'add':
            switch (true) {
                case Boolean(_w || _c) === false:
                    setTask(args[2])
                    break
                case Boolean(_w && _c):
                    console.log("usage")
                    //TODO:suitable usegae msg
                    break
                case Boolean(_w && !_c):
                    toWorking(_w)
                    break
                case Boolean(!_w && _c):
                    toCompleted(_c)
                    break
                default:
                    console.log("usage")
                //TODO:suitable usegae msg
            }
            break
        case 'remove':

    }
}