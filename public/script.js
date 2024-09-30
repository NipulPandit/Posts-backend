let sign=document.querySelector('#form_reg');

if(message ==0) sign.style.display='flex';


function closeForm() {
   sign.style.display='none'
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



let signIn=document.querySelector('#sign_in');
let popup=document.querySelector('#flashText');
let popmessage=document.querySelector('#flashMessage');

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
   
  
  if(final.message2 == 2){
    popup.innerText="Something went wrong"

    popmessage.style.opacity="1"
    
    setTimeout(()=>{
      popmessage.style.opacity="0"
     }, 2000)
     showSignUp()

  }else if(final.message2 == 1){
      popup.innerText="Welcome to our webpage"

      popmessage.style.opacity="1"
      setTimeout(()=>{
        popmessage.style.opacity="0"
       }, 2000)

       sign.style.display="none";
  }else if(final.message2 == 0){
    popup.innerText="something went wrong"
    popmessage.style.opacity="1"

    
   setTimeout(()=>{
    popmessage.style.opacity="0"
   }, 2000)
   showSignUp()
   
}
})

