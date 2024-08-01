import React, { useEffect } from 'react'
import styled from 'styled-components'
import Navbar from '../components/navbar'
import Announcement from '../components/Announcement'
import Footer from '../components/Footer'
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveIcon from '@mui/icons-material/Remove';
import { mobile } from '../responsive';
import { useDispatch, useSelector } from 'react-redux'
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import StripeCheckout from 'react-stripe-checkout';
import {userRequest} from '../requestMethod'
import { useNavigate } from 'react-router-dom';
import {updateCart,removeProduct,removeCart} from '../redux/cartRedux.js'
import axios from "axios";


const promise = loadStripe(process.env.REACT_APP_STRIPE);
const Container=styled.div`
`
const Title=styled.h1`
  font-weight:600;
  text-align:center;
`
const Wrapper=styled.div`
  padding: 20px;
   ${mobile({ padding: "10px" })}
`
const Top=styled.div`
  display:flex;
  align-item:center;
  justify-content:space-between;
  padding:20px;
`
const TopButton=styled.button`
  padding:10px;
  font-weight:600;
  cursor:pointer;
`
const TopInfo=styled.div`
   ${mobile({ display: "none" })}
`
const TopText=styled.span`
  text-decoration:underline;
  cursor:pointer;
  margin:0px 10px;
`
const Bottom=styled.div`
  display:flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`
const BottomInfo=styled.div`
  flex:3;
`
const Product = styled.div`
  display: flex;
  justify-content: space-between;
   ${mobile({ flexDirection: "column" ,marginRight:"10px"})}
`;
const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;
const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const TopRightContainer= styled.div`
  align-self:flex-end;
  margin-right: 10px;
  margin-bottom: 40px;
`;
const ProductAmountContainer=styled.div`
  display:flex;
  align-items:center;
  margin-bottom:20px;
`
const ProductAmount=styled.div`
  font-size:24px;
  margin:5px;
  ${mobile({ margin: "5px 15px" })}
`
const ProductPrice=styled.div`
  font-size: 30px;
  font-weight:200;
  ${mobile({ marginBottom: "20px" })}
`
const Summary=styled.div`
  flex:1;
  border:0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`
const SummaryItem= styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "400"};
  font-size: ${(props) => props.type === "total" && "24px"};
`
const SummaryItemText= styled.span`

`
const SummaryItemPrice= styled.span`

`
const SummaryTitle= styled.h2`

`
const Button= styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`
const Error = styled.span`
  color: red;
`;
const base_URL="https://ecommerce-website-backend-5fvc.onrender.com/api"
const Cart = () => {
  const cart= useSelector((state)=>state.cart);
  const isLoggedIn=useSelector(state=>state.user.currentUser);
  const user=isLoggedIn?isLoggedIn.user:null;
  const userToken=isLoggedIn?isLoggedIn.accessToken:null;
  //console.log(isLoggedIn);
  const [stripeToken, setStripeToken] = React.useState(null);
  const [finalAmount, setFinalAmount] = React.useState(null);
  const navigate = useNavigate();
  const dispatch=useDispatch();

  const onToken = (token) => {
    setStripeToken(token);
  };

  const getAddress = ()=>{
    const shippingAddress = [];

      if (stripeToken.card.address_line1) {
      shippingAddress.push(stripeToken.card.address_line1);
    }
    if (stripeToken.card.address_line2) {
      shippingAddress.push(stripeToken.card.address_line2);
    }
    if (stripeToken.card.address_state) {
      shippingAddress.push(stripeToken.card.address_state);
    }
    if (stripeToken.card.address_zip) {
      shippingAddress.push(stripeToken.card.address_zip);
    }
    return shippingAddress.join(', ');

  }

  //console.log(stripeToken);
  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await userRequest.post("/checkout/payment", {
          tokenId: stripeToken.id,
          amount: finalAmount*100,
        });
        
        const orderData = {
          userId:user._id,
          products: cart.products.map((product) => ({
            productId:product._id,
            quantity:product.quantity
          })),
          amount:finalAmount,
          address:getAddress(),
        }

        const orderResponse = await axios.post(`${base_URL}/order`,orderData,{headers:{Authorization: `Bearer ${userToken}`}});
        console.log("Order created successfully!", orderResponse.data);
        alert("Your order has been successfully placed!")
        dispatch(removeCart());
        navigate('/', { state: { stripeData: res.data, products: cart } });
      } catch(error){
        console.log(error);
      }
    };
    stripeToken && makeRequest();
  }, [stripeToken, cart.total, navigate]);

  useEffect(() => {
    setFinalAmount(cart.total>400?cart.total:cart.total+20);
  },[cart.total])

  const handleQuantity=(type,product)=>{
    const updatedCart = {
      ...cart,
      products:cart.products.map((item)=>{
        return (
          item._id===product._id
          ?{...item,quantity:updateQuantity(item.quantity,type) }
          :item
        )
      })
    }
    dispatch(updateCart(updatedCart));
  }

  const HandleDeleteProduct = (product)=>{
    dispatch(removeProduct(product));
    return;
  }

  const updateQuantity = (currentQuantity,type)=>{
    if(type=="inc"){
      return currentQuantity+1;
    }else{
      return Math.max(1,currentQuantity-1);
    }
  };
  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>Your Cart</Title>
        <Top>
          <TopButton onClick={()=>{navigate('/')}}>Continue Shopping</TopButton>
          <TopInfo>
            <TopText>Cart ({cart.quantity}) </TopText>
            <TopText>Wishlist (0)</TopText>
          </TopInfo>
          <TopButton>Checkout</TopButton>
        </Top>
        <Bottom>
          <BottomInfo>
           {cart.products.map((product)=>(
            <>
            <Product>
                <ProductDetail>
                  <Image src={product.img}/>
                  <Details>
                    <ProductName>
                      <b>Product:</b> {product.title}
                    </ProductName>
                    <ProductId>
                      <b>ID:</b> {product._id}
                    </ProductId>
                    <ProductColor color={product.color} />
                    <ProductSize>
                      <b>Size:</b> {product.size}
                    </ProductSize>
                  </Details>
                </ProductDetail>
                <PriceDetail>
                  <TopRightContainer><DeleteIcon onClick={()=>{HandleDeleteProduct(product)}} sx={{ marginLeft: '40px', color: 'red' }} /></TopRightContainer>
                  <ProductAmountContainer>
                    <AddIcon onClick={()=>{handleQuantity("inc",product)}} />
                    <ProductAmount>{product.quantity}</ProductAmount>
                    <RemoveIcon onClick={()=>{handleQuantity("dec",product)}} />
                  </ProductAmountContainer>
                  <ProductPrice>₹{product.price*product.quantity}</ProductPrice>
                </PriceDetail>
              </Product>
              <hr />
              </>
            ))}
            
          </BottomInfo>
          <Summary>
            <SummaryTitle></SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal:</SummaryItemText>
              <SummaryItemPrice>₹{cart.total}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Dilvery Charge:</SummaryItemText>
              <SummaryItemPrice>₹20</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Discount</SummaryItemText>
              <SummaryItemPrice>{cart.total>400?"-₹20":"₹0"}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText >Total</SummaryItemText>
              <SummaryItemPrice>₹{finalAmount}</SummaryItemPrice>
            </SummaryItem>

            <Elements stripe={promise}>
              {
                isLoggedIn?(

                  <StripeCheckout
                  name="Shop"
                  billingAddress
                  shippingAddress
                  description={`Your total is ${finalAmount}`}
                  currency='INR'
                  amount={finalAmount * 100}
                  token={onToken}
                  stripeKey={process.env.REACT_APP_STRIPE}
                  >
            <Button>CHECKOUT NOW</Button>
             </StripeCheckout>
              ): <Error>You must be logged in to checkout. Please login or create an account.</Error>
              }
            </Elements>
          </Summary>
          
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  )
}

export default Cart
