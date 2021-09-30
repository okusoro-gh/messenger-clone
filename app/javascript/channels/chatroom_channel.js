import consumer from "./consumer"

consumer.subscriptions.create({ channel: "ChatroomChannel", room_id: 2 }, {
  connected() {
    // Called when the subscription is ready for use on the server
    console.log("connected")
  },

  disconnected() {
    // Called when the subscription has been terminated by the server
  },

  received(data) {
    // Called when there's incoming data on the websocket for this channel
    const messages = document.getElementById("messages");
    console.log(messages.innerHTML);
    messages.innerHTML = messages.innerHTML + data.html;
    console.log(messages.innerHTML);
    console.log(data);
  }
});

