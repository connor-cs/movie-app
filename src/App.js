import logo from './logo.svg';
import './App.css';
import NavBar from './Components/NavBar';
import LandingPage from './Components/LandingPage';
import TVShows from './Components/TVShows';
import Movies from './Components/Movies';
import { Route, Routes } from 'react-router-dom';
import About from './Components/About';
import Sidebar from './Components/Sidebar';

function App() {
  return (
    <div className="App">
      {/* <NavBar /> */}
      <Sidebar />
      <Routes>
        <Route path='/about' element={<About />} ></Route>
        <Route path='/' element={<LandingPage />} ></Route>
        <Route path='/shows' element={<TVShows />} ></Route>
        <Route path='/movies' element={<Movies />} ></Route>
      </Routes>
    </div>
  );
}

export default App;
