import './App.css';
import { useEffect, useState } from 'react'
import SingleCard from './components/SingleCard';

const cardImages = [
  { "src": "/img/helmet-1.png", matched: false},
  { "src": "/img/potion-1.png", matched: false},
  { "src": "/img/ring-1.png", matched: false},
  { "src": "/img/scroll-1.png", matched: false},
  { "src": "/img/shield-1.png", matched: false},
  { "src": "/img/sword-1.png", matched: false}
]

function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)

  // shuffle the cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() -0.5)
      .map((card) => ({ ...card, id: Math.random()}))

    setCards(shuffledCards)
    setTurns(0)
  }

  // handle a choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  // Compare 2 selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true)
      if (choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src) {
              return{...card, matched: true}
            }else{
              return card
            }
          })
        })
        console.log('match')
        resetTurn()
      }else{
        console.log('no match')
        setTimeout(() => resetTurn(), 1000)
      }
    }
  }, [choiceOne, choiceTwo])

  console.log(cards)

  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }

  return (
    <div className="App">
      <h1>Mémo duo</h1>
      <button onClick={shuffleCards}>Nouvelle partie</button>
      <div className="card-grid">
        {cards.map(card => (
          <SingleCard
          key={card.id}
          card={card}
          handleChoice={handleChoice}
          flipped={card===choiceOne || card===choiceTwo || card.matched}
          disabled={disabled}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
