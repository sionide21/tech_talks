import $ from "jquery";

class Controls {
  constructor(div, channel) {
    this.div = div;
    this.channel = channel;

    this.div.innerHTML = `
      <h4>Controls</h4>

      <div class="controls--buttons">
        <div class="control play"><div></div></div>
        <div class="control pause"><div></div></div>
        <div class="control syncPlayers">Sync</div>
      </div>
    `;

    $(div).on("click", ".play", (e) => {
      this.channel.send("play");
    });
    $(div).on("click", ".pause", (e) => {
      this.channel.send("pause");
    });
    $(div).on("click", ".syncPlayers", (e) => {
      let players = this.channel.players.players(),
          times = players.map(p => p.time),
          earliest = Math.min(...times);
      this.channel.send("seekTo", earliest);
    });
  }
}

export default Controls;
