import {  useEffect, useState } from 'react';
import { Reset } from 'styled-reset';
import Header from './Header';
import AskPage from './AskPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GlobalStyle from './GlobalStyles';
import UserContext from './UserContext';
import LoginPage from './LoginPage';
import axios from 'axios';
import RegisterPage from './RegisterPage';
import ProfilePage from './ProfilePage';
import QuestionsPage from './QuestionsPage';
import QuestionPage from './QuestionPage';

function App() {
  const [user,setUser] = useState(null);

  function checkAuth(){
    return new Promise((resolve, reject) => {
      axios.get('http://localhost:3030/profile',{withCredentials: true})
          .then((response) => {
            setUser({email: response.data});
            resolve(response.data);
          }).catch(() => {
            setUser(null);
            reject(null);
          });

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
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/questions/:id' element={<QuestionPage />} />
        <Route path='/' element={<QuestionsPage />} />
      </Routes>
    </UserContext.Provider>
    </BrowserRouter>
    </div>
  );
}

export default App;
