import React from 'react';
import Help from "./components/help"; //help quickguide
import GoogleMap from "./components/map"; //main map app component

import "./components/css/App.css";
import "bootstrap/dist/css/bootstrap.min.css"; //from npm bootstrap. fixes "root" margin border

function App() {
  return (
    <div className="AppPage">
      <header className="AppHeader">
          Good Eats
      </header>
      <Help/>

      <div className="AppBox">
        <GoogleMap/>
      </div>
    </div>
  );
}

export default App;
