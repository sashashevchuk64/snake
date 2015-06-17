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
	var m1 = new Matrix('matrix1', 20, 20);
	m1.create();

	var m2 = new Matrix('matrix2', 10, 10);
	m2.create();

	var square = new Square(m1, 1, 4, 'right', 'designNumb');
	// square.create();

	var squarefruit = new Square(m1, 10, 10, '', 'fruit');
	squarefruit.create();

	var square2 = new Square(m2, 1, 2, 'right', 'designNumb');
	square2.create();

	var snake1 = new Snake(m1, square);

	var gameplay = function() {
		snake1.move();

		// square.move();
		// square2.move();

		if (!square.alive || !square2.alive) {
			clearInterval(intervalGameplay)
			alert("FIN");
		}
	}

	var intervalGameplay = setInterval(gameplay, 300)

	$(document).keydown(function(event) {
		if (event.which == KEY_CODE_PL1.LEFT) {
			if (square.course != 'right')
				square.course = 'left';

		} else if (event.which == KEY_CODE_PL1.RIGHT) {
			if (square.course != 'left')
				square.course = 'right';

		} else if (event.which == KEY_CODE_PL1.UP) {
			if (square.course != 'down')
				square.course = 'up';

		} else if (event.which == KEY_CODE_PL1.DOWN) {
			if (square.course != 'up')
				square.course = 'down';

		} else if (event.which == KEY_CODE_PL2.LEFT) {
			if (square2.course != 'right')
				square2.course = 'left';

		} else if (event.which == KEY_CODE_PL2.RIGHT) {
			if (square2.course != 'left')
				square2.course = 'right';

		} else if (event.which == KEY_CODE_PL2.UP) {
			if (square2.course != 'down')
				square2.course = 'up';

		} else if (event.which == KEY_CODE_PL2.DOWN) {
			if (square2.course != 'up')
				square2.course = 'down';
		}
	});

}