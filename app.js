const express=require('express');
const app=express();
const path=require('path');
const cookie=require('cookie-parser')
const post=require('./model/model.js')
const bcrypt=require('bcrypt')
const jwt =require('jsonwebtoken')

app.use(cookie())
app.set('view engine', 'ejs');

app.use(express.json())
app.use(express.urlencoded({extended: true})); 

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res)=>{
    if(Object.keys(req.cookies).length=== 0)return res.render('index', {message: 0})
        else res.render('index', {message: 1});
        
})

app.post('/signup', async(req, res)=>{
    const {name, email, password}=req.body;

    const salt=await bcrypt.genSalt(10);
    const hash= await bcrypt.hash(password, salt)

    let token=jwt.sign(email, 'gotit');
    res.cookie('Token', token);
    await post.create({
        name,
        email,
        password: hash
    })

    res.redirect('/')
})


// app.post('/signin', async(req,res)=>{
//     const {email, password}=req.body;

//     // const user= await post.findOne({email: email});

//     // if(!user) return res.json({message: "User not Found: Please signn up"});
//     //     else  res.status(200).json({message: "user founded}"});
        
//         const user = await post.findOne({ email: email });

//         if (!user) {
//             return res.json({ message: "User not Found: Please sign up" });
//         } else {
//             res.status(200).json({ message: "user found" });
//         }
    
// })

app.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    const user = await post.findOne({ email: email });

    if (!user) {return res.json({ message2: 2 });}
    else{

        const verify= await bcrypt.compare(password, user.password)

    if(email === user.email && verify){ 
        let token=jwt.sign(email, 'gotit');
        res.cookie('Token', token);
        return res.status(200).json({message2: 1})
    }
        else {return res.status(300).json({message2:0})}

    }
    
  
});



app.listen(3000)