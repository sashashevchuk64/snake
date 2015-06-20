function Matrix(containerId, rows, cols) {

	// id контейнера
	this.containerId = containerId;

	// число строк
	this.rows = rows;

	// число столбцов
	this.cols = cols;

	that = this;

	// создание сетки
	this.create = function() {
		var n = this.rows * this.cols;

		// matrix.innerHTML = '';

		for (var i = 0; i < n; i++) {
			// 	var div = document.createElement('div');
			// 	div.className = 'cell ';
			// 	matrix.appendChild(div);
			$("#" + this.containerId).append("<div class='cell'></div>")
		}
	}

	// this.addClass = function(obj, className) {
	// 	var cls = obj.className.split(' ')
	// 	var boolk = true

	// 	for (var i = 0; i < cls.length; i++) {
	// 		if (cls[i] == className)
	// 			boolk = false;
	// 	}
	// 	obj.className = cls.join(' ');

	// 	if (boolk) {
	// 		obj.className += 'designNumb';
	// 	} 
	// 	// boolk&&(obj.className+="designNumb"); 

	// }

	// this.removeClass = function(obj, className) {
	// 	var cls = obj.className.split(' ')

	// 	for (var i = 0; i < cls.length; i++) {
	// 		if (cls[i] == className)
	// 			delete cls[i];
	// 	}
	// 	obj.className = cls.join(' ');
	// }
	this.getIndex = function(row, col) {
		return (row - 1) * this.cols + col - 1;
	}

	this.setCell = function(row, col, val, cls) {
		var index = this.getIndex(row, col);
		$("#" + this.containerId).children().eq(index).toggleClass(cls, val);
		// val ? $("#" + this.containerId).children().eq(index).addClass(cls) :
		// 	$("#" + this.containerId).children().eq(index).removeClass(cls);
	}

	this.getCell = function(row, col, cls) {
		var index = this.getIndex(row, col);
		return $("#" + this.containerId).children().eq(index).hasClass(cls);
	}
	this.generateObject = function(clsObject, clsMain) {
		randomRow = Math.floor((Math.random() * rows) + 1);
		randomCol = Math.floor((Math.random() * rows) + 1);
		if (!this.getCell(randomRow, randomCol, clsMain))
			this.setCell(randomRow, randomCol, true, clsObject);
	}

}
// window.onload = function() {
// 	createMatrix();
// 	var player_x = 10;
// 	var player_y = 10;
// 	setCell(player_y, player_x, false);

// 	window.onkeydown = function(event) {
// 		var old_x = player_x
// 		var old_y = player_y
// 		if (event.keyCode == KEY_CODE.LEFT)
// 			player_x -= 1;

// 		else if (event.keyCode == KEY_CODE.RIGHT)
// 			player_x += 1;

// 		else if (event.keyCode == KEY_CODE.UP)
// 			player_y -= 1;

// 		else if (event.keyCode == KEY_CODE.DOWN)
// 			player_y += 1;
// 		if (player_y <= 0)
// 			player_y = 1;

// 		if (player_y >= 20)
// 			player_y = 20;

// 		if (player_x <= 0)
// 			player_x = 1;

// 		if (player_x >= 20)
// 			player_x = 20;

// 		setCell(old_y, old_x, true);
// 		var prov = getCell(player_y, player_x)
// 		setCell(player_y, player_x, prov);

// 	}
// }