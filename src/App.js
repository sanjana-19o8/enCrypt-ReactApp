import React from 'react';
import './App.css';
import { Navbar, Home, Footer} from './components/index';

const App = () => {
  return (
    <div className="App">
      <div className='navbar'>
        <Navbar />
      </div>
      {/* <div className='home'>
        <Home />
      </div>
      <div className='footer'>
        <Footer />
      </div> */}
    </div>
  );
}

export default App;
