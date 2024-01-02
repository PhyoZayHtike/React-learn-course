import React from "react";
import "./App.css";
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Navbar from "./components/navbar";
import { Login } from "./pages/login";
import { CreatePost } from "./pages/create-post/create-post";
import { Main } from "./pages/main/main";

function App() {
  return (
    <div className="">
      <Router>
      <Navbar/>
        <Routes>
          <Route path="/" element={<Main/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/createpost" element={<CreatePost/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
