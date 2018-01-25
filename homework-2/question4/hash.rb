
def hash

  major_cities = {
    BC: ["Vancouver", "Victoria", "Prince George"],
    AB: ["Edmonton", "Calgary"]
  }


  major_cities.each do |key, value|
    if value.length > 1
      puts "#{key} has #{value.length} main cities: #{value.join(', ')}";
    else
      puts "#{key} has #{value.length} main cities: #{value.join(', ')}";
    end
  end

end

def hashStretch

  major_cities = {
    BC: ["Vancouver", "Victoria", "Prince George"],
    AB: ["Edmonton", "Calgary"]
  }

  major_cities.each do |key, value|
    if value.length > 1
      l = value.length
      lastCity = value.pop
      puts "#{key} has #{l} main cities: #{value.join(', ')} and #{lastCity}";
    else
      puts "#{key} has #{value.length} main cities: #{value.join(', ')}";
    end
  end

end
