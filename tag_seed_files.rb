
dirname = './seeds/'

Dir.foreach(dirname) do |item|
  next if item == '.' or item == '..'

  File.open(dirname + item, 'a') do |f|
  	f << 'console.log(__filename.slice(__dirname.length + 1) + \'OK\')'
  end

end

