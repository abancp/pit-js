var exec = require('child_process').exec

module.exports = function getUseremail() {
    return new Promise((resolve, reject) => {
        exec("git config --list", (err, stdout, stderr) => {
            if (err || stderr) {
                throw err || stderr
            } else {
                let list = stdout.split('=').join('\n').split('\n')
                if (list && list?.indexOf('user.email') !== -1 && list[list?.indexOf('user.email') + 1]) {
                    const useremail = list[list?.indexOf('user.email') + 1]
                    resolve(useremail)
                } else {
                    console.log("please complete your git configuration \n (git config --global user.email \"email\") ")
                    reject()
                }
            }
        })
    })
}