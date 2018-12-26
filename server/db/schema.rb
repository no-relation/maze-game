# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2018_12_26_195606) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "attempts", force: :cascade do |t|
    t.bigint "player_id"
    t.bigint "maze_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "score"
    t.index ["maze_id"], name: "index_attempts_on_maze_id"
    t.index ["player_id"], name: "index_attempts_on_player_id"
  end

  create_table "mazes", force: :cascade do |t|
    t.integer "rows"
    t.integer "columns"
    t.integer "high_score"
    t.bigint "start_node_id"
    t.bigint "end_node_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["end_node_id"], name: "index_mazes_on_end_node_id"
    t.index ["start_node_id"], name: "index_mazes_on_start_node_id"
  end

  create_table "nodes", force: :cascade do |t|
    t.integer "row"
    t.integer "col"
    t.bigint "maze_id"
    t.integer "north_neighbor"
    t.integer "east_neighbor"
    t.integer "south_neighbor"
    t.integer "west_neighbor"
    t.index ["maze_id"], name: "index_nodes_on_maze_id"
  end

  create_table "players", force: :cascade do |t|
    t.string "username"
    t.string "password_digest"
    t.string "email"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
