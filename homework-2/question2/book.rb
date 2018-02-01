class Book

  attr_accessor :title

  def initialize
    @title, @chapters = "", []
  end

  def add_chapter(title)
    @chapters << title
  end

  def chapters
    puts "Your book: #{title} has #{@chapters.length} chapters:"
    @chapters.each.with_index do |element, b|
      puts "#{b+1}. #{element}"
    end
  end
end
