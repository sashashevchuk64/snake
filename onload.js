var KEY_CODE_PL1 = {
	LEFT: 37,
	UP: 38,
	RIGHT: 39,
	DOWN: 40

};

var KEY_CODE_PL2 = {
	LEFT: 65,
	UP: 87,
	RIGHT: 68,
	DOWN: 83

};

window.onload = function() {
	$("#info").click(function(){
		//$("li").hide(3000).show(2000);
		//$("li").toggle();
		//$("li").animate({opacity: 0.5, height: '+=50'}, 3000);
		$("#matrix1").animate({opacity: 0}, 1000);
		$("#information").animate({opacity: 1}, 1000);
	});
	var m1 = new Matrix('matrix1', 20, 20);
	m1.create();

	var m2 = new Matrix('matrix2', 10, 10);
	m2.create();

	var square = new Square(m1, 1, 4, 'right', 'designNumb');
	// square.create();



	var square2 = new Square(m2, 1, 2, 'right', 'designNumb');
	square2.create();

	var snake1 = new Snake(m1, square);
	var i = 0;

	var once;
	var gameplay = function() {
		if (((square.body.x > square.matrix.cols-1) && (square.course == 'down')) || ((square.body.y > square.matrix.cols-1) && (square.course == 'right')) || ((square.body.x < 2) && (square.course == 'up')) || ((square.body.y < 2) && (square.course == 'left'))) {
			square.alive = false;
		}
		snake1.move();
		once = false;


		if (i % 40 == 0)
			m1.generateObject('fruit', 'designNumb');



		// square.move();
		// square2.move();

		if (!square.alive) {
			clearInterval(intervalGameplay)
			alert("FIN");
		}
		i++;
	}

	var intervalGameplay = setInterval(gameplay, 200);

	$(document).keyup(function(event) {
			if (!once){
				if (event.which == KEY_CODE_PL1.LEFT) {
					if (square.course != 'right')
						square.course = 'left';
					once = true;

				} else if (event.which == KEY_CODE_PL1.RIGHT) {
					if (square.course != 'left')
						square.course = 'right';
					once = true;

				} else if (event.which == KEY_CODE_PL1.UP) {
					if (square.course != 'down')
						square.course = 'up';
					once = true;

				} else if (event.which == KEY_CODE_PL1.DOWN) {
					if (square.course != 'up')
						square.course = 'down';
					once = true;

				} 
			}
		});


}