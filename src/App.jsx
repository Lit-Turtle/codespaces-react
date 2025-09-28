
import React, { useState } from 'react';
import './App.css';

function App() {
  //Delcaring properties
  const wordArray = [];
  const maxLetters = 5;
  const [guess, setGuess] = useState("");
  const [mainArr, setMainArr] = useState(() => Array(6).fill().map(() => Array(5).fill(0)));
  const [guessCount, setGuessCount] = useState(0);
  const inputElement = document.getElementById("input-element");

  /*inputElement.addEventListener('keydown', (event) => {
    if (event.key == 'Enter') {

    }
  });*/

  return (
    <div className="App">
      <table class="let-table">
        <tbody>
          {mainArr.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                rowIndex == guessCount ? <td class="let-box"><input class="input-box" id="input-element" maxlength="1" type="text"></input></td> : <td class="let-box" key={cellIndex}>{cell}</td>
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
