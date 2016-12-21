import AvailablePlayers from "./presenter/available_players"
import Players from "./presenter/players"
import Controls from "./presenter/controls"
import PresenterChannel from "../js/presenter_channel"
import $ from "jquery";

class Presenter {
  constructor(div, {session, video}) {
    this.div = div;
    this.channel = new PresenterChannel({session, video});

    this.div.innerHTML = `
      <div class="controls column"></div>
      <div class="wrap-together">
        <div class="available-players column"></div>
        <div class="players column"></div>
      </div>
    `;

    this.availablePlayers = this._attachAt(".available-players", AvailablePlayers, session);
    this.controls = this._attachAt(".controls", Controls, this.channel);
    this.players = this._attachAt(".players", Players, this.channel);
  }

  _attachAt(selector, component, ...args) {
    let div = $(selector, this.div)[0];
    new component(div, ...args);
  }
}

export default Presenter;
