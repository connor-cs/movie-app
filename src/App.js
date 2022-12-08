import logo from './logo.svg';
import './App.css';
import NavBar from './Components/NavBar';
import LandingPage from './Components/LandingPage';
import TVShows from './Components/TVShows';
import Movies from './Components/Movies';
import { Route, Routes } from 'react-router-dom';
import About from './Components/About';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route exact path='/about' element={<About />} ></Route>
        <Route exact path='/' element={<LandingPage />} ></Route>
        <Route exact path='/shows' element={<TVShows />} ></Route>
        <Route exact path='/movies' element={<Movies />} ></Route>
      </Routes>
    </div>
  );
}

export default App;
