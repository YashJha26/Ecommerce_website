import React from 'react'
import styled from "styled-components";
import SendIcon from '@mui/icons-material/Send';
import { mobile } from '../responsive';
const Container=styled.div`
    height:60vh;
    background-color: #fcf5f5;
    display:flex;
    align-items: center;
    justify-content: center;
    flex-direction:column;
`

const Title=styled.h2`
    font-size:70px;
    margin-bottom:20px;
`
const Desc=styled.div`
    font-size:24px;
    font-weight: 300;
    margin-bottom:20px;
    ${mobile({ textAlign: "center" })}
`
const InputContainer=styled.div`
    width:50%;
    height:40px;
    background-color: white;
    display:flex;
    justify-content: space-between;
    border: 1px solid lightgray
    ${mobile({ width: "80%" })}
`
const Input=styled.input`
    flex:8;
    border: none;
    padding-left:20px;
`
const Btn=styled.button`
    flex:1;
    border:none;
    background-color: teal;
    color:white;
`
const NewLetter = () => {
  return (
    <Container>
      <Title>Newsletter</Title>
      <Desc>Updates for fav products </Desc>
      <InputContainer>
        <Input placeholder='Your Email'/>
        <Btn>
            <SendIcon />
        </Btn>
      </InputContainer>
    </Container>
  )
}

export default NewLetter
