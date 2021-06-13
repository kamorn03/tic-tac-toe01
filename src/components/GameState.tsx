import { useState } from "react";

export type Value = "X" | "O" | null;

export type BoardState = Value[];
const CreateBoardState = () => Array<Value>(9).fill(null);

function calculateWinner(boardState: BoardState) {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < winningCombinations.length; i++) {
    const [a, b, c] = winningCombinations[i];
    if (
      boardState[a] &&
      boardState[a] === boardState[b] &&
      boardState[a] === boardState[c]
    ) {
      return boardState[a];
    }
    return null;
  }
}

export type GameState = {
  history: BoardState[];
  step: number;
};

export function useGameState() {
  const [gameState, setGameState] = useState<GameState>({
    history: [CreateBoardState()],
    step: 0,
  });

  const current = gameState.history[gameState.step];
  const xIsNext = gameState.step % 2 === 0;
  const winner = calculateWinner(current);

  function handleClick(Square: number) {
    const history = gameState.history.slice(0, gameState.step + 1);
    const boardState = history[history.length - 1];
    if (calculateWinner(boardState) || boardState[Square]) {
      return;
    }
    const NewBoardState = boardState.slice();
    NewBoardState[Square] = gameState.step % 2 === 0 ? "X" : "O";
    history.push(NewBoardState);
    setGameState({
      history: history,
      step: history.length - 1,
    });
  }

  function jumpTo(step: number) {
    setGameState({
      history: gameState.history,
      step,
    });
  }

  return {
    gameState,
    current,
    xIsNext,
    winner,
    handleClick,
    jumpTo
  };
}
