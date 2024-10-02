let sign=document.querySelector('#form_reg');
let eye=document.querySelectorAll('.eye');
const password=document.querySelector('#signUpPassword')
const password2=document.querySelector('#in_password')
let signIn=document.querySelector('#sign_in');
let signUp=document.querySelector('#sign_up');
let popup=document.querySelector('#flashText');
let popmessage=document.querySelector('#flashMessage')
let post_form=document.querySelector('#post_form')
let post_content=document.querySelector('#post_content')
let flag=true;
let cluster='';


document.addEventListener('DOMContentLoaded', showpost)

eye.forEach((val, id)=>{
  val.addEventListener('click', ()=>{
    if(id == 0){
      if(flag) {
                flag=false;
                password2.type='text';
                val.classList.remove("fa-eye-slash");
                val.classList.add("fa-eye");
              }else{
                password2.type='password';
                flag=true;
                val.classList.remove("fa-eye");
                val.classList.add("fa-eye-slash");
              }
    }else{
      if(flag) {
            flag=false;
            password.type='text';
            val.classList.remove("fa-eye-slash");
            val.classList.add("fa-eye");
          }else{
            password.type='password';
            flag=true;
            val.classList.remove("fa-eye");
            val.classList.add("fa-eye-slash");
          }
    }
  })
})


function closeForm() {
  sign.classList.add('hidden');
}

function showSignIn() {
  document.getElementById('signInForm').classList.remove('hidden');
  document.getElementById('signUpForm').classList.add('hidden');
  document.getElementById('signInTab').classList.add('bg-indigo-500');
  document.getElementById('signInTab').classList.remove('bg-gray-700');
  document.getElementById('signUpTab').classList.add('bg-gray-700');
  document.getElementById('signUpTab').classList.remove('bg-indigo-500');
}

function showSignUp() {
  document.getElementById('signInForm').classList.add('hidden');
  document.getElementById('signUpForm').classList.remove('hidden');
  document.getElementById('signUpTab').classList.add('bg-indigo-500');
  document.getElementById('signUpTab').classList.remove('bg-gray-700');
  document.getElementById('signInTab').classList.add('bg-gray-700');
  document.getElementById('signInTab').classList.remove('bg-indigo-500');
}

function show(value){
  popup.innerText=value;

    popmessage.style.opacity="1"
    
    setTimeout(()=>{
      popmessage.style.opacity="0"
     }, 2000)
     showSignUp()

}

function show_normal(value){
  popup.innerText=value;

    popmessage.style.opacity="1"
    
    setTimeout(()=>{
      popmessage.style.opacity="0"
     }, 2000)
}

function openPostForm() {
  document.getElementById('postForm').classList.remove('hidden');
}

function closePostForm() {
  document.getElementById('postForm').classList.add('hidden');
}


signIn.addEventListener("submit" , async(e)=>{
  e.preventDefault();
  const email= document.querySelector('#in_email').value;
  const password= document.querySelector('#in_password').value;

  const response= await fetch('/signin', {
    method:'POST',
    headers:{
      'Content-type': 'application/json',
    },
    body: JSON.stringify({email, password})
  })


  const final= await response.json();
   
  if(final.message2 == 2)
    show("Something went wrong")
  else if(final.message2 == 1)
    {show_normal("Welcome to our webpage") 
    sign.classList.add('hidden');
    // showpost();
  }
    
  else{
    show("Something went wrong") }
  
})

signUp.addEventListener('submit', async(e)=>{
  
  e.preventDefault()
  const name=document.querySelector('#signUpName').value;
  const email=document.querySelector('#signUpEmail').value;
  const password=document.querySelector('#signUpPassword').value;

  if(name =="" || email== "" || password =="") {return show("Fill the all requirements")}

    const response= await fetch('/signup', {
      method: 'POST',
      headers:{
        'Content-type': 'application/json'
      },

      body: JSON.stringify({name, email, password})
    })

    const final= await response.json();
    show_normal(final.message)
    sign.classList.add('hidden')
    // showpost();
})


function check_valid(val){

  if(val == 0){ 
    show_normal("SignIn or SigUp your self");
    showSignIn()
    sign.classList.remove('hidden');
  }

  if(val ==1){
    show_normal("Welcome Back dear user");
    sign.classList.add('hidden');
  }

  if(val == 2){
    show_normal("No account found, Please register yourself");
    sign.classList.remove('hidden');
    showSignUp();
  }
}

post_form.addEventListener('submit', async(e)=>{
  e.preventDefault()
  const title=document.querySelector('#postTitle').value;
  const content=document.querySelector('#postContent').value;

  if(title == "" || content=="") return show_normal("Fill the posts requirement");

  const response=await fetch('/createPost', {
    method: 'POST',
    headers:{
      'Content-type': 'application/json'
    },
    body: JSON.stringify({title, content})
  })

  const data=await response.json();
  show_normal(data.message);
})


async function showpost(){
    const response=await fetch('/showpost');
    const data= await response.json(); 

   if(data.code == 0){
     post_content.innerHTML=`<h3 class="text-lg text-zinc-700 medium ">${data.message}</h3>`
      return post_content.innerHTML=cluster;
   }
  else{
        data.data.forEach((val)=>{
          console.log(val.content, val.author)

          cluster +=`<div class="bg-gray-800 p-4 rounded-lg shadow-md ">
                    <div class="flex items-center mb-3">
                        <img src="https://via.placeholder.com/30" alt="User Image" class="rounded-full mr-2 w-8 h-8">
                        <h2 class="font-bold text-lg">${val.author.name}</h2>
                    </div>
                    <p class="mt-2">${val.content}</p>
                    <div class="flex justify-between items-center mt-4">
                        <div>
                            <button class="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded">
                                <i class="fas fa-thumbs-up"></i> Like
                            </button>
                            <button class="bg-green-500 hover:bg-green-600 px-3 py-1 rounded" onclick="toggleCommentSection(this)">
                                <i class="fas fa-comment"></i> Comment
                            </button>
                        </div>
                    </div>

                  
                    <!-- <div class="hidden mt-4 comment-section">
                        <textarea placeholder="Write a comment..." class="w-full p-2 rounded bg-gray-700 text-white outline-none"></textarea>
                        <button class="bg-purple-500 hover:bg-purple-600 px-3 py-1 mt-2 rounded">
                            <i class="fas fa-paper-plane"></i> Post Comment
                        </button>
                        <div class="mt-2 border-t border-gray-600 pt-2">
                            <div class="flex items-center mt-2">
                                <span class="font-semibold">User1:</span>
                                <p class="ml-2">Great post!</p>
                            </div>
                            <div class="flex items-center mt-2">
                                <span class="font-semibold">User2:</span>
                                <p class="ml-2">Thanks for sharing!</p>
                            </div>
                        </div>
                    </div> -->
                </div>`

                return post_content.innerHTML=cluster
        })
   }

  
  

}

check_valid(message)


// cluster +=`<div class="bg-gray-800 p-4 rounded-lg shadow-md ">
//                     <div class="flex items-center mb-3">
//                         <img src="https://via.placeholder.com/30" alt="User Image" class="rounded-full mr-2 w-8 h-8">
//                         <h2 class="font-bold text-lg">${data.user.name}</h2>
//                     </div>
//                     <p class="mt-2">${val.content}</p>
//                     <div class="flex justify-between items-center mt-4">
//                         <div>
//                             <button class="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded">
//                                 <i class="fas fa-thumbs-up"></i> Like
//                             </button>
//                             <button class="bg-green-500 hover:bg-green-600 px-3 py-1 rounded" onclick="toggleCommentSection(this)">
//                                 <i class="fas fa-comment"></i> Comment
//                             </button>
//                         </div>
//                     </div>

                  
//                     <!-- <div class="hidden mt-4 comment-section">
//                         <textarea placeholder="Write a comment..." class="w-full p-2 rounded bg-gray-700 text-white outline-none"></textarea>
//                         <button class="bg-purple-500 hover:bg-purple-600 px-3 py-1 mt-2 rounded">
//                             <i class="fas fa-paper-plane"></i> Post Comment
//                         </button>
//                         <div class="mt-2 border-t border-gray-600 pt-2">
//                             <div class="flex items-center mt-2">
//                                 <span class="font-semibold">User1:</span>
//                                 <p class="ml-2">Great post!</p>
//                             </div>
//                             <div class="flex items-center mt-2">
//                                 <span class="font-semibold">User2:</span>
//                                 <p class="ml-2">Thanks for sharing!</p>
//                             </div>
//                         </div>
//                     </div> -->
//                 </div>`