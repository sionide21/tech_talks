import PlayerList from './player_list';
import { joinChannel } from "./socket"

class PresenterChannel {
  constructor({session, video}) {
    this.channel = joinChannel("player:" + session, {presenter: true, video: video});
    this.players = new PlayerList(this.channel);
    this.video = video;
  }
}

export default PresenterChannel;
