import "./App.css";
import { useState } from "react";
import { Trophy, Coins, Gamepad2 } from "lucide-react";

export default function App() {

  const [coins, setCoins] = useState(0);
  const [level, setLevel] = useState(1);

  const playGame = () => {
    const newCoins = coins + 10;
    setCoins(newCoins);

    if (newCoins >= level * 100) {
      setLevel(level + 1);
    }
  };

  return (
    <div className="app">

      <div className="top-card">
        <h1>🎮 GameCash</h1>
        <p>Play • Earn • Level Up</p>
      </div>

      <div className="stats">

        <div className="card">
          <Coins size={40} />
          <h2>{coins}</h2>
          <p>Coins</p>
        </div>

        <div className="card">
          <Trophy size={40} />
          <h2>{level}</h2>
          <p>Level</p>
        </div>

      </div>

      <button className="play-btn" onClick={playGame}>
        <Gamepad2 />
        PLAY & EARN
      </button>

      <div className="mission-box">
        <h3>🔥 Daily Mission</h3>
        <p>Reach 100 coins to level up.</p>
      </div>

    </div>
  );
}
