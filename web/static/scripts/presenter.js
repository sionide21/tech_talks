import PresenterChannel from "../js/presenter_channel"
import LobbyChannel from "../js/lobby_channel"
import $ from "jquery";

class Presenter {
  constructor(div, {session, video}) {
    this.div = div;

    this.channel = new PresenterChannel({session, video});

    this.lobby = new LobbyChannel({presenter: session});
    this.lobby.onAvailablePlayers(list => {
      this.renderList(list.players());
    });

    $(div).on("click", ".waiting-player", (e) => {
      this.addPlayer(e.target.dataset.player);
    });

    $(div).on("click", ".play", (e) => {
      this.channel.send("play");
    });
  }

  renderList(players) {
    this.div.innerHTML = `
      <div class="play">Play</div>
      <ul>
        ${players.map(this.renderWaitingPlayer).join("")}
      </ul>
    `;
  }

  addPlayer(playerId) {
    this.lobby.select(playerId);
  }

  renderWaitingPlayer(player) {
    return `<li class="waiting-player" data-player="${player.playerId}">${player.playerId}</li>`;
  }
}

export default Presenter;
