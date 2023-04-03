import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import icon from './icon.svg'
import LeftContainer from './LeftContainer/LeftContainer';
import RightContainer from './RightContainer/RightContainer';

function App() {
  
  return (
    <div className="App">
      <LeftContainer/>
      <RightContainer/>
    </div>
  );
}

export default App;
