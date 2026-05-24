import "./App.css";
import { Trophy, Coins, Gamepad2 } from "lucide-react";

export default function App() {
  return (
    <div className="app">

      <div className="top-card">
        <h1>🎮 GameCash</h1>
        <p>Play • Earn • Level Up</p>
      </div>

      <div className="stats">

        <div className="card">
          <Coins size={40} />
          <h2>250</h2>
          <p>Coins</p>
        </div>

        <div className="card">
          <Trophy size={40} />
          <h2>12</h2>
          <p>Level</p>
        </div>

      </div>

      <button className="play-btn">
        <Gamepad2 />
        PLAY NOW
      </button>

    </div>
  );
}
