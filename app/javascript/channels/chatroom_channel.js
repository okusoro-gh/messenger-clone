import consumer from "./consumer"
import subscription from "@rails/actioncable/src/subscription";

document.addEventListener('turbolinks:load', () => {
  const roomElement = document.getElementById('room-id');
  const roomId = Number(roomElement.getAttribute('data-room-id'));

  //Unsubscribe from all subscriptions
  consumer.subscriptions.subscriptions.forEach(subscription => {
    consumer.subscriptions.remove(subscription)
  });

  consumer.subscriptions.create({ channel: "ChatroomChannel", room_id: roomId }, {
    connected() {
      // Called when the subscription is ready for use on the server
      console.log("connected to" + roomId)
    },

    disconnected() {
      // Called when the subscription has been terminated by the server
    },

    received(data) {
      // Called when there's incoming data on the websocket for this

      const element = document.getElementById("user-id");
      const user_id = Number(element.getAttribute("data-user-id"));

      let html;

      if (user_id === data.message.user_id) {
        html = data.my_message
      } else {
        html = data.their_message;
      }

      const messages = document.getElementById("messages");
      console.log(messages.innerHTML);
      messages.innerHTML = messages.innerHTML + html;
      console.log(messages.innerHTML);
      console.log(data);
    }
  });

})


