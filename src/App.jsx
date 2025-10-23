/* Make win loss counter
*/ 
import React, { useState, useRef, useEffect } from 'react';
import './App.css';

function App() {
  //Delcaring properties
  const [wordle, setWordle] = useState("");
  const [guess, setGuess] = useState("");
  const [mainArr, setMainArr] = useState(() => Array(6).fill().map(() => Array(5).fill("")));
  const [guessCount, setGuessCount] = useState(0);
  const [lastSpot, setLastSpot] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [winCount, setWinCount] = useState(0);
  const [lossCount, setLossCount] = useState(0);

  //Starting Game
  const gameStart = () => {
    console.log("Game Started");
    setPlaying(true);
    setGuessCount(0);
    // reset colors for all letter boxes and keyboard keys
    let table = document.getElementsByClassName("let-box");
    for (let i = 0; i < table.length; i++) {
      table[i].style.backgroundColor = "";
      table[i].style.border = "";
    }
    setMainArr(Array(6).fill().map(() => Array(5).fill("")));
    setGuess("");
    
    const keys = 'qwertyuiopasdfghjklzxcvbnm'.split('');
    keys.forEach(k => {
      const el = document.getElementById(k);
      if (el) {
        el.style.backgroundColor = '';
        el.style.border = '';
      }
    });
    
    //Fetch a random 5 letter word from the API
    fetch('https://random-word-api.herokuapp.com/word?length=5&number=1')
      .then(response => response.json())
      .then(data => {
        setWordle(data[0].toUpperCase());
      })
      .catch(error => console.error('Error fetching word:', error));
    
  }

  useEffect(() => {
    setWordle(wordle);
  }, [wordle]);
  
    // Global key handler (Enter + Backspace)
    useEffect(() => {
      const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
          console.log('Enter key pressed (global)');
          const row = mainArr[guessCount];
          if (row && !row.includes('')) {
            setGuess(row.join('').toUpperCase());
          }
        } else if (e.key === 'Backspace') {
          console.log('Backspace key pressed (global)');
          for (let i = 4; i >= 0; i--) {
            if(mainArr[guessCount][i] !== "") {
              setLastSpot(i);
              break;
            }
          }
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }, [mainArr, guessCount]);

  useEffect(() => {
    console.log("guess is", guess);
    checkGuess();
  }, [guess]);

  useEffect(() => {
    focusNextInput(lastSpot, true);
  }, [lastSpot]);

  const checkGuess = () => {
    let guessArr = [...guess];
    let wordleArr = [...wordle];
    if(guess === wordle) {
      console.log("You Win!");
      setWinCount(winCount + 1);
      setPlaying(false);
      setGuessCount(999);
      for(let correctChar of guess) {
        let correct = document.getElementById(correctChar.toLowerCase());
        correct.style.backgroundColor = "#9effa9"
        correct.style.border = "2px solid #9effa9"
      }
    } else {
      if(guessCount < 5) {
        console.log(guessArr);
        console.log(wordleArr);       
        for(let char = 0; char < guessArr.length; char++) {
          let letterBox = document.getElementById(`${guessCount}-${char}`); 
          if(wordleArr.includes(guessArr[char]) && guessArr[char] === wordleArr[char]) {
            console.log(guessArr[char] + " is in the word and right place");
            let correct = document.getElementById(guessArr[char].toLowerCase());
            correct.style.backgroundColor = "#9effa9"
            correct.style.border = "2px solid #9effa9"
            letterBox.style.backgroundColor = "#9effa9"
            letterBox.style.border = "2px solid black"
          } else if(wordleArr.includes(guessArr[char])) {
            console.log(guessArr[char] + " is in the word but wrong place");
            let close = document.getElementById(guessArr[char].toLowerCase());
            close.style.backgroundColor = "yellow"
            close.style.border = "2px solid yellow"
            letterBox.style.backgroundColor = "yellow"
            letterBox.style.border = "2px solid black"
          } else {
            console.log(guessArr[char] + " is not in the word");
            let wrong = document.getElementById(guessArr[char].toLowerCase());
            wrong.style.backgroundColor = "red"
            wrong.style.border = "2px solid red"
            letterBox.style.backgroundColor = "red"
            letterBox.style.border = "2px solid black"
          }
          setGuessCount(guessCount + 1);
        }
      } else {
        console.log("You Lose! The word was " + wordle);
        for(let char = 0; char < guessArr.length; char++) {
          let letterBox = document.getElementById(`${guessCount}-${char}`); 
          if(wordleArr.includes(guessArr[char]) && guessArr[char] === wordleArr[char]) {
            console.log(guessArr[char] + " is in the word and right place");
            let correct = document.getElementById(guessArr[char].toLowerCase());
            correct.style.backgroundColor = "#9effa9"
            correct.style.border = "2px solid #9effa9"
            letterBox.style.backgroundColor = "#9effa9"
            letterBox.style.border = "2px solid black"
          } else if(wordleArr.includes(guessArr[char])) {
            console.log(guessArr[char] + " is in the word but wrong place");
            let close = document.getElementById(guessArr[char].toLowerCase());
            close.style.backgroundColor = "yellow"
            close.style.border = "2px solid yellow"
            letterBox.style.backgroundColor = "yellow"
            letterBox.style.border = "2px solid black"
          } else {
            console.log(guessArr[char] + " is not in the word");
            let wrong = document.getElementById(guessArr[char].toLowerCase());
            wrong.style.backgroundColor = "red"
            wrong.style.border = "2px solid red"
            letterBox.style.backgroundColor = "red"
            letterBox.style.border = "2px solid black"
          }
          setLossCount(lossCount + 1);
          setPlaying(false);
          setGuessCount(guessCount + 1);
        }
      }
    }
  }

  //Handle input changes
  const handleChange = (cellIndex, e) => {
    const temp = [...mainArr];
    const rowCopy = [...temp[guessCount]];
    rowCopy[cellIndex] = e.toUpperCase();
    temp[guessCount] = rowCopy;
    setMainArr(temp);
    console.log('updated row (pending state):', rowCopy);
  }

  const focusNextInput = (cellIndex, back) => {
    if(back) {
      if(document.activeElement.value === "") {
        document.getElementById(`input-${guessCount}-${cellIndex}`).focus();
      }
    } else {
      if(document.getElementById(`input-${guessCount}-${cellIndex}`).value === "") {
        if(cellIndex === 0) 
          return;
        document.getElementById(`input-${guessCount}-${cellIndex-1}`).focus();
      } else {
        if(cellIndex === 4) 
          return;
        document.getElementById(`input-${guessCount}-${cellIndex+1}`).focus();
      }
    }
    
  }

  return (
    <div className="App">
      <button class="start-btn" onClick={() => gameStart()}>{playing ? "Restart" : "Start"}</button>
      <p>{wordle}</p>
      <table class="let-table">
        <tbody>
          {mainArr.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                rowIndex === guessCount
                  ? <td class="let-box" id={`${rowIndex}-${cellIndex}`} key={cellIndex}><input class="input-box row{rowIndex}" id={`input-${rowIndex}-${cellIndex}`} onChange={(e) => {
                    handleChange(cellIndex, e.target.value)
                    focusNextInput(cellIndex, false)
                  }} maxLength="1" type="text" /></td>
                  : <td class="let-box" id={cellIndex} key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div class="keyboard">
        <table class="key-table">
          <tbody>
            <tr class="key-row1">
              <td class="key-box" id="q">Q</td>
              <td class="key-box" id="w">W</td>
              <td class="key-box" id="e">E</td>
              <td class="key-box" id="r">R</td>
              <td class="key-box" id="t">T</td>
              <td class="key-box" id="y">Y</td>
              <td class="key-box" id="u">U</td>
              <td class="key-box" id="i">I</td>
              <td class="key-box" id="o">O</td>
              <td class="key-box" id="p">P</td>
            </tr>
          </tbody>
        </table>
        <table class="key-table">
          <tbody>
            <tr class="key-row2">
              <td class="key-box" style={{ visibility: 'hidden' }}></td>
              <td class="key-box" id="a">A</td>
              <td class="key-box" id="s">S</td>
              <td class="key-box" id="d">D</td>
              <td class="key-box" id="f">F</td>
              <td class="key-box" id="g">G</td>
              <td class="key-box" id="h">H</td>
              <td class="key-box" id="j">J</td>
              <td class="key-box" id="k">K</td>
              <td class="key-box" id="l">L</td>
              <td class="key-box" style={{ visibility: 'hidden' }}></td>
            </tr>
          </tbody>
        </table>
        <table class="key-table">
          <tbody>
            <tr class="key-row3">
              <td class="key-box" style={{ visibility: 'hidden' }}></td>
              <td class="key-box" style={{ visibility: 'hidden' }}></td>
              <td class="key-box" id="z">Z</td>
              <td class="key-box" id="x">X</td>
              <td class="key-box" id="c">C</td>
              <td class="key-box" id="v">V</td>
              <td class="key-box" id="b">B</td>
              <td class="key-box" id="n">N</td>
              <td class="key-box" id="m">M</td>
              <td class="key-box" style={{ visibility: 'hidden' }}></td>
              <td class="key-box" style={{ visibility: 'hidden' }}></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
