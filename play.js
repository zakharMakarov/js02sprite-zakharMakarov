// холст для рисования - игровое поле
let board = document.getElementById('cnv').getContext('2d');
let boardObject = document.getElementById('cnv');
// фоновая клетка 32×32 - трава
let bg = document.getElementById('grass');
// персонаж, спрайт 32×32 – привидение из пакмана
let char = document.getElementById('ghost');
// координаты персонажа, столбец и строка, считая с нуля
let ghostCol = 0, ghostRow = 0;
// абзац с сообщением 
let msg = document.getElementById('msg');
//дерево - береза
let beresaCol = 10, beresaRow = 1;
let beresa = document.getElementById('beresa');
// константы
const maxColumns = 16;
const maxRows = 10;
const gridSize = 32;

// после загрузки картинок рисуем начальное состояние поля
function init() {
	for (let col = 0; col < maxColumns; col++) {
		for (let row = 0; row < maxRows; row++) {
			board.drawImage(bg, col*gridSize, row*gridSize);
		}
		if (col === ghostCol) board.drawImage(char, ghostCol*gridSize, ghostRow*gridSize);
		if (col === beresaCol) board.drawImage(beresa, beresaCol*gridSize, beresaRow*gridSize); // рисуем препятствие
	}	
};

function moveOnce(event) {
	let cnvBorder = boardObject.getBoundingClientRect(); // получаем границы канваса на странице
	console.log(cnvBorder.top, cnvBorder.right, cnvBorder.bottom, cnvBorder.left); // дебага

	// вправо
	// проверяем место клика - строго справа, проверяем нажатую клавишу
	if (event.clientX > cnvBorder.right && event.clientY > cnvBorder.top && event.clientY < cnvBorder.bottom || event.key === "d" || event.key === "ArrowRight" || event.key === "в") {
		 // проверяем границы поля, проверяем несовпадение новых координат персонажа и координат препятствия
		if (ghostCol < maxColumns-1 && (ghostCol+1 !== beresaCol || ghostRow !== beresaRow&&ghostRow !== beresaRow+1)) {
			board.drawImage(bg, ghostCol*gridSize, ghostRow*gridSize); // закрашиваем прежнее место
			ghostCol++; // обновляем позицию привидения
		}	
	}

	// влево
	if (event.clientX < cnvBorder.left && event.clientY > cnvBorder.top && event.clientY < cnvBorder.bottom || event.key === "a" || event.key === "ArrowLeft" || event.key === "ф") {
		if (ghostCol > 0 && (ghostCol-1 !== beresaCol || ghostRow !== beresaRow&&ghostRow !== beresaRow+1)) {
			board.drawImage(bg, ghostCol*gridSize, ghostRow*gridSize);
			ghostCol--;
		}	
	}

	// вверх
	if (event.clientY < cnvBorder.top && event.clientX > cnvBorder.left && event.clientX < cnvBorder.right || event.key === "w" || event.key === "ArrowUp" || event.key === "ц") {
		if (ghostRow > 0 && (beresaRow-1 !== beresaRow&&ghostRow-1 !== beresaRow+1 || ghostCol !== beresaCol)) {
			board.drawImage(bg, ghostCol*gridSize, ghostRow*gridSize);
			ghostRow--;
		}	
	}

	// вниз
	if (event.clientY > cnvBorder.bottom && event.clientX > cnvBorder.left && event.clientX < cnvBorder.right || event.key === "s" || event.key === "ArrowDown" || event.key === "ы") {
		if (ghostRow < maxRows-1 && (ghostRow+1 !== beresaRow || ghostCol !== beresaCol)) {
			board.drawImage(bg, ghostCol*gridSize, ghostRow*gridSize);
			ghostRow++;
		}	
	}

	// обновляем спрайт персонажа
	board.drawImage(char, ghostCol*gridSize, ghostRow*gridSize);

	if (event.type == "mouseup") {
		msg.value = "Клик в "+ event.clientX + ", "+ event.clientY +"!";
	}
}
	
window.onload = init;
document.onmouseup = moveOnce;
document.onkeyup = moveOnce;
