# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Player.destroy_all
Maze.destroy_all
Attempt.destroy_all

player1 = Player.create(username: "alan", email: "alan@example.com")
player2 = Player.create(username: "bilikis", email: "bilikis@example.com")
player3 = Player.create(username: "eddie", email: "eddie@example.com")
player4 = Player.create(username: "john", email: "john@example.com")

Maze.create

