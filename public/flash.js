let eye=document.querySelectorAll('.eye');
let sign=document.querySelector('#form_reg');
let popup=document.querySelector('#flashText');
let popmessage=document.querySelector('#flashMessage')
const password=document.querySelector('#signUpPassword')
const password2=document.querySelector('#in_password')
let signIn=document.querySelector('#sign_in');
let signUp=document.querySelector('#sign_up');
let flag=true;



function closeForm() {
    sign.classList.add('hidden');
  }
  

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

//   sign in process
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
     
    window.location.href='/'; 
  })

  //   sign in processend

//   sign up process


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
      if(final.code ===200){
        window.location.href="/";
      }else{
        show_normal(data.message)
      }
     
  })


  //   sign up process end

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
  
  show_normal(message)