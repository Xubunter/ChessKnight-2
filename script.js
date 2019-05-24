function letterNumber(val){
	var list = {
		"A" : 1,
		"B" : 2,
		"C" : 3,
		"D" : 4,
		"E" : 5,
		"F" : 6,
		"G" : 7,
		"H" : 8,
	}

	var reverslist = {
		1 : "A",
		2 : "B",
		3 : "C",
		4 : "D",
		5 : "E",
		6 : "F",
		7 : "G",
		8 : "H",
	}

	if(/[1-8]/.test(val)){
		return reverslist[val];
	}else if(/[A-H]/.test(val)){
		return list[val];
	}else{
		return -1;
	}
}

function ChessKnight(pos){ // Функция определения возможных ходов конем из позиции pos.
	var moveX = [2, 2, 1, -1, -2,-2, 1, -1]; // Списки перемещения по x и y.
	var moveY = [1, -1, 2, 2, 1, -1, -2, -2];	
	var result = []; 
	var x0 = letterNumber(pos[0]); // Исходные координаты.
	var y0 = Number(pos[1]);

	for(var i = 0; i < 8; i++){
		var x = x0 + moveX[i];
		var y = y0 + moveY[i];
		if(x>0 && x<9 && y>0 && y<9){  // Если не выходит за пределы шахматной доски, то добавляем в результирующий массив.
			result.push(letterNumber(x)+String(y));
		}
	}
	return result;
}


var moves = []; // Делаем переменную глобальной для запоминания предыдущих мувов и возврата этим клеткам исходных цветов.
function clickOnCell(e){
	for(i = 0; i < moves.length; i++){ // Возвращаем исходные цвета клеткам.
		if(i == moves.length - 1){
			document.getElementById(moves[i]).className = document.getElementById(moves[i]).className.replace('color4','');
		}else{
			document.getElementById(moves[i]).className = document.getElementById(moves[i]).className.replace('color3','');
		}
	}
	moves = ChessKnight(e.id); // Получаем возможные ходы.
	e.className += ' color4'; // Меняем цвет начальной клетки на синий.
	for(i = 0; i < moves.length; i++){
		document.getElementById(moves[i]).className += ' color3'; // Меняем цвета клеток возможных ходов.
	}
	moves.push(e.id); // Запоминаем начальную клетку, чтобы вернуть ей искходный цвет при следующем клике.
}

function horizontalMarking(){ // Горизонтальная буквенная разметка
	var letters = ['','A','B','C','D','E','F','G','H',''];
	for(i = 0; i < 10; i++){
		document.getElementById('gamefield').innerHTML += '<p class = "horizontal">' + letters[i] + '</p>';
	}
}

function verticalMarking(i){ // Вертикальная числовая
	document.getElementById('gamefield').innerHTML += '<p class = "vertical">' + i  + '</p>';
}

function start(){
	document.getElementById('gamefield').innerHTML = "";
	horizontalMarking();
	for(i = 1; i < 9; i++){
		verticalMarking(i);
		for(j = 1; j < 9; j++){
			var c = (i%2 == 0) ? 1 + j%2 : 2 - j%2; // Определяем цвет клетки
			document.getElementById('gamefield').innerHTML += '<a id = "' + letterNumber(j) + i + '" class="color' + c +  '"  OnClick = "clickOnCell(this)"> </a>';
		}
		verticalMarking(i);
	}
	horizontalMarking();
}