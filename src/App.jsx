import './App.css';

function App() {
  //Delcaring properties
  const wordArray = [];
  const maxLetters = 5;
  const [guess, setGuess] = useState("");
  const [mainArr, setMainArr] = useState(() => Array(6).fill().map(() => Array(5).fill(" ")));

  return (
    <div className="App">
      
    </div>
  );
}

export default App;
