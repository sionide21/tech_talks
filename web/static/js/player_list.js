import { Presence } from 'phoenix';

class PlayerList {
  constructor(channel) {
    this.presence = {};
    this.listeners = [];

    channel.on('presence_state', initialPresence => {
      this.presence = Presence.syncState(this.presence, initialPresence);
      this.changed();
    });

    channel.on('presence_diff', diff => {
      this.presence = Presence.syncDiff(this.presence, diff);
      this.changed();
    });
  }

  onChange(fn) {
    this.listeners.push(fn);
  }

  players() {
    return Object.keys(this.presence).map(id => ({
      playerId: id,
      status: this.presence[id].metas[0].status
    }));
  }

  changed() {
    this.listeners.forEach(fn => {
      fn(this);
    });
  }
}

export default PlayerList;
