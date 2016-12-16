ExUnit.start

Ecto.Adapters.SQL.Sandbox.mode(TechTalks.Repo, :manual)

# Set default username and password for specs
System.put_env(%{
  "ADMIN_USERNAME" => "user",
  "ADMIN_password" => "letmein"
})
