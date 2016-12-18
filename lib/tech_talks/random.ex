defmodule TechTalks.Random do
  @alphabet String.codepoints("ABCDEFGHIJKLMNOPQRSTUVWXYZ")

  def string(length, alphabet \\ @alphabet)
  def string(0, _), do: ""
  def string(length, alphabet) do
    Enum.random(alphabet) <> string(length - 1, alphabet)
  end
end
