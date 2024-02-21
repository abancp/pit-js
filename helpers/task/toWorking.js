const fs = require('fs')
const cwd = process.cwd()
module.exports = function toWorking(name) {
    fs.readFile(cwd + '/.pit/tasks/active', (err, data) => {
        if (err) {
            throw err
        }
        let activeTasks = data.toString().split('\n')
        if (activeTasks.includes(name)) {
            activeTasks.splice(activeTasks.indexOf(name), 1)
        }
        fs.writeFile(cwd + '/.pit/tasks/active', activeTasks.join('\n'), 'utf-8', (err) => {
            if (err) {
                throw err
            }
            if (fs.existsSync(cwd + '/.pit/tasks/working')) {
                fs.appendFile(cwd + '/.pit/tasks/working', '\n' + name, (err) => {
                    if (err) {
                        throw err
                    }
                })
            } else {
                fs.appendFile(cwd + '/.pit/tasks/working', name, (err) => {
                    if (err) {
                        throw err
                    }
                })
            }
        })
    })
}