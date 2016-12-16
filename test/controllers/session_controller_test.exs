defmodule TechTalks.SessionControllerTest do
  use TechTalks.ConnCase

  setup do
    {:ok,
      username: System.get_env["ADMIN_USERNAME"],
      password: System.get_env["ADMIN_PASSWORD"]}
  end

  test "renders form for new resources", %{conn: conn} do
    conn = get conn, session_path(conn, :new)
    assert html_response(conn, 200) =~ "Login"
  end

  test "creates session and redirects when data is valid", %{conn: conn, username: username, password: password} do
    conn = post conn, session_path(conn, :create), login: %{username: username, password: password}
    assert redirected_to(conn) == video_path(conn, :index)
  end

  test "does not create session and renders errors when data is invalid", %{conn: conn} do
    conn = post conn, session_path(conn, :create), login: %{username: "taco", password: "cat"}
    assert html_response(conn, 200) =~ "Login"
  end
end
