
PASSWORD = 'supersecret'

User.destroy_all
Post.destroy_all
Comment.destroy_all

super_user = User.create(
  first_name: 'Jon',
  last_name: 'Snow',
  email: 'js@winterfell.gov',
  password: PASSWORD,
  is_admin: true
)

10.times.each do
  first_name = Faker::Name.first_name
  last_name = Faker::Name.last_name

  User.create(
    first_name: first_name,
    last_name: last_name,
    email: "#{first_name.downcase}.#{last_name.downcase}@example.com",
    password: PASSWORD
  )
end

users = User.all

puts Cowsay.say "Created #{users.count} users", :tux

50.times.each do
  p = Post.create(
    title: Faker::Job.title,
    body: Faker::Lorem.paragraph,
    user: users.sample
  )
  if p.valid?
    rand(0..10).times.each do
      Comment.create(
        body: Faker::Job.field,
        post: p,
        user: users.sample
      )
    end
  end
end

posts=Post.all
comments = Comment.all

puts Cowsay.say "Created #{posts.count} posts", :frogs
puts Cowsay.say "Created #{comments.count} comments", :sheep

# puts "Login with #{super_user.email} and password of '#{PASSWORD}'"
puts "Login as admin with #{super_user.email} and password of '#{PASSWORD}'"
