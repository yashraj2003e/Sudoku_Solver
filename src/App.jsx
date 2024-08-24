import { useState } from "react";
import { getSudoku } from "sudoku-gen";
import "./app.css";
const sudoku = getSudoku("expert");
const sudokuPuzzle1 = sudoku.puzzle;
const sudokuAnswer = sudoku.solution;
const rightArray = [
  2, 11, 20, 29, 38, 47, 56, 65, 74, 83, 5, 14, 23, 32, 41, 50, 59, 68, 77, 86,
];
const bottomArray = [
  18, 19, 20, 21, 22, 23, 24, 25, 26, 45, 46, 47, 48, 49, 50, 51, 52, 53,
];
const leftArray = [0, 9, 18, 27, 36, 45, 54, 63, 72, 81];
const topArray = [0, 1, 2, 3, 4, 5, 6, 7, 8];
const rightArray1 = [8, 17, 26, 35, 44, 53, 62, 71, 80];
const bottomArray1 = [72, 73, 74, 75, 76, 77, 78, 79, 80];

function canFill(array, row, col, c) {
  for (let i = 0; i < 9; i++) {
    if (array[row][i] == c) return false;
    if (array[i][col] == c) return false;
    const subGridRow = 3 * Math.floor(row / 3) + Math.floor(i / 3);
    const subGridCol = 3 * Math.floor(col / 3) + (i % 3);
    if (array[subGridRow][subGridCol] == c) return false;
  }

  return true;
}

function canSolve(array) {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (array[i][j] == "-") {
        for (let c = "1"; c <= "9"; c++) {
          if (canFill(array, i, j, c)) {
            array[i][j] = c.toString();
            if (canSolve(array)) return true;
            array[i][j] = "-";
          }
        }
        return false;
      }
    }
  }
  return true;
}

function solveSudoku(sudokuPuzzle) {
  const array = Array.from({ length: 9 }, () => Array(9).fill(0));

  let x = 0;
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      array[i][j] = sudokuPuzzle[x];
      x++;
    }
  }

  console.log(array);

  if (!canSolve(array)) {
    return "-1";
  }

  let answer = "";

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      answer += array[i][j];
    }
  }
  return answer;
}

function App() {
  const [sudokuPuzzle, setSudokuPuzzle] = useState(sudokuPuzzle1 || "");
  console.log(sudokuPuzzle);
  function handleClick() {
    const response = solveSudoku(sudokuPuzzle);
    console.log(response);
    console.log(sudokuAnswer);
    if (response != sudokuAnswer) {
      window.alert("Invalid Sudoku Arrangement !");
    } else {
      setSudokuPuzzle(response);
    }
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",

        height: "100vh",
      }}
    >
      <h1>Sudoku Solver</h1>
      <div
        style={{
          display: "grid",
          gridTemplateRows: "repeat(9,1fr)",
          gridTemplateColumns: "repeat(9,1fr)",
          textAlign: "center",
        }}
      >
        {Array.from({ length: 81 }, (_, i) => (
          <input
            value={sudokuPuzzle[i] === "-" ? "" : sudokuPuzzle[i]}
            style={{
              width: "35px",
              height: "30px",
              textAlign: "center",
              fontSize: "20px",
              borderRight: `${
                rightArray.includes(i) || rightArray1.includes(i)
                  ? "2px solid black"
                  : "1px solid black"
              }`,
              borderBottom: `${
                bottomArray.includes(i) || bottomArray1.includes(i)
                  ? "2px solid black"
                  : "1px solid black"
              }`,
              borderLeft: `${
                leftArray.includes(i) ? "2px solid black" : "1px solid black"
              }`,
              borderTop: `${
                topArray.includes(i) ? "2px solid black" : "1px solid black"
              }`,
              outline: "none",
            }}
            key={i}
            onChange={(e) => {
              let newArray = sudokuPuzzle.split("");
              newArray[i] = e.target.value;
              if (e.target.value == "") {
                newArray[i] = "-";
              }
              newArray = newArray.join("");
              setSudokuPuzzle(newArray);
            }}
          />
        ))}
      </div>
      <button
        style={{
          marginTop: "20px",
          fontSize: "20px",
          padding: "9px 25px",
          cursor: "pointer",
        }}
        onClick={handleClick}
      >
        Solve
      </button>
    </div>
  );
}

export default App;
