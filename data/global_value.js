var layer = new Konva.Layer(),map_layer = new Konva.Layer();
var ctx = map_layer.getCanvas()._canvas.getContext('2d');
let map_data=[],gop=[],mousePos;
let tile_x=32,tile_y=15,tile_x2=16,tile_y2=7.5;
let blank={down_layer:0,down_layer:0,barrier:true};
let s_pos={x:77, y:58}, e_pos={x:77, y:58}, map_pos={x:77, y:58},range=32;
let char_speed=.25;
var img_main_char = new Image(),main_char,offset_x=range*tile_x2,offset_y=range*tile_y2; let img2_y=46;
var width = 2*offset_x-tile_x2;//window.innerWidth;
var height = 2*offset_y-tile_y2;//window.innerHeight;
var stage = new Konva.Stage({
	container: 'container',
	width: width,
	height: height,
});
var zhao_animations = {
	//layer1 = 0
	leftup: [3*26,0, 26,46,   4*26,0, 26,46,    5*26,0, 26,46],
	rightup: [6*26,0, 26,46,   7*26,0, 26,46,    8*26,0, 26,46],
	leftdown: [0*26,0, 26,46,   1*26,0, 26,46,    2*26,0, 26,46],
	rightdown: [9*26,0, 26,46,   10*26,0, 26,46,    11*26,0, 26,46],
	
	//layer2 = 46
	idle: [0, img2_y, 56,63],
	atk: [7*56,img2_y, 56,63,  8*56+73*0,img2_y,73,74,     8*56+73*1,img2_y, 73,74],
	matk: [5*56,img2_y, 56,63, 6*56,img2_y, 56,63],
	def: [3*56,img2_y, 56,63],
	hurt: [4*56,img2_y, 56,63],
	dead: [2*56,img2_y, 56,63,],
};
var cursor = new Konva.Shape({
	sceneFunc: function (context, shape) {
		context.beginPath();
		context.moveTo(16, 0);
		context.lineTo(32, 7.5);
		context.lineTo(16, 15);
		context.lineTo(0, 7.5);
		context.closePath();

		// (!) Konva specific method, it is very important
		context.fillStrokeShape(shape);
	},
	stroke: 'green',
	strokeWidth: 2,
	offset: {
		x: 16,
		y: 7.5,
	},
});
layer.add(cursor);	
stage.add(map_layer,layer);
img_main_char.src = './data/img/zhao.png';
