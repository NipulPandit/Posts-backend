let sign=document.querySelector('#form_reg');

let popup=document.querySelector('#flashText');
let popmessage=document.querySelector('#flashMessage')
let post_form=document.querySelector('#post_form')
let post_content=document.querySelector('#post_content')

let cluster='';



function openPostForm() {
  document.getElementById('postForm').classList.remove('hidden');
}

function closePostForm() {
  document.getElementById('postForm').classList.add('hidden');
}

function show_normal(value){
  popup.innerText=value;

    popmessage.style.opacity="1"
    
    setTimeout(()=>{
      popmessage.style.opacity="0"
     }, 2000)
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
      return post_content.innerHTML=`<h3 class="text-lg text-zinc-700 medium ">${data.message}</h3>`
   }
  else{
        data.data.forEach((val)=>{
          // console.log(val.content, val.author)

          cluster +=`<div class="bg-gray-800 p-4 rounded-lg shadow-md ">
                    <div class="flex items-center mb-3">
                        <img src="https://via.placeholder.com/30" alt="User Image" class="rounded-full mr-2 w-8 h-8">
                        <h2 class="font-medium text-[5rem]">${val.author.name}</h2>
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

                  
                     <div class="hidden mt-4 comment-section">
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
                    </div> 
                </div>`

                return post_content.innerHTML=cluster
        })
   }

  
  

}



document.addEventListener('DOMContentLoaded', showpost)

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