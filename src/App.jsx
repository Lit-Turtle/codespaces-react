
import React, { useState, useRef, useEffect } from 'react';
import './App.css';

function App() {
  //Delcaring properties
  const [wordle, setWordle] = useState("");
  const [guess, setGuess] = useState("");
  const [mainArr, setMainArr] = useState(() => Array(6).fill().map(() => Array(5).fill("")));
  const [guessCount, setGuessCount] = useState(0);
  const [firstEmpty, setFirstEmpty] = useState(0);
  const [playing, setPlaying] = useState(false);

  //Starting Game
  const gameStart = () => {
    console.log("Game Started");
    setPlaying(true);
    setGuessCount(0);
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
  
  //Enter key event
    useEffect(() => {
    const handleEnter = (e) => {
      if (e.key === 'Enter') {
        console.log('Enter key pressed (global)');
        const row = mainArr[guessCount];
        if (row && !row.includes("")) {
          setGuess(row.join('').toUpperCase());
        }
      }
    };
    window.addEventListener('keydown', handleEnter);
    return () => {
      window.removeEventListener('keydown', handleEnter);
    };
    }, [mainArr, guessCount]);

  useEffect(() => {
    console.log("guess is", guess);
    checkGuess();
  }, [guess]);

  const checkGuess = () => {
    if(guess === wordle) {
      console.log("You Win!");
      setPlaying(false);
      setGuessCount(999);
    } else {
      if(guessCount < 5) {
        let guessArr = [...guess];
        let wordleArr = [...wordle];
        console.log(guessArr);
        console.log(wordleArr);
        for(let char = 0; char < guessArr.length; char++) {
          if(wordleArr.includes(guessArr[char]) && guessArr[char] === wordleArr[char]) {
            console.log(guessArr[char] + " is in the word and right place");
            let correct = document.getElementById(guessArr[char].toLowerCase());
            correct.style.backgroundColor = "#9effa9"
            correct.style.border = "2px solid #9effa9"
          } else if(wordleArr.includes(guessArr[char])) {
            console.log(guessArr[char] + " is in the word but wrong place");
            let close = document.getElementById(guessArr[char].toLowerCase());
            close.style.backgroundColor = "yellow"
            close.style.border = "2px solid yellow"
          } else {
            console.log(guessArr[char] + " is not in the word");
            let wrong = document.getElementById(guessArr[char].toLowerCase());
            wrong.style.backgroundColor = "red"
            wrong.style.border = "2px solid red"
          }
        }
        setGuessCount(guessCount + 1);
      } else {
        console.log("You Lose! The word was " + wordle);
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
                  ? <td class="let-box" key={cellIndex}><input class="input-box row{rowIndex}" id="input-{cellIndex}" onChange={(e) => handleChange(cellIndex, e.target.value)} maxLength="1" type="text" /></td>
                  :   <td class="let-box" key={cellIndex}>{cell}</td>
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
