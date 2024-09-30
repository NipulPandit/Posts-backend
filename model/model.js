const mong= require('mongoose');

mong.connect('mongodb://localhost:27017/postdb');

const Postchema=mong.Schema({
    name: String,
    email: String,
    password: String
})

module.exports=mong.model('Post', Postchema);