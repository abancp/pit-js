const fs = require('fs')
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
                        console.log('\x1b[44\m Tasks to work............ \x1b[0m')
                        tasks.active?.length === 0 ? console.log('\x1b[34\m ~ no active tasks\x1b[0m') : tasks.active.forEach((active, i) => { active == '' ? console.log('\x1b[34\m ~ no active tasks\x1b[0m') : console.log(`\x1b[34\m${i + 1} ~ ${active} \x1b[0m`) })
                        console.log('\x1b[43\m Tasks is now working..... \x1b[0m')
                        tasks.working?.length === 0 ? console.log('\x1b[33\m - no working tasks\x1b[0m') : tasks.working.forEach((working, i) => { working == '' ? console.log('\x1b[34\m - no working tasks\x1b[0m') : console.log(`\x1b[33m${i + 1} - ${working} \x1b[0m`) })
                        console.log('\x1b[42\m Tasks completed.......... \x1b[0m')
                        tasks.closed?.length === 0 ? console.log('\x1b[32\m _ no closed tasks\x1b[0m') : tasks.closed.forEach((closed, i) => { closed == '' ? console.log('\x1b[34\m ~ no active tasks\x1b[0m') : console.log(`\x1b[32m${i + 1} _ ${closed} \x1b[0m`) })
                        resolve(tasks)
                    }
                    resolve(tasks)
                })
            })
        })
    })
}