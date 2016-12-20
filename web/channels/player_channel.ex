defmodule TechTalks.PlayerChannel do
  use TechTalks.Web, :channel
  alias TechTalks.Presence

  # Eventually this will be stronger auth
  def join("player:waiting", %{"presenter" => presenter}, socket) do
    send(self, :sync_presence)
    {:ok, assign(socket, :presenter, presenter)}
  end
  def join("player:waiting", _, socket) do
    send(self, :track_player)

    socket = socket
    |> assign(:presenter, false)
    |> assign(:player, TechTalks.Random.string(4))

    {:ok, socket}
  end

  def join("player:" <> session, %{"presenter" => true, "video" => video}, socket) do
    TechTalks.Session.set_video(session, video)
    send(self, :sync_presence)
    {:ok, assign(socket, :presenter, true)}
  end
  def join("player:" <> session, %{"playerId" => player}, socket) do
    send(self, :track_player)
    send(self, {:load_video, TechTalks.Session.get_video(session)})

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
  def handle_in("selectPlayer", %{"playerId" => playerId}, socket) do
    if socket.assigns.presenter do
      broadcast!(socket, "selected", %{
        presenter: socket.assigns.presenter,
        playerId: playerId
      })
    end
    {:noreply, socket}
  end

  intercept ["presence_diff", "selected"]

  def handle_out("presence_diff", payload, socket) do
    if socket.assigns.presenter do
      push socket, "presence_diff", payload
    end
    {:noreply, socket}
  end
  def handle_out("selected", payload, socket) do
    if socket.assigns[:player] == payload.playerId do
      push socket, "selected", %{presenter: payload.presenter}
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
  def handle_info({:load_video, video}, socket) do
    push socket, "loadVideo", %{videoId: video}
    {:noreply, socket}
  end
  def handle_info(:sync_presence, socket) do
    push socket, "presence_state", Presence.list(socket)
    {:noreply, socket}
  end
end
