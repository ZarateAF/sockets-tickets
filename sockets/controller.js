const TicketControl = require("../models/ticket-control");

const ticketControl = new TicketControl();

const socketController = (socket) => {
  socket.emit("emit-ticket", `Ticket ${ticketControl.last}`);
  socket.emit("pendent-tickets", ticketControl.tickets.length);
  socket.emit("current-state", ticketControl.last4);

  socket.on("next-ticket", (payload, callback) => {
    const next = ticketControl.next();
    callback(next);
    socket.broadcast.emit("pendent-tickets", ticketControl.tickets.length);
  });

  socket.on("attend-ticket", ({ desktop }, callback) => {
    if (!desktop)
      return callback({
        ok: false,
        msg: "Desktop is required",
      });

    const ticket = ticketControl.attendTicket(desktop);

    socket.broadcast.emit("current-state", ticketControl.last4);
    if (!ticket)
      return callback({
        ok: false,
        msg: "There's not tickets",
      });

    socket.emit("pendent-tickets", ticketControl.tickets.length);
    socket.broadcast.emit("pendent-tickets", ticketControl.tickets.length);
    return callback({
      ok: true,
      ticket,
    });
  });
};

module.exports = {
  socketController,
};
