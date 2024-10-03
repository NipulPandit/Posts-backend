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

// middleware for user availabilty

// const verify_at_home=async (req, res, next)=>{
//     if(Object.keys(req.cookies).length=== 0){ 
//         res.cookie("message", '0', {maxAge: 30 * 1000, httpOnly: true});
//         return res.redirect('/sign')       
//     }

//     else {
//         const cook=req.cookies.Token;
//         if(cook){
//         const iden= jwt.verify(cook, 'gotit')
//         const user= await user_module.findOne({'email': iden})
//             if(!user){
//                 res.cookie('message', '100', {maxAge: 30 * 1000, httpOnly: true})
//                 return res.redirect('/sign')
//             }
//             else {
//                 res.cookie('message', '200',{maxAge: 30 * 1000, httpOnly: true})
//                 return next();
//             }

//         }else{
//             res.cookie('message', '0', {maxAge: 30 * 1000, httpOnly: true})
//             return res.redirect('/sign')
//         }
//     }
// }

// const verify_at_home = async (req, res, next) => {
//     if (!req.cookies || Object.keys(req.cookies).length === 0) {
//         res.cookie("message", '0', { maxAge: 30 * 1000, httpOnly: true });
//         return res.status(401).redirect('/sign');
//     } else {
//         const token = req.cookies.Token;
//         if (token) {
//             try {
//                 const decodedEmail = jwt.verify(token, 'gotit');  // Use try-catch for token verification
//                 const user = await user_module.findOne({ 'email': decodedEmail });
//                 if (!user) {
//                     res.cookie('message', '100', { maxAge: 30 * 1000, httpOnly: true });
//                     return res.status(401).redirect('/sign');
//                 } else {
//                     res.cookie('message', '200', { maxAge: 30 * 1000, httpOnly: true });
//                     return next();
//                 }
//             } catch (err) {
//                 console.error("Token verification failed:", err);
//                 res.cookie('message', '0', { maxAge: 30 * 1000, httpOnly: true });
//                 return res.status(401).redirect('/sign');
//             }
//         } else {
//             res.cookie('message', '0', { maxAge: 30 * 1000, httpOnly: true });
//             return res.status(401).redirect('/sign');
//         }
//     }
// };

 const verify= async(req, res, next)=>{
   if(Object.keys(req.cookies).length === 0){
        return res.redirect('/sign')
   }else{
        const cookie=req.cookies.Token;
        if(cookie){
          const decoded= jwt.verify(cookie, "gotit");

          if(decoded){
            const user=await user_module.findOne({email: decoded});
            if(user){
                res.cookie("message", 200, {maxAge: 30 * 1000, httpOnly: true})
                return next();
            }else{
                res.cookie("message", 401, {maxAge: 30 * 1000, httpOnly: true})
              
                return res.redirect('/sign')
            }
          }else{
           
            return res.cookie("message", 401, {maxAge: 30 * 1000, httpOnly: true})
           
          }
        }else{
            return  res.cookie("message", 401, {maxAge: 30 * 1000, httpOnly: true})

        }
   }
  
}


app.get('/sign', async(req, res)=>{
    res.render('dashboard', {message: "Please Login or SignUp"})
})


app.get('/', verify,(req, res)=>{
    const message=req.cookies;
    // console.log(message,"from main page")
    res.render('index')
})


app.post('/signup', async (req, res)=>{
    const {name, email, password}=req.body;

    try{
        const salt=await bcrypt.genSalt(10);
    const hash= await bcrypt.hash(password, salt)

   
    await user_module.create({
        name,
        email,
        password: hash
    })

    let token=jwt.sign(email, 'gotit');
    res.cookie('Token', token, {maxAge: weekInMilliseconds, httpOnly: true, secure: false});
    res.json({message: "user created", code: 200})
    
    }catch(err){
        
        res.json({message: "something went wrong, try again later.", code: 401})
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

app.post('/createPost',verify, async(req,res)=>{
    const {title, content}=req.body;   
    const cookie=req.cookies.Token;
    const decoded=jwt.verify(cookie, 'gotit')  ;
    const user= await user_module.findOne({'email': decoded});

   
       const newpost=await post.create({
            title,
            content,
            author: user._id
        })

        user.post.push(newpost._id);
        await user.save();
        res.json({message: "post craeted"})
})


app.get('/showpost', async(req, res)=>{
   const data= await post.find().populate({
    path: 'author',
    select: '-password, -post'
   });

    if(data.length === 0) {return res.json({message: 'No post yet created by any user', code: 0});}
        else {res.json({data: data,code: 1})}
})
app.listen(3000)