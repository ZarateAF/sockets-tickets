const lblOnLine = document.querySelector("#lblOnLine");
const lblOffLine = document.querySelector("#lblOffLine");
const txtMsg = document.querySelector("#txtMsg");
const btnSend = document.querySelector("#btnSend");
const socket = io();

socket.on("connect", () => {
  lblOnLine.style.display = "";
  lblOffLine.style.display = "none";
});

socket.on("disconnect", () => {
  lblOnLine.style.display = "none";
  lblOffLine.style.display = "";
});

socket.on('send-msg', (payload) => {
  console.log(payload)
});

btnSend.addEventListener('click', () => {
    const payload = {
        id: "123456",
        msg: txtMsg.value,
        date: new Date().getTime()
    }
    socket.emit('send-msg', payload, (id) => {
        console.log('Callback', id)
    })
})