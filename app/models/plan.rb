class Plan < ActiveRecord::Base
  # This code " has_many :users" means: Plan has many users
  has_many :users
end