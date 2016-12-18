defmodule TechTalks.PresenterChannel do
  use TechTalks.Web, :channel
  alias TechTalks.Presence
  alias TechTalks.Endpoint
  alias Phoenix.Socket.Broadcast

  def join("presenter:lobby", payload, socket) do
    if authorized?(payload) do
      {:ok, socket}
    else
      {:error, %{reason: "unauthorized"}}
    end
  end

  # Add authorization logic here as required.
  defp authorized?(_payload) do
    true
  end
end
