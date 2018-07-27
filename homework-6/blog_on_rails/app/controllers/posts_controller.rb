class PostsController < ApplicationController

  before_action :authenticate_user!, except: [:index, :show]
  before_action :find_post, except: [:new, :index, :create]
  before_action :authorize_user!, only: [:edit, :update, :destroy]

  def index
    @posts = Post.order(created_at: :desc)
  end

  def show
    # @post = Post.find params[:id]
    @comment = Comment.new
    @comments = @post.comments.order(created_at: :desc)
  end

  def new
    # render plain: "OK!"
    @post = Post.new
  end

  def create
    @post = Post.new post_params
    @post.user = current_user

    if @post.save
      redirect_to posts_path(@post)
    else
      render :new
    end

    # render json: params.require(:post)

  end

  def edit
    # @post = Post.find params[:id]
  end

  def update
    # @post = Post.find params[:id]

    if @post.update post_params
      redirect_to post_path(@post)
    else
      render :edit
    end
  end

  def destroy
    # @post = Post.find params[:id]

    @post.destroy

    redirect_to '/'
  end

  private
  def find_post
    @post = Post.find params[:id]
  end

  def post_params
    params.require(:post).permit(:title, :body)
  end

  def authorize_user!
    unless can?(:manage, @post)
      flash[:alert] = 'Access Denied!'
      redirect_to post_path(@post)
    end
  end
end
