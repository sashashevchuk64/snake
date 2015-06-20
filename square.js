function Square(matrix, row, col, course, cls) {
	this.body = { x:row, y: col};
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
			// matrix.setCell(last_body[0], last_body[1], false, cls);
			matrix.setCell(that.body.x, that.body.y, true, cls);
		}
	}
}


function Snake(matrix, sq1) {

	this.body = [{x :sq1.body.x, y : sq1.body.y }, {x : sq1.body.x, y : sq1.body.y-1}, {x : sq1.body.x, y: sq1.body.y-2}];
	var that = this;

	this.snakeEatFruit = function() {

	}

	this.move = function() {

		var last_x = that.body[that.body.length - 1].x;
		var last_y = that.body[that.body.length - 1].y;
		sq1.move();
		matrix.setCell(that.body[0].x, that.body[0].y, true, 'designNumb');
		matrix.setCell(that.body[1].x, that.body[1].y, true, 'designNumb');
		that.body.pop();
		that.body.unshift({x: sq1.body.x, y:sq1.body.y});

		var proverka = true;
		// if ($("#matrix1").children().eq(189).hasClass("fruit") && $("#matrix1").children().eq(189).hasClass("designNumb") ){
		if ((matrix.getCell(sq1.body.x, sq1.body.y, "fruit")) && (matrix.getCell(sq1.body.x, sq1.body.y, "designNumb"))) {
			proverka = false;
		}
		if (sq1.alive) {
			if (proverka) {
				matrix.setCell(last_x, last_y, false, 'designNumb');
			} else {
				matrix.setCell(sq1.body.x, sq1.body.y, false, 'fruit');
				that.body.push({x: last_x, y: last_y });
				proverka = true;
			}
		}
	}

}