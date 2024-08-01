import React from 'react'
import styled from "styled-components";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { Link, useNavigate } from 'react-router-dom';
import {addProduct} from '../redux/cartRedux.js'
import {publicRequest} from "../requestMethod.js";
import { useDispatch } from 'react-redux';
const Info= styled.div`
  opacity:0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0,0,0,0.2);
  z-index:3;
  display:flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  
`

const Container= styled.div`
   flex: 1;
  margin: 5px;
  min-width: 280px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5fbfd;
  position:relative;

   &:hover ${Info} {
    opacity:1;
  }

`

const Circle= styled.div`
  width:200px;
  height: 200px;
  border-radius:50%;
  background-color: white;
  position:absolute;
`
const Image= styled.img`
  height:75%;
  z-index:2;
`

const Icon= styled.div`
  width: 40px;
  height: 40px;
  border-radius:50%;
  background-color: white;
  display:flex;
  align-items: center;
  justify-content: center;
  margin:10px;
  cursor:pointer;
  &:hover {
    transform: scale(1.2);
  }
`
const SingleProduct = (props) => {

  const dispatch=useDispatch();
  const navigate=useNavigate();
  const handleClick = async ()=>{
    navigate(`/product/${props.id}`);
  }
  const handleShopClick = async ()=>{
    try {
      const res= await publicRequest.get("product/find/"+props.id);
      dispatch( addProduct({...res.data, quantity: 1, color: props.color, size: props.size[0]}) );
    } catch (error) {
      console.log("error fecting data :",error);
    }
  }
  return (
    <Container onClick={handleClick}>
      <Circle />
      <Image src={props.img} />
      <Info>
        <Icon>
          <ShoppingCartIcon onClick={handleShopClick}/>
        </Icon>
        <Icon>
          <Link to={`/product/${props.id}`}>
          <SearchOutlinedIcon />
          </Link>
        </Icon>
        <Icon>
          <FavoriteBorderOutlinedIcon />
        </Icon>
      </Info>
    </Container>
  )
}

export default SingleProduct
