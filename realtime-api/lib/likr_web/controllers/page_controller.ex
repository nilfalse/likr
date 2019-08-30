defmodule LikrWeb.PageController do
  use LikrWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end
end
