import {Socket} from "phoenix"

let socket = new Socket("/socket")

socket.connect();

function joinChannel(name, payload) {
  let channel = socket.channel(name, payload);
  channel.join()
    .receive("ok", resp => { console.log("Joined successfully", resp) })
    .receive("error", resp => { console.log("Unable to join", resp) });

  return channel;
}

export { joinChannel };

export default socket;
