defmodule TechTalks.PlayerChannel do
  use TechTalks.Web, :channel
  alias TechTalks.Presence

  def join("player:waiting", payload, socket) do
    send(self, :after_join)
    {:ok, identify(socket)}
  end

  def handle_in("playerStateChanged", %{"state" => state}, socket) do
    {:ok, _} = Presence.update(socket, socket.assigns.player, %{
      status: state
    })
    {:noreply, socket}
  end

  intercept ["presence_diff"]

  def handle_out("presence_diff", _payload, socket) do
    {:noreply, socket}
  end

  def handle_info(:after_join, socket) do
    {:ok, _} = Presence.track(socket, socket.assigns.player, %{
      status: "waiting"
    })
    push socket, "identify", %{playerId: socket.assigns.player}
    {:noreply, socket}
  end

  defp identify(socket) do
    assign(socket, :player, TechTalks.Random.string(4))
  end
end
