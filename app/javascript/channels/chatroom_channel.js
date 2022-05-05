import consumer from "./consumer"
import EmojiParser from "../emoji_parser";

document.addEventListener('turbolinks:load', () => {

  const input = document.getElementsByClassName("input-group")[0].children[0];

  input.addEventListener('change', (e)=> {
    const regex = /:([\w])+:/g;
    const lastChar = e.target.value[e.target.value.length - 1];
    if(lastChar === ':') {
      alert("Hi");
    }
  });

  const messageList = document.getElementById("messages");
  messageList.innerHTML = new EmojiParser(messageList.innerHTML).parse();

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

      const parsedMessage = new EmojiParser(html).parse();
      const messageList = document.getElementById("messages");
      const parsedOldMessages = new EmojiParser(messageList.innerHTML).parse();

      messageList.innerHTML = parsedOldMessages + parsedMessage;

      this.clearInput();
    },

    clearInput() {
      document.getElementsByClassName("input-group")[0].children[0].value = '';
    }

  });

})


