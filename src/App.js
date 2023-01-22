import "./App.css";
import { Route, Routes } from "react-router-dom";
import { ContextProvider } from "./Components/Context";
import LandingPage from "./Components/LandingPage";
import TVShows from "./Components/Shows/TVShows";
import Movies from "./Components/Movies/Movies";
import User from "./Components/User";
import Signup from "./Components/Signup";
import About from "./Components/About";
import Sidebar from "./Components/Sidebar";

function App() {
  return (
    <ContextProvider>
      <div className="App">
        <Sidebar />
        <div className="main">
          <Routes>
            <Route path="/" element={<LandingPage />}></Route>
            <Route path="/about" element={<About />}></Route>
            <Route path="/shows" element={<TVShows />}></Route>
            <Route path="/movies" element={<Movies />}></Route>
            <Route path="/user/:id" element={<User />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
          </Routes>
        </div>
      </div>
    </ContextProvider>
  );
}

export default App;
