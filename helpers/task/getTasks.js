const fs = require('fs')
const cwd = process.cwd()
let tasks = { active: [], working: [], closed: [] }
module.exports = function getTasks(print = true) {
    return new Promise((resolve, reject) => {
        if (fs.existsSync(cwd + '/.pit/tasks/active')) {
            fs.readFile(cwd + '/.pit/tasks/active', (err, data) => {
                if (err) {
                    throw err
                } else {
                    tasks.active = data.toString().split('\n')
                    if (fs.existsSync(cwd + '/.pit/tasks/working')) {
                        fs.readFile(cwd + '/.pit/tasks/working', (err, data) => {
                            if (err) {
                                throw err
                            } else {
                                tasks.working = data.toString().split('\n')
                                if (fs.existsSync(cwd + '/.pit/tasks/closed')) {
                                    fs.readFile(cwd + '/.pit/tasks/closed', (err, data) => {
                                        if (err) {
                                            throw err
                                        } else {
                                            tasks.closed = data.toString().split('\n')
                                            if (print) {
                                                tasks.active.forEach((active, i) => { active === '' ? console.log('\x1b[34\m ~ no active tasks') : console.log(`\x1b[34\m${i + 1} ~ ${active} \x1b[0m`) })
                                                tasks.working.forEach((working, i) => { working === '' ? console.log('\x1b[33\m - no working tasks'): console.log(`\x1b[33m${i + 1} - ${working} \x1b[0m`) })
                                                tasks.closed.forEach((closed, i) => { closed === '' ? console.log('\x1b[32\m _ no closed tasks') : console.log(`\x1b[32m${i + 1} _ ${closed} \x1b[0m`) })
                                            }
                                            resolve(tasks)
                                        }
                                    })
                                }
                            }
                        })
                    }
                }
            })
        }else{
            resolve(tasks)
        }
    })
}