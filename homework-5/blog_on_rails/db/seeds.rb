
Post.destroy_all

50.times.each do
  p = Post.create(
    title: Faker::Job.title,
    body: Faker::Lorem.paragraph
  )
  if p.valid?
    rand(0..10).times.each do
      Comment.create(
        body: Faker::Job.field,
        post: p
      )
    end
  end
end

posts=Post.all
comments = Comment.all

puts Cowsay.say "Created #{posts.count} posts", :frogs
puts Cowsay.say "Created #{comments.count} comments", :sheep
