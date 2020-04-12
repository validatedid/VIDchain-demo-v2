import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Official from './components/Official/Official';

function App() {
  return (
  <div>
  <Official></Official>
  <Header></Header>
  <div>
    <p>Content</p>
  </div>
  <div className="footer">
    <Footer></Footer>
  </div>

  </div>
  
  

  );
}

export default App;
