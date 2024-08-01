import React from 'react'
import styled from 'styled-components'
import { mobile } from '../responsive';
import { Link } from 'react-router-dom';
const Container= styled.div`
  flex:1;
  margin: 3px;
  height:60vh;
  position:relative;
`
const Image=styled.img`
  width:100%;
  height:100%;
  object-fit:cover;
  ${mobile({ height: "20vh" })}
`
const InfoContainer=styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
const Title=styled.h2`
  color:white;
  margin-bottom:20px;
`
const Button=styled.button`
  border:none;
  padding:10px;
  color:gray;
  cursor:pointer;
  font-weight:600;
`
const CatagorieItems = (props) => {
  return (
    <Container>
      <Link to={`/products/${props.cat}`}> 
        <Image src={props.img}/>
        <InfoContainer>
          <Title>{props.title}</Title>
          <Button>Buy Now</Button>
        </InfoContainer>
      </Link>
    </Container>
  )
}

export default CatagorieItems
