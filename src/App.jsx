import "./App.css";
import { useState } from "react";
import { Trophy, Coins, Gift, Gamepad2 } from "lucide-react";

export default function App() {

  const [coins, setCoins] = useState(760);
  const [level, setLevel] = useState(8);
  const [reward, setReward] = useState("");
  const [win, setWin] = useState("");

 const playGame = () => {
  const newCoins = coins + 10;
  setCoins(newCoins);

  // 📳 vibration
  if (navigator.vibrate) {
    navigator.vibrate(100);
  }

  if (newCoins >= level * 100) {
    setLevel(level + 1);

    if (navigator.vibrate) {
      navigator.vibrate([100, 50, 100]);
    }
  }
};

const spinReward = () => {
  const rewards = [20, 50, 100, 200];
  const randomReward =
    rewards[Math.floor(Math.random() * rewards.length)];

  setCoins(coins + randomReward);

  setWin(`🎉 +${randomReward} COINS!`);

  if (navigator.vibrate) {
    navigator.vibrate(200);
  }

  setTimeout(() => setWin(""), 1500);
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

      <button className="reward-btn" onClick={spinReward}>
        <Gift />
        SPIN REWARD
      </button>

      {reward && (
        <div className="reward-box">
          {reward}
        </div>
      )}

      <div className="mission-box">
        <h3>🔥 Daily Mission</h3>
        <p>Reach higher levels and collect coins.</p>
      </div>

    </div>
  );
{win && (
  <div className="win-popup">
    {win}
  </div>
)}
}
