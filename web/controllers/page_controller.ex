defmodule TechTalks.PageController do
  use TechTalks.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
