class Player < ApplicationRecord
    has_many :attempts
    has_many :mazes, through: :attempts
    has_secure_password
end