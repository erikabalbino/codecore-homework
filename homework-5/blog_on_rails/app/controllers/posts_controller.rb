class PostsController < ApplicationController

  before_action :find_post, except: [:new, :index, :create]

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

    redirect_to '/posts'
  end

  private
  def find_post
    @post = Post.find params[:id]
  end

  def post_params
    params.require(:post).permit(:title, :body)
  end
end
