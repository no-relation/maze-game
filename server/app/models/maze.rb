class Maze < ApplicationRecord
    has_many :attempts
    has_many :players, through: :attempts
end
