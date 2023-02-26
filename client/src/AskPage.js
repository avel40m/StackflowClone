import React, {useState} from 'react'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import styled from 'styled-components'
import BlueButton from './BlueButton';
import Header1 from './Header1';
import gfm from 'remark-gfm';
import Input from './Input';
import axios from 'axios';

const Container = styled.div`
    margin: 30px 20px;
`;

const QuestionBodyTextarea = styled.textarea`
    background: none;
    border: 1px solid #777;
    border-radius: 3px;
    display: block;
    width:100%;
    box-sizing: border-box;
    padding: 10px;
    min-height:200px;
    margin-bottom:20px;
    color: #fff;
    font-family:inherit;
`;

const PreviewArea = styled.div`
  padding: 10px 20px;
  background-color: #444;
  border-radius:5px;
  margin-bottom:20px;
`;

const AskPage = () => {
  const [questionTitle,setQuestionTitle] = useState('');
  const [questionBody,setQuestionBody] = useState('');
  
    function sendQuestion(e){
      e.preventDefault();
      console.log('SEND QUESTIONS');
      axios.post('http://localhost:3030/questions',{
        title:questionTitle,
        content:questionBody,
      },{withCredentials: true})
      .then(response => console.log(response))
      .catch(e => console.log(e));
    }
  
  return (
    <Container>
        <Header1 style={{marginBottom: '20px'}}>Ask a public Question</Header1>
        <form onSubmit={(e) => sendQuestion(e)}>
        <Input
        type="text"
        value={questionTitle}
        onChange={e => setQuestionTitle(e.target.value)}
        placeholder='Title of your question' />
        <QuestionBodyTextarea
        onChange={e => setQuestionBody(e.target.value)}
        placeholder='More info about your question.You can use markdown here'
        value={questionBody}>
          {questionBody}
        </QuestionBodyTextarea>
        <PreviewArea>
          <ReactMarkdown plugins={{gfm}} children={questionBody} />
        </PreviewArea>
        <BlueButton type='submit'>Post question</BlueButton>

        </form>
    </Container>
  )
}

export default AskPage
