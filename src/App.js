import React from 'react';
import GoogleMap from "./components/map"; //main map app component

import "./components/css/App.css";
import "bootstrap/dist/css/bootstrap.min.css"; //from npm bootstrap. fixes "root" margin border

function App() {
  return (
    <div className="AppPage">
      <header className="AppHeader">
          GoodEats
      </header>

      <div className="AppBox">
        <GoogleMap/>
      </div>
    </div>
  );
}

export default App;
