import $ from "jquery";

class Players {
  constructor(div, channel) {
    this.div = div;
    this.channel = channel;

    this.channel.onPlayersChanged(list => {
      this.renderPlayers(list.players());
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
        <dl>
          <dt class="player--status">Status</dt>
          <dd class="player--status">${player.status}</dd>
        </dl>
      </div>
    `;
  }
}

export default Players;
