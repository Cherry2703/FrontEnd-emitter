import React, { useState, useEffect } from 'react';

import {v4 as uuidv4} from "uuid"

import LeaderBoard from "./pages/LeaderBoard"


import './App.css';

//card types

const CardTypes = {
  CAT: '😼',
  DEFUSE: '🙅‍♂️',
  SHUFFLE: '🔀',
  EXPLODING_KITTEN: '💣',
};

let data=[
  {
    userId:uuidv4(),
    userName:"Ram charan Teja",
    userScore:23
  },
  {
    userId:uuidv4(),
    userName:"Nikhil",
    userScore:22
  },
  {
    userId:uuidv4(),
    userName:"Mahesh",
    userScore:24
  },
  {
    userId:uuidv4(),
    userName:"Anil",
    userScore:28
  }
]

const App = () => {
  const [deck, setDeck] = useState([]);
  const [username,setUserName]=useState("")
  const [drawnCards, setDrawnCards] = useState([]);
  const [gameResult, setGameResult] = useState(null);
  const [defuseCount, setDefuseCount] = useState(0);
  const [drawCardText,setDrawCardText]=useState("")
  const [start,setStart]=useState(true)
  const [leaderBoardShow,setLeaderBoardShow]=useState(false)
  const [leaderBoardData,setLeaderBoardData]=useState([])
  const [score,setScore]=useState(0)


//shuffling the desk function

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  


//creating a random desk
  const createDeck = () => {
    const deck = [];
    for (let i = 0; i < 4; i++) {
      let num= Math.floor(Math.random()*4)
      if(num===0){
        deck.push(CardTypes.CAT);
      }else if(num===1){
        deck.push(CardTypes.DEFUSE)
      }
      else if(num===2){
        deck.push(CardTypes.SHUFFLE)
      }
      else if(num===3){
        deck.push(CardTypes.EXPLODING_KITTEN)
      }
    }
    deck.push(CardTypes.EXPLODING_KITTEN);
    return shuffleArray(deck);
  };

  useEffect(() => {
    const newDeck = createDeck();
    setDeck(newDeck);
  },[]);



  //draw card button function
  const drawCard = () => {
    if (deck.length === 1) {
      setGameResult('win');
      return;
    }
    const drawnCard = deck.pop();
    setDrawnCards([...drawnCards, drawnCard]);
    switch (drawnCard) {
      case CardTypes.CAT:
        setDrawCardText(`you have drawn ${CardTypes.CAT} CAT card.`)
        break;
      case CardTypes.DEFUSE:
        setDrawCardText(`you have drawn ${CardTypes.DEFUSE} DEFUSE card.`)
        setDefuseCount(defuseCount + 1);
        break;
      case CardTypes.SHUFFLE:
        setDrawCardText(`you have drawn ${CardTypes.SHUFFLE} SHUFFLE card. so the game restarts again by shuffling cards.`)
        setDeck(createDeck());
        setDrawnCards([]);
        break;
      case CardTypes.EXPLODING_KITTEN:
        if (defuseCount > 0) {
          setDefuseCount(defuseCount - 1);
        } else {
          setGameResult('lose');
        }
        break;
      default:
        break;
    }
  };


  //start game button function
  const startGame=()=>{
    if(username===""){
      setStart(true)
    }else{
      setStart(false)
    }
  }

  //onclick leaderboard button function
  const onClickLeaderBoard=async ()=>{

    localStorage.setItem("playersData",data)

    let newPlayer={
      userId:uuidv4(),
      userName:username,
      userScore:score+1
    }

    localStorage.getItem("playersData")

    setLeaderBoardShow(true)
    setLeaderBoardData([...data,newPlayer])
    setScore(score+1)


  }



//restart button function
  const onClickRestart=()=>{
    setDeck(createDeck([]))
    setDrawnCards([])
    setGameResult(null)
    setDefuseCount(0)
    setDrawCardText("")
  }



  const onClickRestartLeaderBoard=()=>{
    setDeck(createDeck([]))
    setDrawnCards([])
    setGameResult(null)
    setDefuseCount(0)
    setLeaderBoardShow(false)
    setDrawCardText("")
  }


  return (
    <div className="main-cont">
      <h1>Exploding Kitten Game</h1>
      <div>
        <h3>Rules :</h3>
        <p>If the card drawn from the deck is a cat card, then the card is removed from the deck.</p>
        <p> If the card is exploding kitten (bomb) then the player loses the game.</p>
        <p>If the card is a defusing card, then the card is removed from the deck.</p>
        <p>This card can be used to defuse one bomb that may come in subsequent cards drawn from the deck.</p>
      <p>If the card is a shuffle card, then the game is restarted and the deck is filled with 5 cards again.</p>
      </div>
      {start ? (
      <div>
        <input type='text' className='username-input' placeholder='Enter Your Name' onChange={(event)=>setUserName(event.target.value)}/>
        <button type="button" onClick={startGame} className='start-game-btn'>Start Game</button>
        </div>):(
      <div className='game-container'>
        {gameResult === 'win' && <div>
           <p>You won the game! {username} check out your score in leaderboard</p>
      <button type="button" onClick={onClickLeaderBoard} className='card-btn'>Leader Board</button>
        </div>
}
        {gameResult === 'lose' && <div>
          <p>You lost the game!</p>
         <p>You have drawn a {CardTypes.EXPLODING_KITTEN} EXPLODE Card</p> 
         <button type='button' className='card-btn' onClick={onClickRestart}>Restart</button>
         </div>}
        {gameResult === null && (
          <>
            <button onClick={drawCard} className='card-btn'>Draw Card</button>
            <p>Deck: {deck.length}</p>
            <p>Drawn Cards: {drawnCards.length}</p>
            <p>Defuses Left: {defuseCount}</p>
            <h2>{drawCardText}</h2>
          </>
        )}
        {leaderBoardShow && <div>
          <LeaderBoard leaderBoardData={leaderBoardData}/>
            <button type='button' className='card-btn' onClick={onClickRestartLeaderBoard}>Restart</button>
            </div>}
      </div>
      )}  
    </div>
  );
};

export default App;