
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./views/Home/Home";
import Details from "./views/Details/Details";
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details/:id" element={<Details />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
