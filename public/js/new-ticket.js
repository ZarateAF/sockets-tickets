const lblNewTicket = document.querySelector("#lblNewTicket");
const btnCreate = document.querySelector("button");

const socket = io();

socket.on("connect", () => {
  btnCreate.disabled = false;
});

socket.on("disconnect", () => {
  btnCreate.disabled = true;
});

socket.on("emit-ticket", (ticket) => {
    lblNewTicket.innerHTML = ticket;
});

btnCreate.addEventListener("click", () => {
  socket.emit("next-ticket", null, (ticket) => {
    lblNewTicket.innerHTML = ticket;
  });
});
