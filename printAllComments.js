//print all the comments to the console
​
const db = require('./models')
​
const printAllComments = async () => {
    try {
        const comments = await db.comment.findAll()
        console.log(comments)
    } catch (err) {
        console.log(err)
    }
}
​
printAllComments()