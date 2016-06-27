
dirname = './seeds/'
footer = "\nconsole.log(__filename.slice(__dirname.length + 1) + 'OK')\n"

Dir.foreach(dirname) do |item|
	next if item == '.' or item == '..'

	text = File.read(dirname + item)

	unless text.include?(footer)
		File.open(dirname + item, 'a') {|f| f << footer}
	end

end

