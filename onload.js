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
var intervalGameplay;
$(document).ready(function() {
	$("#information").hide();
	$("#resetgame").on("click", function() {
		window.location = window.location;
	});
	$("#startgame").on("click", function() {
		$("#startgame").attr("disabled", true)
		$("#rules").attr("disabled", true)
		intervalGameplay = setInterval(function() { gameplay(snake1); }, 200);
	});
	$("#rules").click(function() {
		if ($("#matrix1").css('opacity') != 0) {
			$("#matrix1").hide(1000);
			$("#rules").attr("value", "К игре");
			$("#startgame").attr("disabled", true);
			$("#matrix1").animate({
				opacity: 0
			}, 10);

			$("#information").show(1000);
		} else {
			$("#startgame").attr("disabled", false)
			$("#rules").attr("value", "Правила");
			$("#information").hide(1000);
			$("#matrix1").animate({
				opacity: 1
			}, 10);
			$("#matrix1").show(1000);

		}
	});

	// if ($("#matrix1").css('opacity') != 0) {
	// 	$("#matrix1").animate({
	// 		opacity: 0
	// 	}, 1000);
	// 	$("#information").animate({
	// 		opacity: 1
	// 	}, 1000);
	// } else {
	// 	$("#matrix1").animate({
	// 		opacity: 1
	// 	}, 1000);
	// 	$("#information").animate({
	// 		opacity: 0
	// 	}, 1000);
	// }


	var m1 = new Matrix('matrix1', 20, 20);
	m1.create();

	var m2 = new Matrix('matrix2', 10, 10);
	m2.create();

	var square = new Square(m1, 1, 4, 'right', 'designNumb');
	// square.create();



	var square2 = new Square(m2, 1, 3, 'right', 'designNumb');

	var snake1 = new Snake(m1, square);
	var i = 0;

	var snake2 = new Snake(m2, square2);
	var i = 0;

	var once;
	var gameplay = function(snake) {
		if (((snake.sq1.body.x > snake.sq1.matrix.cols - 1) && (snake.sq1.course == 'down')) || ((snake.sq1.body.y > snake.sq1.matrix.cols - 1) && (snake.sq1.course == 'right')) || ((snake.sq1.body.x < 2) && (snake.sq1.course == 'up')) || ((snake.sq1.body.y < 2) && (snake.sq1.course == 'left'))) {
			snake.sq1.alive = false;
		}
		snake.move();
		once = false;


		if (i % 40 == 0)
			snake.matrix.generateObject('fruit', 'designNumb');



		// square.move();
		// square2.move();

		if (!snake.sq1.alive) {
			clearInterval(intervalGameplay)
			alert("FIN");
			$("#resetgame").attr("disabled", false)
		}
		i++;
	};
	$(document).keyup(function(event) {
		if (!once) {
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

			} else if (event.which == KEY_CODE_PL2.RIGHT) {
				if (square2.course != 'left')
					square2.course = 'right';
				once = true;

			} else if (event.which == KEY_CODE_PL2.UP) {
				if (square2.course != 'down')
					square2.course = 'up';
				once = true;

			} else if (event.which == KEY_CODE_PL2.DOWN) {
				if (square2.course != 'up')
					square2.course = 'down';
				once = true;

			} else if (event.which == KEY_CODE_PL2.LEFT) {
				if (square2.course != 'right')
					square2.course = 'left';
				once = true;

			}

		}
	});


});