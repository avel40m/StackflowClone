import {  useEffect, useState } from 'react';
import { Reset } from 'styled-reset';
import Header from './Header';
import QuestionPage from './QuestionPage';
import AskPage from './AskPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GlobalStyle from './GlobalStyles';
import UserContext from './UserContext';
import LoginPage from './LoginPage';
import axios from 'axios';

function App() {
  const [user,setUser] = useState(null);

  function checkAuth(){
  axios.get('http://localhost:3030/profile',{withCredentials: true})
      .then((response) => {
        setUser({email: response.data})
      }).catch(() => {
        setUser(null);
      });
  }

  useEffect(() => {
    checkAuth();
  },[]);


  return (
    <div>
    <Reset />
    <GlobalStyle />
    <BrowserRouter>
    <UserContext.Provider value={{user,checkAuth}}>
    <Header />
      <Routes>
        <Route path='/ask' element={<AskPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/' element={<QuestionPage />} />
      </Routes>
    </UserContext.Provider>
    </BrowserRouter>
    </div>
  );
}

export default App;
