/*
Simple export script for Illustrator that converts all files in a specified folder to svgs
Can be called from Files > Scripts > Other Scripts within Illustrator or 
#open -a 'Adobe Illustrator.app' "path_to_svg_export.jsx" from the commandline
*/

// TODO: figure out how to pass in command line arguments
var src_folder = Folder('full/path/to/illustrator/files')
var dst_folder = Folder('full/path/to/output/folder')
//var src_folder = app.scriptArgs.getValue("src"); 
//var dst_folder = app.scriptArgs.getValue("dst"); 

// app.userInteractionLevel = UserInteractionLevel.DONTDISPLAYALERTS;


var files = src_folder.getFiles('*.ai');
if(files.length === 0)
{
	alert('No matching files found');
	return;
}

for(var i = 0; i < files.length; ++i)
{
	var src_doc = app.open(files[i]);

	// TODO: show all layers - preferably via an option
	
	var options = new ExportOptionsWebOptimizedSVG();
	options.coordinatePrecision = 1;
	options.cssProperties = SVGCSSPropertyLocation.PRESENTATIONATTRIBUTES;
	options.fontType = SVGFontType.SVGFONT;
	options.rasterImageLocation = RasterImageLocation.EMBED;
	options.svgId = SVGIdType.SVGIDREGULAR;
	options.saveMultipleArtboards = true;
	options.svgMinify = false;
	options.svgResponsive = true;
				
	var doc_name = src_doc.name;
	var new_name = '';
	for(var i = 0; doc_name[i] != "." ; ++i) new_name += doc_name[i];
	var result = new File(dst_folder + '/' + new_name + '.svg');

	src_doc.exportFile(result, ExportType.WOSVG, options);
	src_doc.save();
	//src_doc.close(); //closing the doc seems to get Illustrator all crashy
}

