// To make the placeholder disappear in the textfield

const inputField = document.querySelector(".textfield");

inputField.addEventListener("focus", function () {

    inputField.removeAttribute("placeholder");

});

inputField.addEventListener("blur", function () {

    inputField.setAttribute("placeholder", "Typ een bericht...");

});





// Socket.io
/* gegevens ophalen van ejs */
let socket = io();
let messages = document.querySelector(".message");
let input = document.querySelector("#message");
let handle = document.querySelector("#handle");
let feedback = document.querySelector("#feedback");
let count = document.querySelector("#count");

// State messages
const emptyState = document.querySelector(".empty");
const errorState = document.querySelector(".offline");

/*De form haal de bericht op die in de ejs staat via de server */
document.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault();
    socket.emit("message", {
        /*In de ejs haalt hij de waarde van de gebruiker op (gebruiksnaam) en de input (bericht)*/
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

// How many users are online
socket.on("usercount", (data) => {
    count.innerHTML = data;
});

// Luister naar de historie van de chat
socket.on("history", (history) => {
    // Als er geen historie is tonen we de empty state
    if (history.length === 0) {
        loadingState.style.display = "none";
        emptyState.style.display = "inline";

        // Er zijn berichten, haal de states weg en loop ze op het scherm
    } else {
        loadingState.style.display = "none";
        emptyState.style.display = "none";
        history.forEach((message) => {
            addMessage(message);
        });
    }
});

// Luister naar berichten van de server
socket.on("message", (message) => {
    loadingState.style.display = "none";
    emptyState.style.display = "none";
    addMessage(message);
});

// Er gaat iets mis bij het verbinden
socket.io.on("error", (error) => {
    loadingState.style.display = "none";
    emptyState.style.display = "none";
    errorState.style.display = "inline";
});

// Poging om opnieuw te verbinden
socket.io.on("reconnect_attempt", (attempt) => {
    console.log("attempting reconnection");
});

// Verbinding geslaagd
socket.io.on("reconnect", (attempt) => {
    loadingState.style.display = "none";
    emptyState.style.display = "none";
    errorState.style.display = "none";
});

// De server stuurt doorlopend pings om te kijken of de boel online is
socket.io.on("ping", () => {
    // ...
});

// Als het reconnecten niet goed gaat
socket.io.on("reconnect_error", (error) => {
    // ...
});

// Reconnecten is een aantal keer (reconnectionAttempts) geprobeerd en faalt
// het reconnecten stopt, misschien handig voor een 'probeer opnieuw' knop.
socket.io.on("reconnect_failed", () => {
    // ...
});

document.querySelector("form").addEventListener("submit", (event) => {

    event.preventDefault();

    socket.emit("message", {

        /*In de ejs haalt hij de waarde van de gebruiker op (gebruiksnaam) en de input (bericht)*/

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




// How many users are online

socket.on("usercount", (data) => {

    count.innerHTML = data;

});


// Luister naar de historie van de chat

socket.on("history", (history) => {

    // Als er geen historie is tonen we de empty state

    if (history.length === 0) {

        loadingState.style.display = "none";

        emptyState.style.display = "inline";
   // Er zijn berichten, haal de states weg en loop ze op het scherm

    } else {

        loadingState.style.display = "none";

        emptyState.style.display = "none";

        history.forEach((message) => {

            addMessage(message);

        });

    }

});

// Luister naar berichten van de server

socket.on("message", (message) => {

    loadingState.style.display = "none";

    emptyState.style.display = "none";

    addMessage(message);

});

// Er gaat iets mis bij het verbinden

socket.io.on("error", (error) => {

    loadingState.style.display = "none";

    emptyState.style.display = "none";

    errorState.style.display = "inline";

});

// Poging om opnieuw te verbinden

socket.io.on("reconnect_attempt", (attempt) => {

    console.log("attempting reconnection");

});


// Verbinding geslaagd

socket.io.on("reconnect", (attempt) => {

    loadingState.style.display = "none";

    emptyState.style.display = "none";

    errorState.style.display = "none";

});

// De server stuurt doorlopend pings om te kijken of de boel online is

socket.io.on("ping", () => {

    // ...

});

socket.io.on("reconnect_error", (error) => {

    // ...

});

socket.io.on("reconnect_failed", () => {

    // ...

});
function addMessage(message) {

    // Helaas lijkt de empty state niet te werken, wie snapt wat er fout is?
    if (messages.children.length === 0) {
        emptyState.style.display = "inline";
    } else {
        emptyState.style.display = "none";
    }

    messages.appendChild(Object.assign(document.createElement("li"), { textContent: message }));
    messages.scrollTop = messages.scrollHeight;
}

// error state/ hoe kan ik dit testen?????
// Er gaat iets mis bij het verbinden
socket.on("error", (error) => {
    emptyState.style.display = "none";
    errorState.style.display = "inline";
});
