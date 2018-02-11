class Post < ApplicationRecord
  validates :title, presence: true, uniqueness: true
  validates :body,
    presence: {message: "must be given"},
    length: {minimum: 50}

  #custom validate:
  validate :no_monkey

  private
  def no_monkey
    if body&.downcase.include?('monkey')
      errors.add(:body,  "must not have a monkey")
    end
  end
end
