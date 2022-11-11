var layer = new Konva.Layer(),map_layer = new Konva.Layer();
var ctx = map_layer.getCanvas()._canvas.getContext('2d');
let map_data=[],gop=[],mousePos,scale=2;
let tile_x=32*scale,tile_y=15*scale,tile_x2=tile_x/2,tile_y2=tile_y/2;
let blank={down_layer:0,down_layer:0,barrier:true};
let s_pos={x:71, y:61},e_pos={x:71, y:61+2},map_pos={x:71, y:61},range=32;
let char_speed=.25;
var img_main_char = new Image(),main_char,offset_x=range*tile_x2,offset_y=range*tile_y2; let img2_y=46;
var width = window.innerWidth;//2*offset_x-tile_x2;
var height = window.innerHeight;//2*offset_y-tile_y2;
let map_id=1,gate=[];

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
		context.moveTo(tile_x2, 0);
		context.lineTo(tile_x, tile_y2);
		context.lineTo(tile_x2, tile_y);
		context.lineTo(0, tile_y2);
		context.closePath();

		// (!) Konva specific method, it is very important
		context.fillStrokeShape(shape);
	},
	stroke: 'green',
	strokeWidth: scale*2,
	offset: {
		x: tile_x2,
		y: tile_y2,
	},
});
layer.add(cursor);	
stage.add(map_layer,layer);
img_main_char.src = './data/img/zhao.png';
