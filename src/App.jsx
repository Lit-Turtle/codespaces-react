
import React, { useState } from 'react';
import './App.css';

function App() {
  //Delcaring properties
  const wordArray = [];
  const maxLetters = 5;
  const [guess, setGuess] = useState("");
  const [mainArr, setMainArr] = useState(() => Array(6).fill().map(() => Array(5).fill(0)));

  return (
    <div className="App">
      <table class="let-table">
        <tbody>
          {mainArr.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td class="let-box" key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div class="keyboard">
        <table class="key-table">
          <tbody>
            <tr class="key-row1">
              <td class="key-box">Q</td>
              <td class="key-box">W</td>
              <td class="key-box">E</td>
              <td class="key-box">R</td>
              <td class="key-box">T</td>
              <td class="key-box">Y</td>
              <td class="key-box">U</td>
              <td class="key-box">I</td>
              <td class="key-box">O</td>
              <td class="key-box">P</td>
            </tr>
          </tbody>
        </table>
        <table class="key-table">
          <tbody>
            <tr class="key-row2">
              <td class="key-box" style={{ visibility: 'hidden' }}></td>
              <td class="key-box">A</td>
              <td class="key-box">S</td>
              <td class="key-box">D</td>
              <td class="key-box">F</td>
              <td class="key-box">G</td>
              <td class="key-box">H</td>
              <td class="key-box">J</td>
              <td class="key-box">K</td>
              <td class="key-box">L</td>
              <td class="key-box" style={{ visibility: 'hidden' }}></td>
            </tr>
          </tbody>
        </table>
        <table class="key-table">
          <tbody>
            <tr class="key-row3">
              <td class="key-box" style={{ visibility: 'hidden' }}></td>
              <td class="key-box" style={{ visibility: 'hidden' }}></td>
              <td class="key-box">Z</td>
              <td class="key-box">X</td>
              <td class="key-box">C</td>
              <td class="key-box">V</td>
              <td class="key-box">B</td>
              <td class="key-box">N</td>
              <td class="key-box">M</td>
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
