// To make the placeholder disappear in the textfield
const inputField = document.querySelector(".textfield");
inputField.addEventListener("focus", function () {
    inputField.removeAttribute("placeholder");
});
inputField.addEventListener("blur", function () {
    inputField.setAttribute("placeholder", "Typ een bericht...");
});

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

function addMessage(message) {
    messages.appendChild(Object.assign(document.createElement("li"), { textContent: message }));
    messages.scrollTop = messages.scrollHeight;
}
