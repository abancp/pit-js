const fs = require('fs')
const getTasks = require('./getTasks.js');
module.exports = async function setTask(name) {
    const tasks = await getTasks(false)
    if (tasks?.active?.indexOf(name) !== -1) {
        return console.log('task already in active tasks')
    }
    if (tasks?.working?.indexOf(name) !== -1) {
        return console.log('task already devolping')
    }
    if (tasks?.closed?.indexOf(name) !== -1) {
        return console.log('tasl already completed')
    }
    if (fs.existsSync(process.cwd() + '/.pit/tasks/active')) {
        fs.appendFile(process.cwd() + '/.pit/tasks/active', '\n' + name, (err) => {
            if (err) {
                throw err
            }
        })
    } else {
        fs.appendFile(process.cwd() + '/.pit/tasks/active', name, (err) => {
            if (err) {
                throw err
            }
        })
    }
}