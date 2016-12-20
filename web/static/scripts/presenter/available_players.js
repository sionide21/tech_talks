import PresenterChannel from "web/static/js/presenter_channel"
import LobbyChannel from "web/static/js/lobby_channel"
import $ from "jquery";

class AvailablePlayers {
  constructor(div, session) {
    this.div = div;

    this.lobby = new LobbyChannel({presenter: session});
    this.lobby.onAvailablePlayers(list => {
      this.renderList(list.players());
    });

    $(div).on("click", ".available-player", (e) => {
      this.addPlayer(e.target.dataset.player);
    });
  }

  renderList(players) {
    this.div.innerHTML = `
      <h2>Available Players</h2>
      <ul>
        ${players.map(this.renderWaitingPlayer).join("")}
      </ul>
    `;
  }

  addPlayer(playerId) {
    this.lobby.select(playerId);
  }

  renderWaitingPlayer(player) {
    return `<li class="available-player" data-player="${player.playerId}">${player.playerId}</li>`;
  }
}

export default AvailablePlayers;
