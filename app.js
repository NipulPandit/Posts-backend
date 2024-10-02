const express=require('express');
const app=express();
const path=require('path');
const cookie=require('cookie-parser')
const user_module=require('./model/model.js')
const bcrypt=require('bcrypt')
const jwt =require('jsonwebtoken')
const posts=require('./model/post.js');
const post = require('./model/post.js');
const weekInMilliseconds = 7 * 24 * 60 * 60 * 1000; // 1 week

app.use(cookie())
app.set('view engine', 'ejs');

app.use(express.json())
app.use(express.urlencoded({extended: true})); 

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', async(req, res)=>{
    
    if(Object.keys(req.cookies).length=== 0)return res.render('index', {message: 0})
        else {
                const cook=req.cookies.Token;
                const iden= jwt.verify(cook, 'gotit')
                const user= await user_module.findOne({'email': iden})
                    if(!user){
                        return  res.render('index', {message: 2})}
                    else {
                        res.render('index', {message: 1})
                    }
            }
        
})

app.post('/signup', async (req, res)=>{
    const {name, email, password}=req.body;

    try{
        const salt=await bcrypt.genSalt(10);
    const hash= await bcrypt.hash(password, salt)

    let token=jwt.sign(email, 'gotit');
    res.cookie('Token', token, {maxAge: weekInMilliseconds, httpOnly: true, secure: false});
    await user_module.create({
        name,
        email,
        password: hash
    })
    res.json({message: "Accouunt created succesfully"})
    }catch(err){
        console.log(err)
        res.json({message: "something went wrong, try again later."})
    }
    
})



app.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    const user = await user_module.findOne({ email: email });

    if (!user) {
        return res.json({ message2: 2 });
    }
    else
    {

    const verify= await bcrypt.compare(password, user.password)

    if(email === user.email && verify){ 
        let token=jwt.sign(email, 'gotit');

        res.cookie('Token', token,{maxAge: weekInMilliseconds, httpOnly: true, secure: false});

        return res.status(200).json({message2: 1})
    }
        else {return res.status(300).json({message2:0})}

    }
    
  
});

app.post('/createPost', async(req,res)=>{
    const {title, content}=req.body;
    
    if(Object.keys(req.cookies).length=== 0)return res.json({message: "please LogIn or SignUp", code: 400})

    const cook=req.cookies.Token;
    const iden= jwt.verify(cook, 'gotit')
    const user= await user_module.findOne({'email': iden})
        
    if(!user){
        res.json({message: "unable to craete post, please create your account", code: 0})
    }else{
       const newpost=await post.create({
            title,
            content,
            author: user._id
        })

        user.post.push(newpost._id);
        await user.save();
        res.json({message: "Post created", code: 1})
    }

})


app.get('/showpost', async(req, res)=>{
    // if(Object.keys(req.cookies).length=== 0)return res.json({message: "please LogIn or SignUp", code: 400})

    //     const cook=req.cookies.Token;
    //     const iden= jwt.verify(cook, 'gotit')
    //     const user= await user_module.findOne({'email': iden}).populate('post');

    //     // if(!user.post.length ===0) return res.json({message: "No post created yet", code: 0})
    //     if(user.post.length === 0) return res.json({message: "No post created yet", code: 0});

    //     res.json({user: user, code: 1})

    

   const data= await post.find().populate({
    path: 'author',
    select: '-password, -post'
   });

//    data.forEach((val)=>{
//     console.log(val)
//    })

    if(data.length === 0) return res.json({message: 'No post yet created by any user', code: 0});
        else {res.json({data: data,code: 1})}
    
})
app.listen(3000)