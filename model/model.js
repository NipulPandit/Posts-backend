const mong= require('mongoose');

mong.connect('mongodb://localhost:27017/postdb');

const userSchema=mong.Schema({
    name: String,
    email: String,
    password: String,
    post: [{
        type: mong.Schema.Types.ObjectId,
        ref: 'post'
    }]
})

module.exports=mong.model('user',  userSchema);