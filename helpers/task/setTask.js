const fs = require('fs')
const getTasks = require('./getTasks.js');
const getUseremail = require('../git/getUseremail.js');
module.exports = async function setTask(name) {

    const tasks = await getTasks(false)
    const useremail = await getUseremail()

    if (tasks?.active?.filter((task) => task.split('||')[0] === name)?.length != 0) {
        return console.log('task already in active tasks')
    }
    if (tasks?.working?.filter((task) => task.split('||')[0] === name)?.length != 0) {
        return console.log('task already devolping')
    }
    if (tasks?.closed?.filter((task) => task.split('||')[0] === name)?.length != 0) {
        return console.log('tasl already completed')
    }
    if (fs.existsSync(process.cwd() + '/.pit/tasks/active')) {
        fs.appendFile(process.cwd() + '/.pit/tasks/active', `\n${name}||${useremail}`, (err) => {
            if (err) {
                throw err
            }
        })
    } else {
        fs.appendFile(process.cwd() + '/.pit/tasks/active', `${name}||${useremail}`, (err) => {
            if (err) {
                throw err
            }
        })
    }
}