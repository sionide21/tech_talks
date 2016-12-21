import $ from "jquery";

class Players {
  constructor(div, channel) {
    this.div = div;
    this.channel = channel;

    this.channel.onPlayersChanged(list => {
      this.renderPlayers(list.players());
    });

    $(div).on("click", ".fullscreen", (e) => {
      let playerId = e.target.dataset.playerId;
      this.channel.sendDirect(playerId, "toggleFullscreen");
    });
  }

  renderPlayers(players) {
    this.div.innerHTML = `
      <h2>Attached Players</h2>
      ${players.map(this.renderPlayer).join("")}
    `;
  }

  renderPlayer(player) {
    return `
      <div class="player">
        <h3>${player.playerId}</h3>
        <div class="fullscreen" data-player-id="${player.playerId}">Toggle Fullscreen</div>
        <dl>
          <dt class="player--status">Status</dt>
          <dd class="player--status">${player.status}</dd>
          <dt class="player--time">Time</dt>
          <dd class="player--time">${renderDuration(player.time)}</dd>
        </dl>
      </div>
    `;
  }
}

function pad(time) {
  if (time < 10) {
    return "0" + time;
  } else {
    return "" + time;
  }
}

function renderDuration(seconds) {
  var hours   = Math.floor(seconds / 3600);
  var minutes = Math.floor((seconds - (hours * 3600)) / 60);
  var seconds = Math.floor(seconds - (hours * 3600) - (minutes * 60));

  if (hours > 0) {
    return [hours, pad(minutes), pad(seconds)].join(":");
  } else {
    return [minutes, pad(seconds)].join(":");
  }
}

export default Players;
