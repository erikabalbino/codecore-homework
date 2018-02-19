class UsersController < ApplicationController

  before_action :find_user, except: [:new, :create]

  def new
    @user = User.new
  end

  def create
    @user = User.new user_params

    if @user.save
      session[:user_id] = @user.id
      flash[:notice] = "Thank you for signing in!"
      redirect_to posts_path
    else
      render :new
    end
  end

  def edit
  end

  def update
    if @user.update_attributes(user_params)
      redirect_to posts_path, notice: 'Your changes have been saved!'
    else
      render :edit
    end
  end

  private
  def user_params
    params.require(:user).permit(
      :first_name, :last_name, :email, :password, :password_confirmation
    )
  end

  def find_user
    @user = User.find(params[:id])
  end

end
