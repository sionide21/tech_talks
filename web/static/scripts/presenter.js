import PresenterChannel from "../js/presenter_channel"

new PresenterChannel();


class Presenter {
  constructor(div) {
    this.div = div;

    this.channel = new PresenterChannel();
    this.channel.player_list.onChange(list => {
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
