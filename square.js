function Square(matrix, row, col, course, cls) {
	this.body = {
		x: row,
		y: col
	};
	this.course = course;
	this.matrix = matrix;
	this.alive = true
	var that = this;


	this.create = function() {
		matrix.setCell(that.body.x, that.body.y, true, cls);
	}

	this.move = function() {
		var last_body = jQuery.extend({}, that.body);

		if (that.course == 'right')
			that.body.y++;
		else if (that.course == 'left')
			that.body.y--;
		else if (that.course == 'up')
			that.body.x--;
		else if (that.course == 'down')
			that.body.x++;

		// if (((that.body.x > matrix.cols) && (that.course == 'down')) || ((that.body.y > matrix.cols) && (that.course == 'right')) || ((that.body.x < 1) && (that.course == 'up')) || ((that.body.y < 1) && (that.course == 'left'))) {
		// 	that.alive = false;
		// }
		if (matrix.getCell(that.body.x, that.body.y, "designNumb")) {
			that.alive = false;
		}
		if (that.alive) {
			matrix.setCell(last_body.x, last_body.y, false, cls);
			matrix.setCell(that.body.x, that.body.y, true, cls);
		}
	}
}


function Snake(matrix, sq1) {
	this.matrix = matrix;
	this.sq1 = sq1;

	this.body = [{
		x: sq1.body.x,
		y: sq1.body.y
	}, {
		x: sq1.body.x,
		y: sq1.body.y - 1
	}, {
		x: sq1.body.x,
		y: sq1.body.y - 2
	}];
	var that = this;

	this.strike = function() {
		var sqbul = new Square(that.matrix, that.body[0].x, that.body[0].y, that.sq1.course, "bulletFire");
		sqbul.create();
		var bullfhs = setInterval(function() {
			if (sqbul.alive) {
				sqbul.move();
				if (sqbul.matrix.getCell(sqbul.body.x, sqbul.body.y, "bomb bulletFire")) {
					sqbul.matrix.setCell(sqbul.body.x, sqbul.body.y, false, 'bomb bulletFire');
					sqbul.matrix.setCell(sqbul.body.x, sqbul.body.y, true, 'fire');
					document.getElementById("audiotest").play();
					setTimeout(function() {
						sqbul.matrix.setCell(sqbul.body.x, sqbul.body.y, false, 'fire');
					}, 150);
					clearInterval(bullfhs);

				}

				if (sqbul.matrix.getCell(sqbul.body.x, sqbul.body.y, "fruit bulletFire")) {
					sqbul.matrix.setCell(sqbul.body.x, sqbul.body.y, false, 'fruit bulletFire');
					sqbul.matrix.setCell(sqbul.body.x, sqbul.body.y, true, 'fire');
					setTimeout(function() {
						sqbul.matrix.setCell(sqbul.body.x, sqbul.body.y, false, 'fire');
					}, 150);
					clearInterval(bullfhs);
				}

				if (((sqbul.body.x > sqbul.matrix.cols) && (sqbul.course == 'down')) || ((sqbul.body.y > sqbul.matrix.cols) && (sqbul.course == 'right')) || ((sqbul.body.x < 1) && (sqbul.course == 'up')) || ((sqbul.body.y < 1) && (sqbul.course == 'left'))) {

					clearInterval(bullfhs);
					sqbul.matrix.setCell(sqbul.body.x, sqbul.body.y, false, "bulletFire");

				}
			} else {
				clearInterval(bullfhs);
				clearInterval(intervalGameplay);
				setTimeout(function() {
					alert("GAME OVER");
					$("#resetgame").attr("disabled", false);
				}, 1000);

			};
		}, 70);
	}

	this.move = function() {

		var last_x = that.body[that.body.length - 1].x;
		var last_y = that.body[that.body.length - 1].y;
		sq1.move();
		matrix.setCell(that.body[0].x, that.body[0].y, true, 'designNumb');
		matrix.setCell(that.body[1].x, that.body[1].y, true, 'designNumb');
		that.body.pop();
		that.body.unshift({
			x: sq1.body.x,
			y: sq1.body.y
		});

		var proverka = true;
		// if ($("#matrix1").children().eq(189).hasClass("fruit") && $("#matrix1").children().eq(189).hasClass("designNumb") ){
		if ((matrix.getCell(sq1.body.x, sq1.body.y, "fruit")) && (matrix.getCell(sq1.body.x, sq1.body.y, "snakeHead"))) {
			proverka = false;
		}
		if (sq1.alive) {
			if (proverka) {
				matrix.setCell(last_x, last_y, false, 'designNumb');
			} else {
				matrix.setCell(sq1.body.x, sq1.body.y, false, 'fruit');
				that.body.push({
					x: last_x,
					y: last_y
				});
				proverka = true;
			}
		}
	}

}