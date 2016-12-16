defmodule TechTalks.Auth do
  import Plug.Conn
  import Phoenix.Controller

  def init(opts) do
    opts
  end

  def call(conn, _opts) do
    if logged_in?(conn) do
      conn
    else
      conn
      |> redirect(to: "/login")
      |> halt
    end
  end

  def login(conn) do
    put_session(conn, :logged_in, true)
  end

  def logged_in?(conn) do
    get_session(conn, :logged_in)
  end
end
