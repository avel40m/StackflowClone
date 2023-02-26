import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import QuestionRow from './QuestionRow';
import Header1 from './Header1';
import BlueButtonLink from './BlueButtonLink';
import axios from 'axios';

const HeaderRow = styled.div`
    display: grid;
    grid-template-columns: 1fr min-content;
    padding: 30px 20px;
`;

const QuestionsPage = () => {

  const [questions, setQuestions] = useState([]);

  function fetchQuestions() {
    axios.get('http://localhost:3030/questions',{withCredentials: true})
      .then(response => setQuestions(response.data))
      .catch(err => console.log(err));
  }

  useEffect(() => fetchQuestions(),[]) ;

  return (
    <main>
    <HeaderRow>
      <Header1 style={{margin:0}}>Top Questions</Header1>
      <BlueButtonLink to='/ask'>Ask&nbsp;Question</BlueButtonLink>
    </HeaderRow>
    {
      questions && questions.length > 0 && questions.map(questions =>(
      
      <QuestionRow title={questions.title} id={questions.id} />

      ))
    }
    </main>
  )
}

export default QuestionsPage
