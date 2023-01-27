import "./App.css";
import { Route, Routes } from "react-router-dom";
import { ContextProvider } from "./Components/Context";
import LandingPage from "./Components/Pages/LandingPage";
import TVShows from "./Components/Pages/Shows/TVShows";
import Movies from "./Components/Pages/Movies/Movies";
import User from "./Components/Pages/User";
import Signup from "./Components/Pages/Signup";
import About from "./Components/Pages/About";
import Sidebar from "./Components/SingleContent/Sidebar";
import AccountActions from "./Components/Pages/AccountActions";

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
            <Route path="/user" element={<User />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/account" element={<AccountActions />}></Route>
          </Routes>
        </div>
      </div>
    </ContextProvider>
  );
}

export default App;
