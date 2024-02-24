const fs = require('fs')
const cwd = process.cwd()

module.exports = function toWorking(name) {
    fs.readFile(cwd + '/.pit/tasks/working', (err, data) => {

        if (err) {
            throw err
        }

        let index;

        const matchTask = (task, i) => {
            if (task.split('||')[0] === name) {
                index = i
                name = task
                return true
            }
        }

        let workingTasks = data.toString().split('\n')

        if (workingTasks.filter(matchTask)?.length != 0) {
            console.log(workingTasks.splice(index, 1))
        }

        fs.writeFile(cwd + '/.pit/tasks/woking', workingTasks.join('\n'), 'utf-8', (err) => {
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
