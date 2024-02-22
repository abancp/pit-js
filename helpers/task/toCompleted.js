const fs = require('fs')
const cwd = process.cwd()
module.exports = function toclosed(name) {
    console.log(name);
    fs.readFile(cwd + '/.pit/tasks/working', (err, data) => {
        if (err) {
            throw err
        }
        let workingTasks = data.toString().split('\n')
        if (workingTasks.includes(name)) {
            workingTasks.splice(workingTasks.indexOf(name), 1)
        }
        fs.writeFile(cwd + '/.pit/tasks/working', workingTasks.join('\n'), 'utf-8', (err) => {
            if (err) {
                throw err
            }
            if (fs.existsSync(cwd + '/.pit/tasks/closed')) {
                fs.appendFile(cwd + '/.pit/tasks/closed', '\n' + name, (err) => {
                    if (err) {
                        throw err
                    }
                })
            } else {
                fs.appendFile(cwd + '/.pit/tasks/closed', name, (err) => {
                    if (err) {
                        throw err
                    }
                })
            }
        })
    })
}