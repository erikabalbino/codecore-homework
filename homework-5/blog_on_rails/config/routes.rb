Rails.application.routes.draw do
  # RESTful Question Routes
  # All CRUD operations

  # Post#new
  get('/posts/new', to: 'posts#new', as: :new_post)

  # Post#create
  post('/posts', to: 'posts#create', as: :posts)

  # Post#index
  get('/posts', to: 'posts#index')

  # Post#show
  get('/posts/:id', to: 'posts#show', as: :post)

  # Post#edit
  get('/posts/:id/edit', to: 'posts#edit', as: :edit_post)

  # Post#update
  patch('/posts/:id', to: 'posts#update')
  put('/posts/:id', to: 'posts#update')

  # Post#destroy
  delete('/posts/:id', to: 'posts#destroy', as: :delete_post)

end
