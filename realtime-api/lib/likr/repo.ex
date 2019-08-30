defmodule Likr.Repo do
  use Ecto.Repo,
    otp_app: :likr,
    adapter: Ecto.Adapters.Postgres
end
