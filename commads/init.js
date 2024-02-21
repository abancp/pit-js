const fs = require("fs")

const cwd = process.cwd()

module.exports = function init(){
    fs.mkdir(cwd+'/.pit',(err)=>{
        if(err){
            throw err
        }else{
            console.log('pit initialized empty reposetery')
        }
    })
    fs.mkdir(cwd+'/.pit/tasks',(err)=>{
        if(err){
            throw err
        }
    })
}