

module HelperMethods

  def titleize (sentence)
    excluded_words = [ "is", "in", "the", "of", "and", "or", "from"]
    new_sentence = []
    sentence.downcase.split(' ').each do |word|
      if excluded_words.include? (word)
        new_sentence << word
      else
        new_sentence << word.capitalize
      end
    end
    print new_sentence.join(' ')
  end
end
