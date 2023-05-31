import React, { useEffect, useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './routes/Home';
import Account from './routes/Account';
import Signin from './routes/Signin';
import Signup from './routes/Signup';
import axios from 'axios'
import CoinPage from './routes/CoinPage';
import Footer from './components/Footer';
import { AuthContextProvider } from './context/AuthContext';

function App() {

  const [coins, setCoins] = useState([])

  const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=15&page=1&sparkline=true'

  useEffect(()=>{
    axios.get(url).then((res)=>{
      setCoins(res.data)
      // console.log(res.data)
    })
  },[url])

  return <ThemeProvider>
    <AuthContextProvider>
      
    <Navbar />
    <Routes>
      <Route path="/" element={<Home coins={coins} />} />
      <Route path="/account" element={<Account />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route path ="/coin/:coinId" element = {<CoinPage />}>
          <Route path=":coinId"/>
      </Route>
    </Routes>
    <Footer/>
    </AuthContextProvider>
  </ThemeProvider>
}

export default App;
