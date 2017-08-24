# Super dumb / simple function that inlines svgs into html source files

def parse_markup(src_path, output):
	print(src_path)
	read_state = 0
	file = open(src_path, 'r')
	for line in file:
		if line.startswith('//import'):
			path = line.split('//import ')[1].rstrip('\n').rstrip('\r')
			parse_markup(path, output)
		else:
			output.append(line)

	file.close()

def inline_svg(src_path, dst_path):
	output = [];
	file = open(dst_path, 'w')
	parse_markup(src_path, output)
	for line in output: file.write(line)
	file.close()
	print('')	
