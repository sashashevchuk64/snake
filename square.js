function Square(matrix, row, col, course, cls) {
	this.body = [row, col];
	this.course = course;
	this.alive = true
	var that = this;


	this.create = function() {
		matrix.setCell(that.body[0], that.body[1], true, cls);
	}

	this.move = function() {
		var last_body = that.body.slice();

		if (that.course == 'right')
			that.body[1]++;
		else if (that.course == 'left')
			that.body[1]--;
		else if (that.course == 'up')
			that.body[0]--;
		else if (that.course == 'down')
			that.body[0]++;

		if (((that.body[0] > matrix.cols) && (that.course == 'down')) || ((that.body[1] > matrix.cols) && (that.course == 'right')) || ((that.body[0] < 1) && (that.course == 'up')) || ((that.body[1] < 1) && (that.course == 'left'))) {
			that.alive = false;
		}
		if (matrix.getCell(that.body[0], that.body[1], "designNumb")) {
			that.alive = false;
		}
		if (that.alive) {
			// matrix.setCell(last_body[0], last_body[1], false, cls);
			matrix.setCell(that.body[0], that.body[1], true, cls);
		}
	}
}


function Snake(matrix, sq1) {

	this.body = [sq1.body[0], sq1.body[1], 1, 3, 1, 2];
	var that = this;

	this.snakeEatFruit = function() {

	}

	this.move = function() {

		var last_x = that.body[that.body.length - 2];
		var last_y = that.body[that.body.length - 1];
		sq1.move();
		matrix.setCell(that.body[2], that.body[3], true, 'designNumb');
		matrix.setCell(that.body[0], that.body[1], true, 'designNumb');
		that.body.pop();
		that.body.pop();
		that.body.unshift(sq1.body[1]);
		that.body.unshift(sq1.body[0]);

		var proverka = true;
		// if ($("#matrix1").children().eq(189).hasClass("fruit") && $("#matrix1").children().eq(189).hasClass("designNumb") ){
		if ((matrix.getCell(sq1.body[0], sq1.body[1], "fruit")) && (matrix.getCell(sq1.body[0], sq1.body[1], "designNumb"))) {
			proverka = false;
		}
		if (sq1.alive) {
			if (proverka) {
				matrix.setCell(last_x, last_y, false, 'designNumb');
			} else {
				matrix.setCell(sq1.body[0], sq1.body[1], false, 'fruit');
				that.body.push(last_x);
				that.body.push(last_y);
				proverka = true;
			}
		}
	}

}