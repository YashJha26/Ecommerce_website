import React from 'react'
import styled from 'styled-components'
import ArrowBackIosNewTwoToneIcon from '@mui/icons-material/ArrowBackIosNewTwoTone';
import ArrowForwardIosTwoToneIcon from '@mui/icons-material/ArrowForwardIosTwoTone';
import {sliderItems} from '../Data';
import { mobile } from '../responsive';
const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  position: relative;
  overflow:hidden;
  ${mobile({ display: "none" })}
`;
const Arrow = styled.div`
  width: 50px;
  height: 50px;
  background-color: #fff7f7;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${(props) => props.direction === "left" && "10px"};
  right: ${(props) => props.direction === "right" && "10px"};
  margin: auto;
  cursor: pointer;
  opacity: 0.5;
  z-index: 2;
`;

const Wrapper =styled.div`
    height:100%;
    display:flex;
    transition:all 1s ease;
    transform: translate(${props=>props.slideIndex*-100}vw)
`

const Slide = styled.div`
    width:100vw;
    height:100vh;
    display:flex;
    align-items: center;
    background-color:#${props=>props.bg}
`

const ImageContainer = styled.div`
    height:100%;
    flex:1;
`
const InfoContainer = styled.div`
    flex:1;
    padding: 50px; 
`
const Image = styled.img`
    height:80%
`
const Title=styled.h2`
    font-size:70px;
`;
const Desc=styled.p`
    margin:50px 0px;
    font-size:20px;
    font-weight:500;
    letter-spacing:3px;
`;
const Btn=styled.button`
    padding:10px;
    font-size:20px;
    background-color:transparent;
    cursor:pointer;
`;
const Slider = () => {
  const [slideIndex,setSlideIndex]=  React.useState(0);
  function handleClick(direction){
    if(direction === "left"){
      setSlideIndex(slideIndex>0?slideIndex-1:2);
    }else{
      setSlideIndex(slideIndex<2?slideIndex+1:0);
    }
  }
  return (
    <Container>
      <Arrow direction="left"  onClick={()=>{handleClick("left")}}>
        <ArrowBackIosNewTwoToneIcon />
      </Arrow>
      <Wrapper slideIndex={slideIndex} >
        {sliderItems.map((item)=>{
          return(<Slide bg={item.bg} key={item.id}>
            <ImageContainer>
                <Image src={item.img}/>
            </ImageContainer>
            <InfoContainer>
                <Title>{item.title} </Title>
                <Desc>{item.desc}</Desc>
                <Btn>Buy Now </Btn>
            </InfoContainer>
          </Slide>)
        })}
        
      </Wrapper >
      <Arrow direction="right" onClick={()=>{handleClick("right")}}>
        <ArrowForwardIosTwoToneIcon  />
      </Arrow>
    </Container>
  )
}

export default Slider
