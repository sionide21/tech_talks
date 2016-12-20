import { joinChannel } from "./socket"


class PlayerChannel {
  constructor({playerId, session}) {
    this.channel = joinChannel("player:" + session, {playerId: playerId});
    this.playerId = playerId;

    this.on = this.channel.on.bind(this.channel);
  }

  playerStateChanged(state) {
    this.channel.push("playerStateChanged", {state});
  }
}

export default PlayerChannel;
