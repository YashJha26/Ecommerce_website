import React from 'react'
import styled from 'styled-components'
import SearchIcon from '@mui/icons-material/Search';
import Badge from '@mui/material/Badge';
import ShoppingCartTwoToneIcon from '@mui/icons-material/ShoppingCartTwoTone';
import { useDispatch, useSelector } from 'react-redux';
import { mobile } from '../responsive';
import { Link } from 'react-router-dom';
import {logout} from "../redux/userRedux"
const Container = styled.div`
    height: 60px;
    ${mobile({height:"50px"})}
    
`
const Wrapper = styled.div`
    padding: 10px 20px;
    display: flex;
    justify-content:space-between;
    ${mobile({padding:"10px 0px"})}
`

const Left=styled.div`
    flex:1;
    display: flex;
`
const SearchContainer = styled.div`
    border: 0.5px solid lightgrey;
    display: flex;
    align-item:center;
    margin-left:20px;
    padding: 5px;
    height:20px;
`
const Input = styled.input`
    border:none;
    ${mobile({width:"50px"})}
`

const Centre=styled.div`
    flex:1;
    text-align:center;
    align-item:flex-start;
`  
const Logo = styled.h1`
    font-weight:bold;
    margin-block-start:0px;
    margin-block-end:0px;
    font-size:25px;
    ${mobile({fontSize:"20px"})}
`
const Right=styled.div`
    flex:1;
    display:flex;
    align-item:centre;
    justify-content:flex-end;
     ${mobile({ flex: 2, justifyContent: "center" })}
` 
const MenuIten = styled.div`
    font-size:12px;
    cursor: pointer;
    margin-left:20px
`
    
const Navbar = () => {
    const user=useSelector(state=>state.user.currentUser);
    //console.log(user);
    const cart = useSelector(state=>state.cart);
    const dispatch=useDispatch()
    const quantity=cart.quantity;
    const handleLogout = ()=>{
        dispatch(logout())
    }
  return (
    <div>
        <Container>
            <Wrapper>
                <Left>
                    <SearchContainer>
                        <Input placeholder='Search'/>
                        <SearchIcon style={{color:"grey",fontSize:16}}/>
                    </SearchContainer>
                </Left>
                <Centre><Logo>TheWardrobe</Logo></Centre>
                <Right>
                    
                    {user
                        ?(
                            <MenuIten onClick={handleLogout}>Log Out</MenuIten>
                        )
                        :(
                            <>
                            <Link to ="/register"  style={{ textDecoration: 'none', color: 'inherit' }}>
                            <MenuIten>Register</MenuIten>
                            </Link>
                            <Link to = "/login" style={{ textDecoration: 'none', color: 'inherit' }}>
                                <MenuIten>sign in</MenuIten>
                            </Link>
                            </>
                        )
                    }
                    
                    <Link to="/cart">
                        <MenuIten>
                            <Badge badgeContent={quantity} color="primary">
                                <ShoppingCartTwoToneIcon style={{fontSize:20}}/>
                            </Badge>
                        </MenuIten>
                    </Link>
                    
                </Right>
            </Wrapper>
        </Container>
    </div>
  )
}

export default Navbar
