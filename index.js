let CURRENT_PLAYER = 1;

function getCell(row, col) {
	return document.querySelector(`[data-row=\"${row}\"] [data-col=\"${col}\"]`);
}

function gameOver(winner) {
	CURRENT_PLAYER = -1;
	if (winner == 0) {
		updateHeader("DRAW!");
	} else if (winner == 1) {
		updateHeader("Red Won!");
	} else if (winner == 2) {
		updateHeader("Blue Won!");
	}
}

function updateHeader(message) {
	document.querySelector("#state").textContent = message;
}

function newGame() {
	document.querySelectorAll(".cell").forEach((cell) => {
		delete cell.dataset.player;
	});
	CURRENT_PLAYER = 1;
}

function onMove(row, col, cell) {
	if (cell.dataset.player) {
		return;
	}

	cell.dataset.player = CURRENT_PLAYER;

	// check for wins
	WINNER = false;
	[-1, 0, 1].forEach((dx) => {
		[-1, 0, 1].forEach((dy) => {
			if (dx + dy != 0) {
				let count = 0;
				[0, 1, 2].forEach((d) => {
					if (
						getCell(Number(row) + d * dx, Number(col) + d * dy)?.dataset
							.player == CURRENT_PLAYER
					) {
						count++;
					}
				});
				if (count == 3) {
					WINNER = true;
				}
			}
		});
	});

	if (WINNER) {
		// win script
		gameOver(CURRENT_PLAYER);
	} else if (document.querySelector(".cell:not([data-player])") == null) {
		gameOver(0);
	} else {
		CURRENT_PLAYER = CURRENT_PLAYER == 1 ? 2 : 1;
		updateHeader(CURRENT_PLAYER == 1 ? "Red's Move" : "Blue's Move");
	}
}

document.querySelectorAll(".row").forEach((row) => {
	row.querySelectorAll(".cell").forEach((cell) => {
		cell.addEventListener("click", (_) => {
			if (CURRENT_PLAYER != -1) {
				onMove(row.dataset.row, cell.dataset.col, cell);
			}
		});
	});
});

newGame();
