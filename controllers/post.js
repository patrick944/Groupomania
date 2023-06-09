const db = require('../config/db')

exports.post = (req, res) => {
    const { postImage, postTexte } = req.body
    const newPost = { postImage, postTexte }
    db.query('INSERT INTO posts SET ?', newPost, (error, result) => {
        if (error) {
            console.log(error)
            res.status(401).json({
                error: 'Failure'
            })
        } else {
            res.status(200).json({
                message: 'Successfully'
            })
        }
    })
}