<script>
import io from 'socket.io-client'
  const socket = io("http://localhost:3000")
  const userinfo = window.localStorage.getItem('userinfo');
  const user = JSON.parse(userinfo);

  let name = user.firstname;
  let message = ''

  socket.emit('new-user',name);

  socket.on('chat-message', data => {
    appendMessage(`${data.name}: ${data.message}`)
  })

  socket.on('user-connected',name =>{
    connectedUser(`${name} connected`)
  })

  socket.on('user-disconnected',name =>{
    connectedUser(`${name} disconnected`)
  })

  function sendMessage() {
    socket.emit('chat-message', message)
    appendMessage(`You: ${message}`)
    message = ''
  }

function connectedUser(message){
  const userElement = document.createElement('div')
  userElement.innerText = message;
  const userContainer = document.getElementById('user-container')
  userContainer.append(userElement)
}

function appendMessage(message){
  const messageElement = document.createElement('div')
  messageElement.innerText = message;
  const messageContainer = document.getElementById('message-container')
  messageContainer.append(messageElement)
}

</script>
<section id="chat">
  <div class="grid grid-rows-2 grid-flow-col gap-2">
    <div  class="row-span-2 ...">
      <div class="bg-black p-10 rounded-lg shadow-lg opacity-70">
        <div id="user-container" class="w-full mb-4 bg-fuchsia-500 rounded-md px-4 py-4 text-white"></div>
          <div class="flex justify-center items-center">
        <div class="flex flex-col w-5/12 bg-slate-900 px-8 py-8 rounded-lg">
       </div>
      </div>
    </div>
  </div>

  <div class="col-span-2 ...">
    <div class="bg-black p-10 rounded-lg shadow-lg opacity-70">
      <div class="flex justify-center items-center max-h-fit">
        <div class="flex flex-col w-5/12 bg-slate-900 px-8 py-8 rounded-lg">
          <h1 class="mb-4 font-bold text-gray-50 text-4xl text-center">Uperform Chat</h1>
           <div  class="w-full mb-4 bg-gray-300 rounded-md px-4 py-4">
            <div id="message-container" class="px-4 py-2 mb-2 bg-fuchsia-500 rounded-md font-semibold text-gray-50 w-fit"></div>
              </div>
                <div class="w-full flex">
              <input id="msg-input" bind:value={message} class="rounded-md px-2 py-2 w-full border-0" placeholder="Message..." type="text">
              <button id="msg-btn" on:click={sendMessage} class="rounded-md px-3 py-2 bg-fuchsia-500 text-gray-50 border-0 ml-2">Send</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>