#
# coloca un header y footer en los archivos de seed
#


dirname = './seeds/'
header = "\nconsole.log(__filename.slice(__dirname.length + 1) + ' START')\n\n"
footer = "\n\nconsole.log(__filename.slice(__dirname.length + 1) + ' OK')"

Dir.foreach(dirname) do |item|
	next if item == '.' or item == '..'

	filename = dirname + item
	text = File.read(filename)

	unless text.include?(header) || text.include?(footer)
		File.open(filename + '~', 'a') {|f| f << header << text << footer}
		File.rename(filename + '~', filename)
	end
end
