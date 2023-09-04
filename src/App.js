import './App.css';
import React,{useEffect , useState} from "react";
import SingleCard from './components/SingleCard';
const cardImages = [
  {"src": "/img/rr.jpg", matched:false},
  {"src":"/img/mi.jpg", matched:false},
  {"src":"/img/kkr.jpg", matched:false},
  {"src":"/img/csk.jpg", matched:false},
  {"src":"/img/dc.jpg", matched:false},
  {"src":"/img/rcb.jpg", matched:false},
]

function App() {
  const [cards,setCards] = useState([])
  const [turns,setTurns] = useState(0)
  const [choiceOne,setChoicOne] = useState(null)
  const [choiceTwo,setChoiceTwo] = useState(null)
  const [disabled,setDisabled] = useState(false);
  //shuffle cards
  const shuffleCards = ()=>{
    const shuffledCards = [...cardImages,...cardImages]
    .sort(()=>Math.random()-0.5)
    .map((card)=>({...card,id:Math.random()}))

    setChoicOne(null)
    setChoiceTwo(null)
    setCards(shuffledCards);
    setTurns(0)
  }
  //handle a choice
  const handleChoice = (card)=>{
    choiceOne ? setChoiceTwo(card):setChoicOne(card)
  }
  //compare 2 selected cards
  useEffect(()=>{
    if(choiceOne && choiceTwo){
      setDisabled(true)
      if(choiceOne.src===choiceTwo.src){
        setCards(prevCards =>{
          return prevCards.map(card=>{
            if(card.src===choiceOne.src){
              return {...card,matched:true}
            }else{
              return card
            }
          })
        })
        resetTurn()
      }else{
       setTimeout(()=> resetTurn(),1000)
      }
    }
  },[choiceOne,choiceTwo])
  console.log(cards)
  //reset choices & increase turn
  const resetTurn = ()=>{
    setChoicOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }
  //start a new game automatically
  useEffect(()=>{
    shuffleCards()
  },[])
  return (
    <div className = "App">
      <h1>Memory Game</h1>
      <button onClick={shuffleCards}>New Game</button>
        <p>Turns:{turns}</p>
      <div className='card-grid'>
        {cards.map(card=>(
          <SingleCard handleChoice={handleChoice} key={card.id} card={card} flipped={card===choiceOne||card===choiceTwo||card.matched}
           disabled={disabled}/>
        ))}
      </div>
    </div>
  );
}

export default App;
