import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router , Routes, Route} from 'react-router-dom';
import Home from "./components/home";
import Read from "./components/read";
import Create from "./components/create";
import Update from "./components/update";


function App() {
  return (
    <Router>
      <div>
      <h1>User Management Application</h1>
      <Routes>
      <Route path="/" element={<Home />} /> {/* Home Page */}
        <Route path="/create" element={<Create />}></Route> 
        <Route path="/update/:id" element={<Update />}></Route>
        <Route path="/read/:id" element={<Read />}></Route>
     </Routes>
     </div>
    </Router>
  );
}

export default App;
