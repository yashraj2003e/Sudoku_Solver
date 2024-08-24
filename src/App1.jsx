import { useState } from "react";
import { getSudoku } from "sudoku-gen";
import "./app.css";

let sudokuPuzzle = getSudoku("easy");
let sudokuAnswer = sudokuPuzzle.solution;
sudokuPuzzle = sudokuPuzzle.puzzle;
const sudokuBoard = Array.from({ length: 9 }, () => Array(9).fill(0));

function fillBoard(sudokuPuzzle) {
  let x = 0;
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      sudokuBoard[i][j] = sudokuPuzzle[x];
      x++;
    }
  }
  return sudokuBoard;
}

function canSolve(sudokuBoard, row, col, number) {
  for (let i = 0; i < 9; i++) {
    if (sudokuBoard[i][col] == number) return false;
    if (sudokuBoard[row][i] == number) return false;
    const subGridRow = 3 * Math.floor(row / 3) + Math.floor(i / 3);
    const subGridCol = 3 * Math.floor(col / 3) + (i % 3);
    if (sudokuBoard[subGridRow][subGridCol] == number) return false;
  }
  return true;
}

function solve(sudokuBoard) {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (sudokuBoard[i][j] == "-") {
        for (let c = "1"; c <= "9"; c++) {
          if (canSolve(sudokuBoard, i, j, c)) {
            sudokuBoard[i][j] = c.toString();
            if (solve(sudokuBoard)) return true;
            sudokuBoard[i][j] = "-";
          }
        }
        return false;
      }
    }
  }
  return true;
}

function App1() {
  const [solution, setSolution] = useState(sudokuPuzzle);

  function completeBoard() {
    const sudokuBoard = fillBoard(solution);
    const result = solve(sudokuBoard);
    console.log(result);
    console.log(sudokuAnswer);
    let solution1 = "";
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        solution1 += sudokuBoard[i][j].toString();
      }
    }
    if (!result || solution1 !== sudokuAnswer) return "-1";
    return solution1;
  }

  function solveBoard() {
    const result = completeBoard();
    if (result == "-1") {
      alert("Puzzle is invalid !");
      return;
    }
    setSolution(result);
  }

  function handleChange(e, index) {
    console.log(e.target.value);
    let splitStr = solution.split("");
    if (e.target.value == "") {
      splitStr[index] = "-";
    } else {
      splitStr[index] = e.target.value;
    }
    setSolution(splitStr.join(""));
  }

  return (
    <div className="main">
      <h1>Sudoku Solver</h1>
      <div className="board">
        {Array.from({ length: 81 }, (_, i) => (
          <input
            key={i}
            value={solution[i] === "-" ? "" : solution[i]}
            onChange={(e) => handleChange(e, i)}
          />
        ))}
      </div>
      <button onClick={solveBoard}>Solve</button>
    </div>
  );
}

export default App1;
