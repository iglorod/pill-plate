import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Layout from './component/Layout/Layout';
import './App.module.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Layout />
      </div>
    </BrowserRouter>
  );
}

export default App;
