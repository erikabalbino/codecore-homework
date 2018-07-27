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

  def editpassword
    render :change
  end

  def updatepassword
    if @user&.authenticate(user_params[:password])
      if user_params[:password] == user_params[:new_password]
        flash.now[:alert] = 'New password should be different from password!'
        render :change
      else
        if @user.update(password: user_params[:new_password],
            password_confirmation: user_params[:password_confirmation])
          flash[:notice] = 'Successfully changed password!'
          redirect_to posts_path
        else
          # flash.now[:alert] = 'New password does not match with the confirmation!'
          render :change
        end
      end
    else
      flash.now[:alert] = 'Wrong actual password!'
      render :change
    end
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
      :first_name, :last_name, :email, :password, :new_password, :password_confirmation
    )
  end

  def find_user
    @user = User.find(params[:id])
  end

end
