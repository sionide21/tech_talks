defmodule TechTalks.VideoView do
  use TechTalks.Web, :view
  alias TechTalks.Video

  def video_id(video) do
    Video.id(video)
  end
end
