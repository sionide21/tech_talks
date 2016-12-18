defmodule TechTalks.PresenterChannel do
  use TechTalks.Web, :channel
  alias TechTalks.Presence
  alias TechTalks.Endpoint
  alias Phoenix.Socket.Broadcast

  def join("presenter:lobby", payload, socket) do
    if authorized?(payload) do
      send(self, :after_join)
      {:ok, socket}
    else
      {:error, %{reason: "unauthorized"}}
    end
  end

  def handle_info(:after_join, socket) do
    Endpoint.subscribe("player:waiting")
    push socket, "presence_state", Presence.list("player:waiting")
    {:noreply, socket}
  end

  def handle_info(%Broadcast{topic: _, event: ev, payload: payload}, socket) do
    push socket, ev, payload
    {:noreply, socket}
  end

  # Add authorization logic here as required.
  defp authorized?(_payload) do
    true
  end
end
