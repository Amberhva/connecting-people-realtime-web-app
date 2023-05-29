// To make the placeholder disappear in the textfield
const inputField = document.querySelector(".textfield");
inputField.addEventListener("focus", function () {
    inputField.removeAttribute("placeholder");
});
inputField.addEventListener("blur", function () {
    inputField.setAttribute("placeholder", "Typ een bericht...");
});

<<<<<<< Updated upstream
// To make the placeholder disappear for the username
const inputUsername = document.querySelector(".username");
inputUsername.addEventListener("focus", function () {
    inputUsername.removeAttribute("placeholder");
});
inputUsername.addEventListener("blur", function () {
    inputUsername.setAttribute("placeholder", "Vul een naam in...");
});

// Socket.io
let socket = io();
let messages = document.querySelector("section ul");
let input = document.querySelector("#message");
let handle = document.querySelector("#handle");
let count = document.querySelector("#count");
document.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault();
    if (input.value) {
        socket.emit("message", input.value);
        input.value = "";
    }
});

socket.on("message", (message) => {
    addMessage(message);
});

socket.on("whatever", (message) => {
    addMessage(message);
});

socket.on("history", (history) => {
    history.forEach((message) => {
        addMessage(message);
    });
});
socket.on("usercount", (data) => {
    count.innerHTML = data;
});
=======
let socket = io()
let messages = document.querySelector("section ul")
let input = document.querySelector('#message')
let handle = document.querySelector('#handle')
let feedback =  document.querySelector('#feedback');
let count =  document.querySelector('#count');

document.querySelector('form').addEventListener('submit', event => {
  event.preventDefault()
    socket.emit('message', {
      input: input.value,
      handle: handle.value,
      time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) /*tijd bij de bericht*/
  })
  input.value = ''
})
/*tbericht verstuurd met gebruiksnaam en tijd*/
socket.on('message', data => {
  feedback.innerHTML = ''
  messages.innerHTML += `
  <div class="message-background">
    <p class="time">${data.time}</p>
    <p>${data.input}</p>
  </div>
  <h3 class="message-handle">${data.handle}</h3>
  `
  messages.scrollTop = messages.scrollHeight
})
/*waneer gebruiker typt*/
input.addEventListener('keypress', function(){
  socket.emit('typing', handle.value)
})
/*melding waneer andere gebruiker typt*/
socket.on('typing', data => {
  feedback.innerHTML = `<p><em> ${data} typ een bericht...</em></p>`
})
socket.on('usercount', data => {
  count.innerHTML = data;
})
>>>>>>> Stashed changes

function addMessage(message) {
    messages.appendChild(Object.assign(document.createElement("li"), { textContent: message }));
    messages.scrollTop = messages.scrollHeight;
}
