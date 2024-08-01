import React from 'react'
import styled from 'styled-components'
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import { mobile } from '../responsive';
import { Link } from 'react-router-dom';
const Container = styled.div`
  display: flex;
  ${mobile({ flexDirection: "column" })}
`;

const Left = styled.div`
   flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;
const Logo = styled.h1``;
const Desc = styled.p`
  margin: 20px 0px;
`;
const SocialContainer = styled.div`
  display: flex;
`;
const Center = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ display: "none" })}
`;
const Title = styled.h3`
  margin-bottom: 30px;
`;
const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;
const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
`;
const Right = styled.div`
  flex:1
  ${mobile({ backgroundColor: "#fff8f8" })}
`;
const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;
const Payment = styled.img`
    width: 50%;
`;
const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: #${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`;
const Footer = () => {
  return (
    <Container>
       <Left>
        <Logo>LAMA.</Logo>
        <Desc>
          There are many variations of passages of Lorem Ipsum available, but
          the majority have suffered alteration in some form, by injected
          humour, or randomised words which don’t look even slightly believable.
        </Desc>
        <SocialContainer>
          <SocialIcon color="3B5999">
            <FacebookIcon/>
          </SocialIcon>
          <SocialIcon color="E4405F">
            <InstagramIcon />
          </SocialIcon>
          <SocialIcon color="000000">
            <XIcon />
          </SocialIcon>
        </SocialContainer>
      </Left>

      <Center>
      <Title>Useful Links</Title>
        <List>
        <ListItem>
        <Link to={`/`} style={{ textDecoration: 'none', color: 'inherit' }}>Home</Link> 
        </ListItem>

        <ListItem>
        <Link to={`/cart`} style={{ textDecoration: 'none', color: 'inherit' }}>  Cart</Link>
        </ListItem>

        <ListItem>
        <Link to={`/products/male`} style={{ textDecoration: 'none', color: 'inherit' }}>Man Fashion</Link >
        </ListItem>

        <ListItem>
        <Link to={`/products/female`} style={{ textDecoration: 'none', color: 'inherit' }}>Woman Fashion</Link>
        </ListItem>

          <ListItem><Link to={'/products/Accessories'} style={{ textDecoration: 'none', color: 'inherit' }}>Accessories</Link></ListItem>
          <ListItem>My Account</ListItem>
          <ListItem>Order Tracking</ListItem>
          <ListItem>Wishlist</ListItem>
          <ListItem>Wishlist</ListItem>
          <ListItem>Terms</ListItem>
        </List>
      </Center>

      <Right>
        <Title>Contact</Title>
        <ContactItem>
          <LocationOnIcon style={{marginRight:"10px"}} /> Location
        </ContactItem>
        <ContactItem>
          <LocalPhoneIcon style={{marginRight:"10px"}} /> +91 4332121234
        </ContactItem>
        <ContactItem>
          <EmailIcon style={{marginRight:"10px"}}  /> jsjkadhklas@gmail.com
        </ContactItem>
        <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
      </Right>
    </Container>
  )
}

export default Footer
