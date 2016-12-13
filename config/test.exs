use Mix.Config

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :tech_talks, TechTalks.Endpoint,
  http: [port: 4001],
  server: false

# Print only warnings and errors during test
config :logger, level: :warn

# Configure your database
config :tech_talks, TechTalks.Repo,
  adapter: Ecto.Adapters.Postgres,
  username: "postgres",
  password: "postgres",
  database: "tech_talks_test",
  hostname: "localhost",
  pool: Ecto.Adapters.SQL.Sandbox
