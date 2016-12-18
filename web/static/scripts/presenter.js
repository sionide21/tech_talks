import PresenterChannel from "../js/presenter_channel"

class Presenter {
  constructor(div, session) {
    this.div = div;

    this.channel = new PresenterChannel(session);
    this.channel.waitingPlayers.onChange(list => {
      this.renderList(list.players());
    });
  }

  renderList(players) {
    this.div.innerHTML = `
      <ul>
        ${players.map(this.renderPlayer).join("")}
      </ul>
    `;
  }

  renderPlayer(player) {
    return `<li>${player.playerId} - ${player.status}</li>`;
  }
}

export default Presenter;
