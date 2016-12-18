import PlayerList from './player_list';
import Callback from "./callback";
import { joinChannel } from "./socket"

class PresenterChannel {
  constructor(session) {
    this.playerChangeCallback = new Callback();

    let lobby_channel = joinChannel("player:waiting", {presenter: true});
    this.channel = joinChannel("player:" + session, {presenter: true});

    this.waitingPlayers = new PlayerList(lobby_channel);
    this.players = new PlayerList(this.channel);
  }

  onPlayerChanged(fn) {
    this.playerChangeCallback.addListener(fn);
  }
}

export default PresenterChannel;
