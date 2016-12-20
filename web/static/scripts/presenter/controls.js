import $ from "jquery";

class Controls {
  constructor(div, channel) {
    this.div = div;
    this.channel = channel;

    this.div.innerHTML = `
      <h2>Controls</h2>

      <div class="controls--buttons">
        <div class="control play"></div>
        <div class="control pause"></div>
      </div>
    `;

    $(div).on("click", ".play", (e) => {
      this.channel.send("play");
    });
    $(div).on("click", ".pause", (e) => {
      this.channel.send("pause");
    });
  }
}

export default Controls;
