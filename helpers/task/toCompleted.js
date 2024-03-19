const fs = require('fs')
const cwd = process.cwd()

module.exports = function toWorking(name) {
    fs.readFile(cwd + '/.pit/tasks/working', (err, data) => {

        if (!err?.code === "ENOENT") {
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

        let workingTasks = data?.toString().split('\n')

        let tasks = workingTasks?.filter(matchTask)

        if (tasks.length != 0) {
            console.log(workingTasks?.splice(index, 1))
        }

        console.log(tasks);

        fs.writeFile(cwd + '/.pit/tasks/working', workingTasks ? workingTasks?.join('\n') : 'undefined', 'utf-8', (err) => {
           if (!err?.code === "ENOENT") {
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
