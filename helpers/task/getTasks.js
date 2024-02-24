const fs = require('fs')
const printTask = require('./printTask')
const cwd = process.cwd()
let tasks = { active: [], working: [], closed: [] }
module.exports = function getTasks(print = true) {
    return new Promise((resolve, reject) => {
        fs.readFile(cwd + '/.pit/tasks/active', (err, data) => {
            if (!err?.code === "ENOENT") {
                throw err
            }
            tasks.active = data ? data.toString().split('\n') : []
            fs.readFile(cwd + '/.pit/tasks/working', (err, data) => {
                if (!err?.code === "ENOENT") {
                    throw err
                }
                tasks.working = data ? data.toString().split('\n') : []
                fs.readFile(cwd + '/.pit/tasks/closed', (err, data) => {
                    if (!err?.code === "ENOENT") {
                        throw err
                    }
                    tasks.closed = data ? data.toString().split('\n') : []
                    if (print) {
                        console.log('\nTasks to work............')
                        tasks.active?.length === 0 ? console.log(' ~ no active tasks') : printTask(tasks.active,'a')
                        console.log('\nTasks is now working.....')
                        tasks.working?.length === 0 ? console.log(' - no working tasks') : printTask(tasks.working,'w')
                        console.log('\nTasks completed..........')
                        tasks.closed?.length === 0 ? console.log('_ no closed tasks') : printTask(tasks.closed,'c')
                        resolve(tasks)
                    }
                    resolve(tasks)
                })
            })
        })
    })
}
