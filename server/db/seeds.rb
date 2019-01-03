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
Node.destroy_all

player1 = Player.create(username: "alan", email: "alan@example.com", password: "0000")
player2 = Player.create(username: "bilikiss", email: "b@example.com", password: "0000")
player3 = Player.create(username: "eddie", email: "eddie@example.com", password: "0000")

maze10x10 = Maze.create({rows: 10, columns: 10})
maze15x15 = Maze.create({rows: 15, columns: 15})
maze20x20 = Maze.create({rows: 20, columns: 20})
