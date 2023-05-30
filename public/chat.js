// To make the placeholder disappear in the textfield
const inputField = document.querySelector(".textfield");
inputField.addEventListener("focus", function () {
    inputField.removeAttribute("placeholder");
});
inputField.addEventListener("blur", function () {
    inputField.setAttribute("placeholder", "Typ een bericht...");
});
// Socket.io

/*gegevens ophalen van ejs*/
let socket = io();
let messages = document.querySelector("section ul");
let input = document.querySelector("#message");
let handle = document.querySelector("#handle");
let feedback = document.querySelector("#feedback");
let count = document.querySelector("#count");

/*De form haal de bericht op die in de ejs staat via de server */
document.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault();
    socket.emit("message", {
        /*In de ejs haalt hij de waarde van de gebruiker op(gebruiksnaam) en de input(bericht)*/
        input: input.value,
        handle: handle.value,
        /*haalt de tijd op mee mee te sturen met het bericht*/
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) /*tijd bij de bericht*/,
    });
    /*De value is wat de gebruiker als bericht wilt sturen*/
    input.value = "";
});
/*bericht verstuurd met gebruiksnaam en tijd*/
socket.on("message", (data) => {
    feedback.innerHTML = "";
    /*hier geeft ie aan hoe de layout eruit gaat zien waneer de bericht wordt gestuurd*/
    messages.innerHTML += `
  <div class="message-background">
    <p>${data.input} <span class="time">${data.time}</span></p>
  </div>
  <h3 class="message-handle">${data.handle}</h3>
  `;
    /*section krijgt scrol functie voor de berichten*/
    messages.scrollTop = messages.scrollHeight;
});
/*waneer gebruiker typt*/
input.addEventListener("keypress", function () {
    socket.emit("typing", handle.value);
});
/*melding waneer andere gebruiker aan het typt is */
socket.on("typing", (data) => {
    feedback.innerHTML = `<p class="typing"><em> ${data} is aan het typen...</em></p>`;
});
socket.on("usercount", (data) => {
    count.innerHTML = data;
});

function addMessage(message) {
    messages.appendChild(Object.assign(document.createElement("li"), { textContent: message }));
    messages.scrollTop = messages.scrollHeight;
}
