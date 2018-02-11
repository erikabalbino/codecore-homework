
Post.destroy_all

50.times.each do
  Post.create(
    title: Faker::Job.title,
    body: Faker::Lorem.paragraph,
  )
end

posts=Post.all

puts Cowsay.say "Created #{posts.count} posts", :frogs
