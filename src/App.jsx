
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
        setGuess(mainArr[guessCount].join(''));
      }
    };
    window.addEventListener('keydown', handleEnter);
    return () => {
      window.removeEventListener('keydown', handleEnter);
    };
    }, []);

  useEffect(() => {
    console.log("guess is", guess);
    checkGuess();
  }, [guess]);

  const checkGuess = () => {
    
  }

  //Handle input changes
  const handleChange = (cellIndex, e) => {
    let temp = [...mainArr];
    temp[guessCount][cellIndex] = e.toUpperCase();
    setMainArr(temp);
    console.log(mainArr[guessCount]);
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
                  ? <td class="let-box" key={cellIndex}><input class="input-box" id="input-{cellIndex}" onChange={(e) => handleChange(cellIndex, e.target.value)} maxLength="1" type="text" /></td>
                  : <td class="let-box" key={cellIndex}>{cell}</td>
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
