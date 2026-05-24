import "./App.css";
import { useState, useEffect } from "react";
import { Trophy, Coins, Gamepad2, Gift } from "lucide-react";
import { Preferences } from "@capacitor/preferences";

export default function App() {
  const [coins, setCoins] = useState(0);
  const [level, setLevel] = useState(1);
  const [win, setWin] = useState("");
  const [leaderboard, setLeaderboard] = useState([]);

  // LOAD DATA
  const loadData = async () => {
    const { value: savedCoins } = await Preferences.get({ key: "coins" });
    const { value: savedLevel } = await Preferences.get({ key: "level" });

    if (savedCoins) setCoins(parseInt(savedCoins));
    if (savedLevel) setLevel(parseInt(savedLevel));

    const { value } = await Preferences.get({ key: "leaderboard" });
    if (value) setLeaderboard(JSON.parse(value));
  };

  // SAVE DATA
  const saveData = async (newCoins, newLevel) => {
    await Preferences.set({
      key: "coins",
      value: newCoins.toString(),
    });

    await Preferences.set({
      key: "level",
      value: newLevel.toString(),
    });
  };

  // SAVE SCORE
  const saveScore = async (finalCoins) => {
    const { value } = await Preferences.get({ key: "leaderboard" });

    let scores = value ? JSON.parse(value) : [];

    scores.push({
      score: finalCoins,
      date: Date.now(),
    });

    scores.sort((a, b) => b.score - a.score);
    scores = scores.slice(0, 5);

    await Preferences.set({
      key: "leaderboard",
      value: JSON.stringify(scores),
    });

    setLeaderboard(scores);
  };

  // DAILY REWARD
  const claimDailyReward = async () => {
    const { value } = await Preferences.get({ key: "lastClaim" });

    const now = Date.now();

    if (value && now - parseInt(value) < 86400000) {
      setWin("⏳ Reviens demain !");
      return;
    }

    const reward = Math.floor(Math.random() * 100) + 20;
    const newCoins = coins + reward;

    setCoins(newCoins);
    setWin(`🎁 Daily +${reward} coins!`);

    await Preferences.set({
      key: "lastClaim",
      value: now.toString(),
    });

    saveData(newCoins, level);
    saveScore(newCoins);

    setTimeout(() => setWin(""), 2000);
  };

  useEffect(() => {
    loadData();
  }, []);

  // PLAY GAME
  const playGame = () => {
    const newCoins = coins + 10;
    let newLevel = level;

    if (newCoins >= level * 100) {
      newLevel = level + 1;
      setLevel(newLevel);
    }

    setCoins(newCoins);

    saveData(newCoins, newLevel);
    saveScore(newCoins);
  };

  // SPIN REWARD
  const spinReward = () => {
    const rewards = [20, 50, 100, 200];
    const randomReward =
      rewards[Math.floor(Math.random() * rewards.length)];

    const newCoins = coins + randomReward;

    setCoins(newCoins);
    setWin(`🎉 +${randomReward} COINS!`);

    saveData(newCoins, level);
    saveScore(newCoins);

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

      <button className="daily-btn" onClick={claimDailyReward}>
        🎁 Daily Reward
      </button>

      <div className="leaderboard">
        <h3>🏆 Leaderboard</h3>

        {leaderboard.map((item, index) => (
          <div key={index} className="lb-item">
            #{index + 1} — {item.score} coins
          </div>
        ))}
      </div>

      {win && <div className="win-popup">{win}</div>}

    </div>
  );
}
