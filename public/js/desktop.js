const lblDesktop = document.querySelector("h1");
const btnAttend = document.querySelector("button");
const lblTicket = document.querySelector("small");
const divAlert = document.querySelector(".alert");
const lblPending = document.querySelector("#lblPending");

const searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has("desktop")) {
  window.location = "index.html";
  throw new Error("Desktop is required");
}

const desktop = searchParams.get("desktop");
lblDesktop.innerHTML = desktop;
divAlert.style.display = "none";

const socket = io();

socket.on("connect", () => {
  btnAttend.disabled = false;
});

socket.on("disconnect", () => {
  btnAttend.disabled = true;
});

socket.on("pendent-tickets", (ticket) => {
  lblPending.innerHTML = ticket;
  lblPending.style.display = "";
  divAlert.style.display = "none";
  if (ticket === 0) {
    divAlert.style.display = "";
    lblPending.style.display = "none";
  }
});

btnAttend.addEventListener("click", () => {
  socket.emit("attend-ticket", { desktop }, ({ ok, msg, ticket }) => {
    if (!ok) {
      lblTicket.innerHTML = "Nobody";
      divAlert.style.display = "";
      divAlert.innerHTML = msg;
    } else {
      console.log(ticket)
      if (ticket.number === 0) {
        lblPending.style.display = "none";
      }
      lblTicket.innerHTML = `Ticket number ${ticket.number}`;
    }
  });
});
