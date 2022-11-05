let CURRENT_PLAYER = 1;

function getCell(row, col) {
  return document.querySelector(`[data-row=\"${row}\"] [data-col=\"${col}\"]`);
}

function resetBoard() {
  document.querySelectorAll(".cell").forEach((cell) => {
    delete cell.dataset.player;
  });
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
          if (getCell(Number(row) + d * dx, Number(col) + d * dy)?.dataset.player) {
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
  }

  CURRENT_PLAYER = CURRENT_PLAYER == 1 ? 2 : 1;
}

document.querySelectorAll(".row").forEach((row) => {
  row.querySelectorAll(".cell").forEach((cell) => {
    cell.addEventListener("click", (_) => {
      onMove(row.dataset.row, cell.dataset.col, cell);
    });
  });
});
