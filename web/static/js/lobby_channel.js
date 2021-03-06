import { joinChannel } from "./socket"
import Callback from "./callback";
import PlayerList from './player_list';

export default class LobbyChannel {
  constructor({presenter} = {}) {
    this.lobby_channel = joinChannel("player:waiting", {presenter: presenter});
    this.on = this.lobby_channel.on.bind(this.lobby_channel);
    this.players = new PlayerList(this.lobby_channel);
    this.onAvailablePlayers = this.players.onChange.bind(this.players);
    this.selectedCallback = new Callback();

    this.on("selected", ({presenter}) => {
      this.selectedCallback.trigger(presenter);
    });
  }

  leave() {
    this.lobby_channel.leave();
  }

  select(playerId) {
    this.lobby_channel.push("selectPlayer", {playerId});
  }

  onSelected(fn) {
    this.selectedCallback.addListener(fn);
  }
}
