module.exports = function printTasks(tasks = [], type) {
    tasks.forEach((task, i) => {
        if (task) {
            let msg = `${i + 1} ~ ${task.split('||')[0]}`
            msg+= ` ( ${task.split('||')[1]} )`
            console.log(msg);
        }
    })
}
