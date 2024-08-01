import React from 'react'
import styled from 'styled-components'
import { mobile } from '../responsive';
import {publicRequest} from "../requestMethod";
import { login } from "../redux/apiCalls";
import { useDispatch } from 'react-redux';
const Container= styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
`;
const Wrapper = styled.div`
    width: 40%;
    padding: 20px;
    background-color: white;
    ${mobile({ width: "75%" })}

`;
const Form= styled.form`
    display: flex;
    flex-wrap: wrap;
`;
const Title=styled.h1`
    font-size: 24px;
    font-weight: 300;
`;
const Input=styled.input`
    flex: 1;
    min-width: 40%;
    margin: 20px 10px 0px 0px;
    padding: 10px;
`;
const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;
const Error = styled.span`
  color: red;
`;

const Register = () => {
  const [username, setUsername] = React.useState("");
  const [email, setemail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [conpassword, setConPassword] = React.useState("");
  const [err, seterr] = React.useState(false);
  const dispatch=useDispatch();
  const handleRegister = async (event,user)=>{
    event.preventDefault();
    if(password !== conpassword){
      seterr(true);
      return;
    }
    try {
      const res = await publicRequest.post("/auth/register", user);
      //console.log(res);
      login(dispatch, { username, password });
    } catch (error) {
      console.log("Registration failed:",error);
    }
  }
  return (
    <Container>
        <Wrapper >
        <Title>CREATE AN ACCOUNT</Title>
        <Form>
          <Input placeholder="username"  onChange={(event) => setUsername(event.target.value)} />
          <Input placeholder="email"  onChange={(event) => setemail(event.target.value)}/>
          <Input placeholder="password"  onChange={(event) => setPassword(event.target.value)}/>
          <Input placeholder="confirm password"  onChange={(event) => setConPassword(event.target.value)}/>
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button onClick={(event)=>{handleRegister(event,{username,email,password})}}>Register</Button>
        </Form>
          {err && <Error>Password does not match...</Error>}
        </Wrapper>
    </Container>
  )
}

export default Register
