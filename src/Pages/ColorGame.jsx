import React, { useState, useEffect } from "react";

// Icons
import AlertCircle from "../components/Icons/AlertCircle";
import Award from "../components/Icons/Award";
import Refresh from "../components/Icons/Refresh";

const ColorGame = () => {
  const [colors, setColors] = useState([
    "#FF0000",
    "#00FF00",
    "#0000FF",
    "#FFFF00",
    "#FF00FF",
    "#00FFFF",
    "#FFA500",
    "#800080",
    "#008000",
    "#FF69B4",
    "#4B0082",
    "#FF4500",
  ]);
  const [targetColor, setTargetColor] = useState("");
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [gameStatus, setGameStatus] = useState("");
  const [showStatus, setShowStatus] = useState(false);

  const startNewGame = () => {
    const shuffled = [...colors].sort(() => Math.random() - 0.5);
    const newTarget = shuffled[0];
    const gameOptions = shuffled.slice(0, 6);

    if (!gameOptions.includes(newTarget)) {
      gameOptions[Math.floor(Math.random() * 6)] = newTarget;
    }

    setTargetColor(newTarget);
    setOptions(gameOptions);
    setGameStatus("");
    setShowStatus(false);
  };

  const handleGuess = (color) => {
    setShowStatus(true);
    if (color === targetColor) {
      setScore((prev) => prev + 1);
      setGameStatus("Correct! Well done! 🎉");
    } else {
      setGameStatus("Wrong guess! Try again! 😢");
    }

    setTimeout(() => {
      startNewGame();
    }, 1500);
  };

  useEffect(() => {
    startNewGame();
  }, []);
  return (
    <div className="container">
      <div className="">
        <h3 className="text-xl mb-0 text-center">Color Guessing Game</h3>

        <div
          data-testid="gameInstructions"
          className="text-normal mt-1 text-center"
        >
          Can you guess which color matches the box below?
        </div>

        <div className="flex items-center justify-center">
          <h6 data-testid="score" className="text-xl mt-1 font-normal ">
            <Award
              style={{
                width: "2rem",
                height: "2rem",
                top: "0.3rem",
                left: "0",
              }}
              className="position-relative"
            />
            Score: {score}
          </h6>
        </div>
      </div>

      <div
        data-testid="colorBox"
        className="target-box"
        style={{ backgroundColor: targetColor }}
      />

      <div className="grid">
        {options.map((color, index) => (
          <button
            key={index}
            data-testid="colorOption"
            className="color-box"
            style={{ backgroundColor: color }}
            onClick={() => handleGuess(color)}
          />
        ))}
      </div>

      {showStatus && (
        <div
          data-testid="gameStatus"
          className={`
            toast-container
            ${showStatus ? "show" : "hide"}
          `}
        >
          <AlertCircle /> {gameStatus}
        </div>
      )}

      <button
        data-testid="newGameButton"
        onClick={startNewGame}
        className="btn"
      >
        <span style={{ position: "relative", bottom: "0.2rem" }}>
          {" "}
          New Game{" "}
        </span>{" "}
        <Refresh
          style={{
            width: "1rem",
            height: "1rem",
          }}
        />
      </button>
    </div>
  );
};

export default ColorGame;
