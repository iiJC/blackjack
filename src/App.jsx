// App.jsx
import React, { useState } from 'react';
import './App.css';
import Card from './Card';

const cardData = [
  { value: 1, img: './cards/ace_of_spades.svg'},
  { value: 2, img: './cards/2_of_spades.svg'},
  { value: 3, img: './cards/3_of_spades.svg'},
  { value: 4, img: './cards/4_of_spades.svg'},
  { value: 5, img: './cards/5_of_spades.svg'},
  { value: 6, img: './cards/6_of_spades.svg'},
  { value: 7, img: './cards/7_of_spades.svg'},
  { value: 8, img: './cards/8_of_spades.svg'},
  { value: 9, img: './cards/9_of_spades.svg'},
  { value: 10, img: './cards/10_of_spades.svg'},
  { value: 10, img: './cards/jack_of_spades2.svg'},
  { value: 10, img: './cards/queen_of_spades2.svg'},
  { value: 10, img: './cards/king_of_spades2.svg'},
  { value: 1, img: './cards/ace_of_clubs.svg'},
  { value: 2, img: './cards/2_of_clubs.svg'},
  { value: 3, img: './cards/3_of_clubs.svg'},
  { value: 4, img: './cards/4_of_clubs.svg'},
  { value: 5, img: './cards/5_of_clubs.svg'},
  { value: 6, img: './cards/6_of_clubs.svg'},
  { value: 7, img: './cards/7_of_clubs.svg'},
  { value: 8, img: './cards/8_of_clubs.svg'},
  { value: 9, img: './cards/9_of_clubs.svg'},
  { value: 10, img: './cards/10_of_clubs.svg'},
  { value: 10, img: './cards/jack_of_clubs2.svg'},
  { value: 10, img: './cards/queen_of_clubs2.svg'},
  { value: 10, img: './cards/king_of_clubs2.svg'},
  { value: 1, img: './cards/ace_of_hearts.svg'},
  { value: 2, img: './cards/2_of_hearts.svg'},
  { value: 3, img: './cards/3_of_hearts.svg'},
  { value: 4, img: './cards/4_of_hearts.svg'},
  { value: 5, img: './cards/5_of_hearts.svg'},
  { value: 6, img: './cards/6_of_hearts.svg'},
  { value: 7, img: './cards/7_of_hearts.svg'},
  { value: 8, img: './cards/8_of_hearts.svg'},
  { value: 9, img: './cards/9_of_hearts.svg'},
  { value: 10, img: './cards/10_of_hearts.svg'},
  { value: 10, img: './cards/jack_of_hearts2.svg'},
  { value: 10, img: './cards/queen_of_hearts2.svg'},
  { value: 10, img: './cards/king_of_hearts2.svg'},
  { value: 1, img: './cards/ace_of_diamonds.svg'},
  { value: 2, img: './cards/2_of_diamonds.svg'},
  { value: 3, img: './cards/3_of_diamonds.svg'},
  { value: 4, img: './cards/4_of_diamonds.svg'},
  { value: 5, img: './cards/5_of_diamonds.svg'},
  { value: 6, img: './cards/6_of_diamonds.svg'},
  { value: 7, img: './cards/7_of_diamonds.svg'},
  { value: 8, img: './cards/8_of_diamonds.svg'},
  { value: 9, img: './cards/9_of_diamonds.svg'},
  { value: 10, img: './cards/10_of_diamonds.svg'},
  { value: 10, img: './cards/jack_of_diamonds2.svg'},
  { value: 10, img: './cards/queen_of_diamonds2.svg'},
  { value: 10, img: './cards/king_of_diamonds2.svg'},
];

function App() {
  const [playerScore, setPlayerScore] = useState(0);
  const [dealerScore, setDealerScore] = useState(0);
  const [playerHand, setPlayerHand] = useState([]);
  const [dealerHand, setDealerHand] = useState([]);
  const [deck, setDeck] = useState([...Array(cardData.length).keys()]); // Deck of card indexes
  const [gameOver, setGameOver] = useState(false);
  const [bet, setBet] = useState(0);
  const [playerMoney, setPlayerMoney] = useState(100);
  const [showAceChoice, setShowAceChoice] = useState(false);
  const [currentAceIndex, setCurrentAceIndex] = useState(null);

  function drawCard(setHand, setScore, currentScore, isPlayer = true) {
    if (deck.length === 0) return;
    const randomIndex = Math.floor(Math.random() * deck.length);
    const cardIndex = deck[randomIndex];
    const newDeck = deck.filter((_, i) => i !== randomIndex);
    setDeck(newDeck);

    if (cardData[cardIndex].value === 1 && isPlayer) {
      setCurrentAceIndex(cardIndex);
      setShowAceChoice(true);
      return;
    }

    setHand((prevHand) => [...prevHand, cardIndex]);
    setScore(currentScore + cardData[cardIndex].value);
  }

  function chooseAceValue(value) {
    setPlayerHand((prevHand) => [...prevHand, currentAceIndex]);
    setPlayerScore((prevScore) => prevScore + value);
    setShowAceChoice(false);
    setCurrentAceIndex(null);
  }

  function startGame() {
    resetGame();
    drawCard(setPlayerHand, setPlayerScore, 0);
    drawCard(setDealerHand, setDealerScore, 0, false);
    drawCard(setPlayerHand, setPlayerScore, 0);
    drawCard(setDealerHand, setDealerScore, 0, false);
  }

  function playerDrawCard() {
    drawCard(setPlayerHand, setPlayerScore, playerScore);
  }

  function playerStand() {
    let currentDealerScore = dealerScore;
    while (currentDealerScore < 17) {
      const randomIndex = Math.floor(Math.random() * deck.length);
      const cardIndex = deck[randomIndex];
      const newDeck = deck.filter((_, i) => i !== randomIndex);
      setDeck(newDeck);
      setDealerHand((prevHand) => [...prevHand, cardIndex]);
      currentDealerScore += cardData[cardIndex].value;
    }
    setDealerScore(currentDealerScore);
    setGameOver(true);
    resolveGame(currentDealerScore);
  }

  function resolveGame(finalDealerScore) {
    if (playerScore > 21) {
      setPlayerMoney(playerMoney - bet);
    } else if (finalDealerScore > 21 || playerScore > finalDealerScore) {
      setPlayerMoney(playerMoney + bet);
    } else {
      setPlayerMoney(playerMoney - bet);
    }
  }

  function resetGame() {
    setPlayerHand([]);
    setDealerHand([]);
    setPlayerScore(0);
    setDealerScore(0);
    setDeck([...Array(cardData.length).keys()]);
    setGameOver(false);
  }

  return (
    <div className="App">
      <h1>Blackjack</h1>

      <div className="score-board">
        <p>Player Score: {playerScore}</p>
        <div className="player-money">Player Money: ${playerMoney}</div>
        <input
          type="number"
          value={bet}
          onChange={(e) => setBet(parseInt(e.target.value))}
          placeholder="Place your bet"
          disabled={gameOver || playerHand.length > 0}
        />
      </div>

      <div className="controls">
        <button onClick={startGame} disabled={gameOver || playerHand.length > 0}>
          Start Game
        </button>
        <button onClick={resetGame}>Reset Game</button>
      </div>

      {showAceChoice && (
        <div className="controls">
          <p>Choose Ace Value:</p>
          <button onClick={() => chooseAceValue(1)}>1</button>
          <button onClick={() => chooseAceValue(11)}>11</button>
        </div>
      )}

      <div className="dealer-hand hand">
        <h2>Dealer's Hand</h2>
        {dealerHand.map((c, index) => (
          <Card key={index} card={cardData[c]} />
        ))}
      </div>

      <div className="player-hand hand">
        <h2>Player's Hand</h2>
        {playerHand.map((c, index) => (
          <Card key={index} card={cardData[c]} />
        ))}
      </div>

      <div className="button-group">
        <button onClick={playerDrawCard} disabled={gameOver || playerScore >= 21}>
          Hit
        </button>
        <button onClick={playerStand} disabled={gameOver}>
          Stand
        </button>
      </div>

      {gameOver && dealerScore >= 17 && (
        <h1>
          {playerScore > dealerScore || dealerScore > 21
            ? "Player Wins!"
            : "Dealer Wins!"}
        </h1>
      )}
    </div>
  );
}

export default App;