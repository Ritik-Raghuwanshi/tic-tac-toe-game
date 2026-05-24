import { useState, useEffect } from "react";
import {
  RotateCcw,
  Trophy,
  Sparkles,
  Circle,
  X,
} from "lucide-react";

export default function Board() {
  const size = 3;

  const emptyBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];

  const [board, setBoard] = useState(emptyBoard);
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [winner, setWinner] = useState(null);
  const [draw, setDraw] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const handleClick = (row, col) => {
    if (board[row][col] || winner || draw) return;

    const newBoard = board.map((r) => [...r]);
    newBoard[row][col] = currentPlayer;

    setBoard(newBoard);
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  };

  const resetBoard = () => {
    setBoard(emptyBoard);
    setCurrentPlayer("X");
    setWinner(null);
    setDraw(false);
    setShowPopup(false);
  };

  const checkWinner = (updatedBoard) => {
    // rows
    for (let i = 0; i < size; i++) {
      if (
        updatedBoard[i][0] &&
        updatedBoard[i][0] === updatedBoard[i][1] &&
        updatedBoard[i][1] === updatedBoard[i][2]
      ) {
        return updatedBoard[i][0];
      }
    }

    // cols
    for (let j = 0; j < size; j++) {
      if (
        updatedBoard[0][j] &&
        updatedBoard[0][j] === updatedBoard[1][j] &&
        updatedBoard[1][j] === updatedBoard[2][j]
      ) {
        return updatedBoard[0][j];
      }
    }

    // diagonals
    if (
      updatedBoard[0][0] &&
      updatedBoard[0][0] === updatedBoard[1][1] &&
      updatedBoard[1][1] === updatedBoard[2][2]
    ) {
      return updatedBoard[0][0];
    }

    if (
      updatedBoard[0][2] &&
      updatedBoard[0][2] === updatedBoard[1][1] &&
      updatedBoard[1][1] === updatedBoard[2][0]
    ) {
      return updatedBoard[0][2];
    }

    return null;
  };

  useEffect(() => {
    const gameWinner = checkWinner(board);

    if (gameWinner) {
      setWinner(gameWinner);

      setTimeout(() => {
        setShowPopup(true);
      }, 300);

      return;
    }

    const isBoardFull = board.every((row) =>
      row.every((cell) => cell !== null)
    );

    if (isBoardFull) {
      setDraw(true);

      setTimeout(() => {
        setShowPopup(true);
      }, 300);
    }
  }, [board]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-black flex items-center justify-center p-5">

      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-[-100px] left-[-100px] w-96 h-96 bg-cyan-500/30 rounded-full blur-3xl animate-pulse"></div>

        <div className="absolute bottom-[-120px] right-[-100px] w-96 h-96 bg-pink-500/30 rounded-full blur-3xl animate-pulse"></div>

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:30px_30px]"></div>
      </div>

      {/* Main Card */}
      <div className="relative z-10 w-full max-w-md">

        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-6xl font-extrabold text-white tracking-widest drop-shadow-lg">
            TIC TAC TOE
          </h1>

          <p className="text-slate-300 mt-4 text-lg font-medium">
            {winner
              ? `🎉 Player ${winner} Wins`
              : draw
              ? "🤝 Match Draw"
              : `Turn : ${currentPlayer}`}
          </p>
        </div>

        {/* Player Cards */}
        <div className="flex justify-between mb-6 gap-4">

          <div
            className={`flex-1 p-4 rounded-2xl border backdrop-blur-xl transition-all duration-300 ${
              currentPlayer === "X"
                ? "bg-cyan-500/20 border-cyan-400 shadow-cyan-500/30 shadow-lg scale-105"
                : "bg-white/5 border-white/10"
            }`}
          >
            <div className="flex items-center gap-2 justify-center">
              <X className="text-cyan-400" />
              <span className="text-white font-bold">Player X</span>
            </div>
          </div>

          <div
            className={`flex-1 p-4 rounded-2xl border backdrop-blur-xl transition-all duration-300 ${
              currentPlayer === "O"
                ? "bg-pink-500/20 border-pink-400 shadow-pink-500/30 shadow-lg scale-105"
                : "bg-white/5 border-white/10"
            }`}
          >
            <div className="flex items-center gap-2 justify-center">
              <Circle className="text-pink-400" />
              <span className="text-white font-bold">Player O</span>
            </div>
          </div>
        </div>

        {/* Game Board */}
        <div className="grid grid-cols-3 gap-4 p-5 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl shadow-2xl">

          {board.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <button
                key={`${rowIndex}-${colIndex}`}
                onClick={() => handleClick(rowIndex, colIndex)}
                className={`group relative h-28 w-full rounded-2xl 
                border border-white/10
                bg-white/10 backdrop-blur-md
                hover:scale-105 hover:bg-white/20
                active:scale-95
                transition-all duration-300
                flex items-center justify-center
                overflow-hidden`}
              >

                {/* Glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300 bg-gradient-to-br from-cyan-500/20 to-pink-500/20"></div>

                {/* Symbol */}
                <span
                  className={`relative z-10 text-6xl font-extrabold drop-shadow-lg animate-[pop_0.3s_ease] ${
                    cell === "X"
                      ? "text-cyan-400"
                      : "text-pink-400"
                  }`}
                >
                  {cell}
                </span>
              </button>
            ))
          )}
        </div>

        {/* Restart Button */}
        <button
          onClick={resetBoard}
          className="mt-8 w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-lg shadow-2xl hover:scale-[1.02] active:scale-95 transition-all duration-300 flex items-center justify-center gap-3"
        >
          <RotateCcw />
          Restart Match
        </button>
      </div>

      {/* Popup */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm animate-fadeIn">

          <div className="relative w-[90%] max-w-sm rounded-3xl border border-white/10 bg-white/10 backdrop-blur-2xl p-8 shadow-2xl text-center overflow-hidden">

            {/* Popup Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-pink-500/10"></div>

            <div className="relative z-10">

              {/* Icon */}
              <div className="flex justify-center mb-5">
                {winner ? (
                  <div className="w-24 h-24 rounded-full bg-yellow-400/20 flex items-center justify-center animate-bounce">
                    <Trophy className="text-yellow-300" size={45} />
                  </div>
                ) : (
                  <div className="w-24 h-24 rounded-full bg-white/10 flex items-center justify-center animate-pulse">
                    <Sparkles className="text-cyan-300" size={45} />
                  </div>
                )}
              </div>

              {/* Text */}
              <h2 className="text-4xl font-extrabold text-white mb-3">
                {winner ? `${winner} Wins!` : "Match Draw"}
              </h2>

              <p className="text-slate-300 mb-8">
                {winner
                  ? "Amazing move! Ready for another battle?"
                  : "Both players played really well!"}
              </p>

              {/* Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={resetBoard}
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold hover:scale-105 transition"
                >
                  Play Again
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}