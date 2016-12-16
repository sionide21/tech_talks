defmodule TechTalks.SessionController do
  use TechTalks.Web, :controller

  alias TechTalks.Session

  def new(conn, _params) do
    render(conn, "new.html")
  end

  def create(conn, %{"login" => login}) do
    if login["username"] == System.get_env["ADMIN_USERNAME"] && login["password"] == System.get_env["ADMIN_PASSWORD"] do
      conn
      |> TechTalks.Auth.login
      |> put_flash(:info, "Logged in.")
      |> redirect(to: video_path(conn, :index))
    else
      conn
      |> put_flash(:error, "Invalid username or password")
      |> render("new.html")
    end
  end
end
