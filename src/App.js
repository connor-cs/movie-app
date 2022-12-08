import logo from './logo.svg';
import './App.css';
import NavBar from './Components/NavBar';
import LandingPage from './Components/LandingPage';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <LandingPage />
      </Routes>
    </div>
  );
}

export default App;
