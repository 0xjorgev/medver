Dir.foreach('./seeds/') do |item|
  next if item == '.' or item == '..'
  puts item

  File.open(item, 'a') do |f|
  	f << 'console.log(__filename.slice(__dirname.length + 1) + \'OK\');'
  end

end

