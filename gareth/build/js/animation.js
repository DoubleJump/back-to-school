var TW = TweenMax;
var ease_in = Power2.easeIn;
var ease_out = Power2.easeOut;
var ease_quick = Power3.easeOut;
var easeback = Back.easeOut.config(1.7);
var linear = Power0.easeOut;

var flask_animation = 
{
	elements: null,
	timelines: {},
	state: 'init',
	can_click: true,
	fill_level: 0.5,
};

function svg_find(selectors, root, namespace)
{
	root = root || document; 
	for(var k in selectors)
	{
		var selector = selectors[k];
		if(namespace) selector = namespace + selector;
		var selection = root.querySelectorAll(selector);
		if(selection.length > 1) selectors[k] = selection;
		else selectors[k] = selection[0];
		if(selectors[k] === undefined) throw k + ' element not found!';
	}
	return selectors;
}

function LOG(m){console.log(m)}

function center(el)
{
	TW.set(el, {transformOrigin:"50% 50%"});
}
function hide(el)
{
	TW.set(el, {opacity:0});
}


function update_flask_level()
{
	var E = flask_animation.elements;
	var y = 252 * flask_animation.fill_level;
	var offset = 'translate(0px, ' + y + 'px)';
	E.fluid_mask.style.transform = offset;
	E.bubble_level.style.transform = offset;
}

function build_flask_animation()
{
	var E = svg_find(
	{
		flask: 'flask',
		bubbles: 'bubble',
		bubble_level: 'bubble-level',
		fluid: 'fluid',
		fluid_mask: 'fluid-mask',
	}, document, '.flask-');
	flask_animation.elements = E;
	LOG(E)

	var tl_bubbles = new TimelineMax()

	for(var i = 0; i < E.bubbles.length; ++i)
	{
		var bubble = E.bubbles[i];
		center(bubble);
		var fill = bubble.querySelector('.flask-bubble-fill');
		var shell = bubble.querySelector('.flask-bubble-shell');
		center(shell)

		var tl = new TimelineMax({repeat:-1})
		.fromTo(bubble, 0.3, {scale:0},{scale:1}, 0.0)
		.to(bubble, 0.8, {y:-60}, 0.0)
		.to(fill, 0.1, {opacity:0}, 0.3)
		.to(shell, 0.5, {scale: 2, opacity:0}, 0.3)

		tl_bubbles.add(tl, i * 0.1);
	}

	var tl_fill = new TimelineMax({repeat:-1, onUpdate:update_flask_level})
		.fromTo(flask_animation, 1.0, {fill_level:0.2},{fill_level:0.8}, 0.0)
		.to(flask_animation, 1.0, {fill_level:0.2})

	
	Draggable.create(E.flask, 
	{
		type:"xy",
	});
}


function init()
{
	build_flask_animation();
	//window.addEventListener('click', on_click);

	//var svg = document.querySelector('svg');
	//var anim = document.querySelector('.animation');

	//svg.setAttribute('preserveAspectRatio', 'xMidYMid slice');
	//svg.setAttribute('width', '100%');
	//svg.setAttribute('height', '100%');
	//svg.addEventListener('click', on_click);
	//anim.addEventListener('click', on_click);
}

window.addEventListener('load', init);