import PlayerChannel from "../js/player_channel"

const PLAYER_STATE = {
 [-1]: "UNSTARTED",
  [0]: "ENDED",
  [1]: "PLAYING",
  [2]: "PAUSED",
  [3]: "BUFFERING",
  [5]: "CUED"
};


class Player {
  constructor(awaitYoutube, div) {
    this.awaitYoutube = awaitYoutube;
    this.div = div;

    this.channel = new PlayerChannel();

    this.channel.on("identify", ({playerId}) => {
      this.setPlayerId(playerId);
    });

    this.channel.on("loadVideo", ({videoId}) => {
      this.videoId = videoId;
      this.redraw();
    });
  }

  setPlayerId(playerId) {
    this.playerId = playerId;
    this.redraw();
  }

  playerStateChanged(stateCode) {
    let state = PLAYER_STATE[stateCode] || `UNKNOWN(${stateCode})`;
    this.channel.playerStateChanged(state);
  }

  loadVideo(videoId) {
    this.awaitYoutube.then(() => {
      return new YT.Player(this.playerId, {
        height: "360",
        width: "640",
        videoId: videoId,
        playerVars: {
          modestbranding: 1,
          iv_load_policy: 3,
          controls: 0,
          rel: 0,
          showinfo: 0
        },
        events: {
          onReady: (event) => {
            this.playerStateChanged(event.target.getPlayerState());
          },
          onStateChange: (event) => {
            this.playerStateChanged(event.data);
          }
        }
      });
    });
  }

  redraw() {
    if (this.videoId) {
      this.div.innerHTML = `
        <div id="${this.playerId}"></div>
        <div class="player-id player-id--small">${this.playerId}</div>
      `;
      this.loadVideo(this.videoId);
    } else if (this.playerId) {
      this.div.innerHTML = `<div class="player-id">${this.playerId}</div>`;
    }
  }
}

export default Player;
