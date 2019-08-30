defmodule LikrWeb.RoomChannel do
  use LikrWeb, :channel

  def join("todos:" <> todo_id, _params, socket) do
    {:ok, assign(socket, :todo_id, todo_id) }
  end

  def handle_in("new:todo", params, socket) do
    broadcast! socket, "new:todo", %{
      text: params["text"],
      id: socket.assigns.todo_id,
    }

    {:reply, :ok, socket}
  end

  def handle_in("update:todo", params, socket) do
    broadcast! socket, "update:todo", %{
      text: params["text"]
    }

    {:reply, :ok, socket}
  end
end
