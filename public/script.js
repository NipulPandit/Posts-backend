let sign=document.querySelector('#form_reg');

if(message !== "")
  return sign.style.display='flex'


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