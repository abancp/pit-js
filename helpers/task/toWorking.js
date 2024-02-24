const fs = require('fs')
const cwd = process.cwd()

module.exports = function toWorking(name) {
    fs.readFile(cwd + '/.pit/tasks/active', (err, data) => {

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

        let activeTasks = data.toString().split('\n')

        if (activeTasks.filter(matchTask)?.length != 0) {
            console.log(activeTasks.splice(index, 1))
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
