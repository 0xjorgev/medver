Dir.foreach('./seeds/') do |item|
  next if item == '.' or item == '..'
  puts item
end

