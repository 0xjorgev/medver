
dirname = './seeds/'
header = "\nconsole.log(__filename.slice(__dirname.length + 1) + ' START')\n"
footer = "\nconsole.log(__filename.slice(__dirname.length + 1) + ' OK')\n"

Dir.foreach(dirname) do |item|
	next if item == '.' or item == '..'

	filename = dirname + item
	text = File.read(filename)

	unless text.include?(header) || text.include?(footer)
		File.open(filename, 'a') {|f| f << footer}
		File.open(filename + '~', 'a') {|f| header << text << footer}
	end

end

