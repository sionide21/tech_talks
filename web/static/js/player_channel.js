import socket from "./socket"


class PlayerChannel {
  constructor(player) {
    this.channel = socket.channel("player:waiting", {});
    this.player = player;
    this.channel.join()
      .receive("ok", resp => { console.log("Joined successfully", resp) })
      .receive("error", resp => { console.log("Unable to join", resp) });

    this.on = this.channel.on.bind(this.channel);
  }

  playerStateChanged(state) {
    this.channel.push("playerStateChanged", {state});
  }
}

export default PlayerChannel;
