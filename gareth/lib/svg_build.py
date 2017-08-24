from svg_parse import *
from svg_inline import *

compile_svg('assets/svg/phone.svg', 'assets/compiled_svg/phone.svg', 
{
	'namespace': 'phone',
	'process_layer_names': True,
	'convert_svg_text_to_html': False,
	'use_html_markup_in_text': False,
	'dont_overflow_text_areas': False,
	'remove_text_attributes': False,
	'remove_artboards': False,
	'use_orgin_shortcut': True,
	'minify': False,
	'title': False,
})

inline_svg('assets/html/animation.html', 'build/index.html')