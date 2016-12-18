defmodule TechTalks.Presence do
  use Phoenix.Presence, otp_app: :tech_talks,
                        pubsub_server: TechTalks.PubSub
end
