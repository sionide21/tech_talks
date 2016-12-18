import { joinChannel } from "./socket"


class PlayerChannel {
  constructor(player) {
    this.channel = joinChannel("player:waiting", {});
    this.player = player;

    this.on = this.channel.on.bind(this.channel);
  }

  playerStateChanged(state) {
    this.channel.push("playerStateChanged", {state});
  }
}

export default PlayerChannel;
