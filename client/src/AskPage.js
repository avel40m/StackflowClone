import React, {useState} from 'react'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import styled from 'styled-components'
import BlueButton from './BlueButton';
import Header1 from './Header1';
import gfm from 'remark-gfm';
import Input from './Input';

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
  return (
    <Container>
        <Header1 style={{marginBottom: '20px'}}>Ask a public Question</Header1>
        <Input
        type="text"
        value={questionTitle}
        onChange={e => setQuestionTitle(e.target.value)}
        placeholder='Title of your question' />
        <QuestionBodyTextarea
        onChange={e => setQuestionBody(e.target.value)}
        placeholder='More info about your question.You can use markdown here'>
          {questionBody}
        </QuestionBodyTextarea>
        <PreviewArea>
          <ReactMarkdown plugins={{gfm}} children={questionBody} />
        </PreviewArea>
        <BlueButton>Post question</BlueButton>
    </Container>
  )
}

export default AskPage
