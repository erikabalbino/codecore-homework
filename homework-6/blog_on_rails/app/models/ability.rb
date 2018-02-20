class Ability
  include CanCan::Ability

  def initialize(user)
    # Define abilities for the passed in user here. For example:
    #
    user ||= User.new # guest user (not logged in)
    if user.is_admin?
      can :manage, :all
    else
      can :read, :all
    end
    #

    can :manage, Post do |post|
      post.user == user
    end

    can :manage, Comment do |comment|
      comment.user == user
    end

  end
end
