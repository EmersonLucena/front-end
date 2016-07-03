/*
	Feito por Emerson Leonardo Lucena
	emersonleonardolucena@hotmail.com

	Adaptado para começar no elemento mais à esquerda, sem ciclos
	Caso precise modificar para começar no centro:
	- Alterar Top, Left, Height, Width, Opacity e Z-index no CSS
	- Alterar visibilidade da left-arrow
	- Alterar idx_center para 3 e offset para 2


	Made by Emerson Leonardo Lucena
	emersonleonardolucena@hotmail.com

	Adapted to start on the leftmost element, without loops
	In case you need to start on the center:
	- Change Top, Left, Height, Width Opacity and Z-index on CSS
	- Change visibility of left-arrow
	- Change idx_center to 3 and offset to 2
*/

function slide(name,link,top,left,size,vis,z) {
	this.name = name;
	this.link = link;
	this.top = top;
	this.left = left;
	this.size = size;
	this.vis = vis;
	this.z = z;
};

var idx_center = 5, offset = 2;
var roll_flag = false;

var slideshow = [];
	slideshow[0] = new slide("Boundary","#",56,-34,101,0,0);
	slideshow[1] = new slide("IMG 01","#1",56,66,101,1,1);
	slideshow[2] = new slide("IMG 02","#2",33,153,137,1,2);
	slideshow[3] = new slide("IMG 03","#3",0,262,199,1,3);
	slideshow[4] = new slide("IMG 04","#4",33,433,137,1,2);
	slideshow[5] = new slide("IMG 05","#5",56,556,101,1,1);
	slideshow[6] = new slide("Boundary","#",56,656,101,0,0);

var adj = function(idx, orientation) {
	var ret = idx + orientation + offset;
	if(ret < 0) ret = 0;
	if(ret > 6) ret = 6;

	return slideshow[ret];
}

function upd_idx(orientation) {
	idx_center += orientation;
	offset += orientation;
	roll_flag = false;
	console.log("New center is " +(3-offset));
};

function roll(orientation) {
	roll_flag = true;

	var text = $("#slide-text");
	var link = $("#slide-link");
	link.fadeTo(100,0);
	text.fadeTo(100,0,function(){

		for(var i = 1; i <= 5; i++) {

			var next = adj(i,orientation);
			$("#mini0"+i)
				.animate({
					top: next.top,
					left: next.left,
					width: next.size,
					height: next.size,
					opacity: next.vis
				},400,"linear")

				.css("z-index",next.z);
		}

		$(text).text(slideshow[3- offset- orientation].name);
		$("#slide-link a").attr("href",slideshow[3- offset- orientation].link);

		setTimeout(function(){

			link.fadeTo(200,1);
			text.fadeTo(100,1,function(){
				upd_idx(orientation);
				$(".left-arrow").fadeTo(200,!(3 - offset == 1));
				$(".right-arrow").fadeTo(200,!(3 - offset == 5));
			})

		},350);
	});
};

$(document).ready(function(){

	$("#slide-text").text(slideshow[3 - offset].name);
	$("#slide-link a").text("MORE").attr("href",slideshow[3 - offset].link);

	$(".left-slide").click(function(){
		if(!roll_flag && idx_center < 5) 
			roll(1);
	});

	$(".right-slide").click(function(){
		if(!roll_flag && idx_center > 1) 
			roll(-1);
	});
});