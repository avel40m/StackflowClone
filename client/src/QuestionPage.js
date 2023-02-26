import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Header1 from './Header1';
import ReactMarkdown from "react-markdown";
import gfm from 'remark-gfm';

const Container = styled.div`
    margin: 30px 20px;
`;

function QuestionPage(){
    const { id } = useParams();

    const [question,setQuestion] = useState({});

    function fetchQuestion(){
        axios.get('http://localhost:3030/questions/' + id)
            .then(response => {
                setQuestion(response.data)
            })
    }

    useEffect(() => fetchQuestion(),[]);

    return(
        <>

        <Container>
            {
                question && (
                   <>
            <Header1>{question.title}</Header1>
            <ReactMarkdown plugins={{gfm}} children={question.content}></ReactMarkdown>
                   </> 
                )
            }
        </Container>
        </>
    )
}

export default QuestionPage;