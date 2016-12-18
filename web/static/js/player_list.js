import { Presence } from 'phoenix';
import Callback from "./callback";

class PlayerList {
  constructor(channel) {
    this.presence = {};
    this.changeCallback = new Callback();

    channel.on('presence_state', initialPresence => {
      this.presence = Presence.syncState(this.presence, initialPresence);
      this.changeCallback.trigger(this);
    });

    channel.on('presence_diff', diff => {
      this.presence = Presence.syncDiff(this.presence, diff);
      this.changeCallback.trigger(this);
    });
  }

  onChange(fn) {
    this.changeCallback.addListener(fn);
  }

  players() {
    return Object.keys(this.presence).map(id => ({
      playerId: id,
      status: this.presence[id].metas[0].status
    }));
  }
}

export default PlayerList;
