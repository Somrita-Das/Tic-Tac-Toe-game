import React, { useState } from 'react';
import './TicTacToe.css';
import circle_icon from '../Assets/circle.png';
import cross_icon from '../Assets/cross.png';

const TicTacToe = () => {
  const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);
  const [data, setData] = useState(["", "", "", "", "", "", "", "", ""]);
  const [count, setCount] = useState(0);
  const [lock, setLock] = useState(false);
  const [winner, setWinner] = useState(""); // For win/draw message

  const toggle = (index) => {
    if (lock || board[index] !== "") return;

    const newBoard = [...board];
    const newData = [...data];

    if (count % 2 === 0) {
      newBoard[index] = <img src={cross_icon} alt="X" />;
      newData[index] = "x";
    } else {
      newBoard[index] = <img src={circle_icon} alt="O" />;
      newData[index] = "o";
    }

    setBoard(newBoard);
    setData(newData);
    setCount(prev => {
      const newCount = prev + 1;
      checkWin(newData, newCount); // Pass updated count
      return newCount;
    });
  };

  const reset = () => {
    setBoard(["", "", "", "", "", "", "", "", ""]);
    setData(["", "", "", "", "", "", "", "", ""]);
    setCount(0);
    setLock(false);
    setWinner("");
  };

  const checkWin = (data, currentCount) => {
    const winPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6],           // diagonals
    ];

    for (let pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (data[a] && data[a] === data[b] && data[a] === data[c]) {
        won(data[a]);
        return;
      }
    }

    if (currentCount === 9) {
      setLock(true);
      setWinner("It's a draw!");
    }
  };

  const won = (player) => {
    setLock(true);
    setWinner(`Congratulations ${player.toUpperCase()} wins!`);
  };

  return (
    <div className='container'>
      <h1 className="title">
        {winner ? (
          <span className="winner">{winner}</span>
        ) : (
          <>Tic Tac Toe Game In <span>React</span></>
        )}
      </h1>

      <div className="board">
        <div className="row1">
          <div className="boxes" onClick={() => toggle(0)}>{board[0]}</div>
          <div className="boxes" onClick={() => toggle(1)}>{board[1]}</div>
          <div className="boxes" onClick={() => toggle(2)}>{board[2]}</div>
        </div>
        <div className="row2">
          <div className="boxes" onClick={() => toggle(3)}>{board[3]}</div>
          <div className="boxes" onClick={() => toggle(4)}>{board[4]}</div>
          <div className="boxes" onClick={() => toggle(5)}>{board[5]}</div>
        </div>
        <div className="row3">
          <div className="boxes" onClick={() => toggle(6)}>{board[6]}</div>
          <div className="boxes" onClick={() => toggle(7)}>{board[7]}</div>
          <div className="boxes" onClick={() => toggle(8)}>{board[8]}</div>
        </div>
      </div>

      <button className="reset" onClick={reset}>Reset</button>
    </div>
  );
};

export default TicTacToe;
