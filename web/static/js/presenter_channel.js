import PlayerList from './player_list';
import { joinChannel } from "./socket"

class PresenterChannel {
  constructor(session) {
    this.channel = joinChannel("player:" + session, {presenter: true});
    this.players = new PlayerList(this.channel);
  }
}

export default PresenterChannel;
