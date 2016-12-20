defmodule TechTalks.Session do
  def start_link do
    Agent.start_link(fn -> %{} end, name: __MODULE__)
  end

  def get_video(session_id) do
    Agent.get(__MODULE__, fn videos ->
      videos[session_id]
    end)
  end

  def set_video(session_id, video) do
    Agent.update(__MODULE__, fn videos ->
      Map.put(videos, session_id, video)
    end)
  end
end
