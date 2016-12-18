defmodule TechTalks.PlayerChannel do
  use TechTalks.Web, :channel
  alias TechTalks.Presence

  # Eventually this will be stronger auth
  def join("player:waiting", %{"presenter" => true}, socket) do
    send(self, :sync_presence)
    {:ok, assign(socket, :presenter, true)}
  end
  def join("player:waiting", _, socket) do
    send(self, :track_player)

    socket = socket
    |> assign(:presenter, false)
    |> assign(:player, TechTalks.Random.string(4))

    {:ok, socket}
  end

  def join("player:" <> _session, %{"presenter" => true}, socket) do
    send(self, :sync_presence)
    {:ok, assign(socket, :presenter, true)}
  end
  def join("player:" <> _session, %{"playerId" => player}, socket) do
    send(self, :track_player)

    socket = socket
    |> assign(:presenter, false)
    |> assign(:player, player)

    {:ok, socket}
  end
  def join("player:" <> _session, _, _) do
    {:error, %{reason: "invalid player id"}}
  end


  def handle_in("playerStateChanged", %{"state" => state}, socket) do
    {:ok, _} = Presence.update(socket, socket.assigns.player, %{
      status: state
    })
    {:noreply, socket}
  end

  intercept ["presence_diff"]

  def handle_out("presence_diff", payload, socket) do
    if socket.assigns.presenter do
      push socket, "presence_diff", payload
    end
    {:noreply, socket}
  end

  def handle_info(:track_player, socket) do
    {:ok, _} = Presence.track(socket, socket.assigns.player, %{
      status: "waiting"
    })
    push socket, "identify", %{playerId: socket.assigns.player}
    {:noreply, socket}
  end
  def handle_info(:sync_presence, socket) do
    push socket, "presence_state", Presence.list(socket)
    {:noreply, socket}
  end
end
