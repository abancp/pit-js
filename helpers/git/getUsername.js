var exec = require('child_process').exec

module.exports = function getUsername() {
    return new Promise((resolve, reject) => {
        exec("git config --list", (err, stdout, stderr) => {
            if (err || stderr) {
                throw err || stderr
            } else {
                let list = stdout.split('=').join('\n').split('\n')
                if (list && list?.indexOf('user.name') !== -1 && list[list?.indexOf('user.name') + 1]) {
                    const username = list[list?.indexOf('user.name') + 1]
                    console.log(username)
                    resolve(username)
                } else {
                    console.log("please complete your git configuration \n (git config --global user.name \"FIRST_NAME LAST_NAME\") ")
                    reject()
                }
            }
        })
    })
}