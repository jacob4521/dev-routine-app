import React, { useEffect, useState } from "react";

const PomodoroTimer = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;
    let lastTick = Date.now();

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        const now = Date.now();
        const delta = Math.floor((now - lastTick) / 1000);

        if (delta > 0) {
          setTimeLeft((prev) => {
            const nextTime = prev - delta;
            return nextTime > 0 ? nextTime : 0;
          });
          lastTick += delta * 1000;
        }
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      setTimeout(() => {
        setIsRunning(false);
        alert("Pomodoro session is over! Take a break. ☕");
      }, 0);
    }

    return () => clearInterval(interval); 
  }, [isRunning, timeLeft]);

  const minutes = Math.floor(timeLeft / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (timeLeft % 60).toString().padStart(2, "0");

  const handleStartPause = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(25 * 60);
  };

  return (
    <div className="">
      <h3 className="text-xl font-bold mb-4 text-center">🍅Focus Timer</h3>

      <div className="p-20 shadow mb-2">
        <div className="text-5xl font-bold text-center">
          {minutes}:{seconds}
        </div>

        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={() => handleStartPause()}
            className="bg-blue-500 px-4 py-2 rounded-2xl text-white"
          >
            {isRunning ? "Pause" : "Start"}
          </button>
          <button
            onClick={() => handleReset()}
            className="bg-gray-500 px-4 py-2 rounded-2xl text-white"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default PomodoroTimer;
