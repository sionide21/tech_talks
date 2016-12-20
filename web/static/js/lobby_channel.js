import { joinChannel } from "./socket"
import Callback from "./callback";
import PlayerList from './player_list';

export default class LobbyChannel {
  constructor({presenter}) {
    this.lobby_channel = joinChannel("player:waiting", {presenter: presenter});
    this.players = new PlayerList(this.lobby_channel);
    this.onAvailablePlayers = this.players.onChange.bind(this.players);
    this.selectedCallback = new Callback();

    this.lobby_channel.on("selected", ({presenter}) => {
      this.selectedCallback.trigger(presenter);
    });
  }

  select(playerId) {
    this.lobby_channel.push("selectPlayer", {playerId});
  }

  onSelected(fn) {
    this.selectedCallback.addListener(fn);
  }
}
