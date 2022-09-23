import logo from './logo.svg';
import './App.css';
import NewHome from './components/NewHome';
import 'face-api.js/dist/face-api.min.js';

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
      </header> */}
      <NewHome />
    </div>
  );
}

export default App;
