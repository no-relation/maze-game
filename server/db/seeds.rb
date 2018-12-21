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
player4 = Player.create(username: "john", email: "john@example.com", password: "0000")
player5 = Player.create(username: "janu", email: "janu@example.com", password: "0000")
player6 = Player.create(username: "megan", email: "megan@example.com", password: "0000")
player7 = Player.create(username: "brabra", email: "brabra@example.com", password: "0000")
player8 = Player.create(username: "alex", email: "alex@example.com", password: "0000")
player9 = Player.create(username: "robert", email: "robert@example.com", password: "0000")
player10 = Player.create(username: "jordan", email: "jordan@example.com", password: "0000")
player11 = Player.create(username: "joseph", email: "joseph@example.com", password: "0000")

maze3x3 = Maze.create({rows: 3, columns: 3})
maze4x4 = Maze.create({rows: 4, columns: 4})
maze5x5 = Maze.create({rows: 5, columns: 5})
maze10x10 = Maze.create({rows: 10, columns: 10})
