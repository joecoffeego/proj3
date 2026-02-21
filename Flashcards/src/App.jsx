import { useState } from 'react';
import './App.css';

const cardSet = {
  title: "Coffee Flashcards",
  description: "Learn about different coffee types and brewing methods.",
  cards: [
    {
      id: 1,
      question: "What is espresso?",
      answer: "A concentrated coffee brewed by forcing hot water through finely-ground coffee."
    },
    {
      id: 2,
      question: "What are the different coffee brewing methods?",
      answer: "Common methods include drip brewing, French press, espresso, and pour-over."
    },
    {
      id: 3,
      question: "What is a coffee blend?",
      answer: "A coffee blend is a mix of beans from different origins, roasted together to create a unique flavor profile."
    },
    {
      id: 4,
      question: "What is the difference between Arabica and Robusta coffee?",
      answer: "Arabica coffee is generally sweeter and more acidic, while Robusta coffee has a stronger, harsher taste and contains more caffeine."
    },
    {
      id: 5,
      question: "What is the ideal water temperature for brewing coffee?",
      answer: "The ideal water temperature for brewing coffee is between 195°F and 205°F (90°C to 96°C)."
    }
  ],
};

function Flashcard({ card, isFlipped, feedback, onFlip }) {
  return (
    <div className={'card ${feedback}'} onClick={onFlip}>
        <h2>Flashcard</h2>
        <p>{isFlipped ? card.answer : card.question}</p>
        <small>Click to flip</small>
    </div>
  );
}

export default function App() {
  const [cards, setCards] = useState(cardSet.cards);
  const [mastered, setMastered] = useState([]);
  const [index, setIndex] = useState(0);


  const [isFlipped, setIsFlipped] = useState(false);
  const [guess, setGuess] = useState('');
  const [feedback, setFeedback] = useState('null');

  const [currentStreak, setCurrentStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);

  const totalCards = cards.length;
  if (totalCards === 0) return <h2>All cards mastered </h2>;

  const currentCard = cards[index];

  function normalize(str) {
    return str.toLowerCase().replace(/[^\w\s]/g, "").trim();
  }

  function isCorrect(user, answer) {
    const g = normalize(user);
    const a = normalize(answer);
    return g === a || a.includes(g) || g.includes(a)  ;
  }

  const handleFlip = () => {
    setIsFlipped(prev => !prev);
  };

  function handleSubmit() {
    if (!guess.trim()) return;

    const correct = isCorrect(guess, currentCard.answer);

    if (correct) {
      setFeedback('correct');
      const newStreak = currentStreak + 1;
      setCurrentStreak(newStreak);
      if (newStreak > longestStreak) setLongestStreak(newStreak);
    } else {
      setFeedback('incorrect');
      setCurrentStreak(0);
    }

    setIsFlipped(true);
  }

  const nextRandomCard = () => {
    let newIndex = index;
    while (newIndex === index) {
      newIndex = Math.floor(Math.random() * totalCards);
    }
    setIndex(newIndex);
    setIsFlipped(false);
  };

  return (
    <div className="app">
      <div className="section-title">
        <h1>{cardSet.title}</h1>
        <p>{cardSet.description}</p>
        <p>Total Cards: {totalCards}</p>
      </div>

      <div className="section-card">
        <Flashcard
          card={cardSet.cards[index]}
          isFlipped={isFlipped}
          onFlip={handleFlip}
        />
      </div>

      <div className="section-control">
        <button onClick={nextRandomCard}>Next Random Card</button>
      </div>
    </div>
  );
}