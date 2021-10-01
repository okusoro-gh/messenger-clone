class User < ApplicationRecord
  validates_uniqueness_of :username

  def self.generate_user
    User.create(username: generate_random_username)
  end

  private

    def self.generate_random_username
      "User" + rand(0.1).to_s[2..7]
    end
end
