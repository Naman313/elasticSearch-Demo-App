import React, {useState, useEffect} from "react";
import axios from 'axios';
const App = () => {

  const [flashcards, setFlashcards]= useState([]);
  const [input, setInput]= useState('');

  useEffect(()=>{
    axios.get('http://localhost:3001/flashcards').then(response=> setFlashcards(response.data)).catch(error=> console.error('Error fetching', error));
  },[]);

  const addFlashcard=()=>{
    if(input.trim()=== '') return ;
    axios.post('http://localhost:3001/flashcards', {text:input}).then(()=>{
      setFlashcards([...flashcards, {text: input}]);
      setInput('');
    }).catch(error=> console.error('Error saving data', error));
  }
  return (
    <>
    <h1>Flashcard App</h1>

    <input type= 'text' value={input} onChange={(e)=> setInput(e.target.value)  } 
    placeholder= "Enter text"></input>

    <button onClick={addFlashcard}>Save</button>
    <ul>
      {
        flashcards.map((card, index)=>(
          <li key={index}>{card.text}</li>
        ))
      }
    </ul>
    </>
  );
};

export default App;
