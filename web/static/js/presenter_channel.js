import PlayerList from './player_list';
import socket from "./socket"

class PresenterChannel {
  constructor() {
    this.channel = socket.channel("player:waiting", {presenter: true});
    this.channel.join()
      .receive("ok", resp => { console.log("Joined successfully", resp) })
      .receive("error", resp => { console.log("Unable to join", resp) });

    this.player_list = new PlayerList(this.channel);
  }
}

export default PresenterChannel;
