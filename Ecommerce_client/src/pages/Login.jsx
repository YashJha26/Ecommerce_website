import React from 'react'
import styled from 'styled-components'
import { login } from "../redux/apiCalls";
import { mobile } from '../responsive';
import { useDispatch, useSelector } from "react-redux";

const Container= styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
`;
const Wrapper = styled.div`
    width: 30%;
    padding: 20px;
    background-color: white;
    ${mobile({ width: "75%" })}
`;
const Form= styled.form`
    display: flex;
    flex-direction:column;
    
`;
const Title=styled.h1`
    font-size: 24px;
    font-weight: 300;
    ${mobile({ marginBottom:"20px" })}
`;
const Input=styled.input`
    flex: 1;
    min-width: 40%;
    margin: 10px 0px;
    padding: 10px;
`;


const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom:10px;
  align-self: center;
  &:disabled {
    background-color: grey;
    color: grey;
    cursor: not-allowed;
  }
  ${mobile({ width: "80%" })}

`;
const Link = styled.a`
    margin : 5px 0px;
    font-size:12 px;
    text-decoration:underline;
    cursor:pointer
`
const Error = styled.span`
  color: red;
`;
const Login = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);
  const handleClick = (event)=>{
    event.preventDefault();
    login(dispatch, { username, password });
  }
  return (
    <Container>
        <Wrapper >
        <Title>Log In</Title>
        <Form>
          <Input placeholder="username"  onChange={(event) => setUsername(event.target.value)}/>
          <Input placeholder="password" type='password' onChange={(event) => setPassword(event.target.value)}/>
          <Button onClick={handleClick} disabled={isFetching}>Login</Button>
          {error && <Error>Something went wrong...</Error>}
        </Form>
        </Wrapper>
    </Container>
  )
}

export default Login
