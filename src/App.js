import React from 'react';
import { Route, Link, Routes } from 'react-router-dom';
import { Layout, Typography, Space } from 'antd';
import './App.css';
import { Navbar, Homepage, Cryptocurrencies, CryptoDetails, News} from './components/index';

const App = () => {
  return (
    <div className="App">
      <div className='navbar'>
        <Navbar />
      </div>
      <div className='main'>
        <Layout>
          <div className='routes'>
            <Routes>
              <Route exact path='/' element={ <Homepage /> }></Route>
              <Route exact path='/cryptocurrencies' element={ <Cryptocurrencies /> }></Route>
              <Route exact path='/crypto/:coinId' element={ <CryptoDetails /> }></Route>
              <Route exact path='/news' element={ <News /> }></Route>
            </Routes>
          </div>
        </Layout>
        <div className='footer'>
          <Typography.Title level={5} style={{ color: "whitesmoke", textAlign: "centre"}}>
            enCrypt!<br />
            <small style={{ fontSize: "10px"}}>&copy;sanjana-vajr</small>
          </Typography.Title>
          <Space>
            <Link to='/'>Home</Link>
            <Link to='/exchanges'>Exchanges</Link>
            <Link to='/news'>News</Link>
          </Space>
        </div>
      </div>
    </div>
  );
}

export default App;
