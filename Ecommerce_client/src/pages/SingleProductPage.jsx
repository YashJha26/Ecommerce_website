import React, { useEffect } from 'react'
import styled from 'styled-components'
import Navbar from '../components/navbar'
import Announcement from '../components/Announcement'
import NewLetter from '../components/NewLetter'
import Footer from '../components/Footer'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { mobile } from "../responsive";
import { useLocation } from 'react-router-dom'
import {publicRequest} from "../requestMethod.js";
import { addProduct } from '../redux/cartRedux.js'
import { useDispatch } from 'react-redux'
const Container=styled.div`

`
const SingleProductWrapper=styled.div`
    padding:50px;
    display:flex;
    ${mobile({ padding: "10px", flexDirection:"column" })}
`
const ImageContainer=styled.div`
    flex:1;
`
const Image=styled.img`
  width:100%;
  height:90vh;
  object-fit:cover;
  ${mobile({ height: "40vh" })}
`
const InfoContainer=styled.div`
    flex:1;
    padding:0px 50px;
     ${mobile({ padding: "10px" })}
`
const Title=styled.h2`
  font-weight:200;
`
const Desc=styled.p`
  margin:20px 0px;
`
const Price=styled.span`
  font-weight:100;
  font-size:40px
`

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;
const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0px 5px;
  cursor: pointer;
`;

const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;

`;

const SingleProductPage = () => {
  const location = useLocation();
  const product_id=location.pathname.split("/")[2];
  const [product,setProduct] = React.useState({});
  const [quantity,setQuantity]=React.useState(1);
  const [color,setColor]=React.useState("");
  const [size,setSize]=React.useState("");
  const dispatch = useDispatch();

  //console.log(location.pathname);
  useEffect(()=>{
    const getProduct = async ()=>{
      try {
        const res= await publicRequest.get("product/find/"+product_id);
        //console.log(res.data);
        setProduct(res.data);
      } catch (error) {
        
      }
    }
    getProduct();
  },[product_id]);

  const handleQuantity = (type) =>{
    if(type === "inc"){
       setQuantity(quantity+1);
    }else{
      quantity>1 && setQuantity(quantity-1);
    }
  }
  const handleClick = () =>{
    dispatch(addProduct({...product,quantity,color:product.color,size}));
  }
  return (
    <Container>
      <Navbar />
      <Announcement />
      <SingleProductWrapper>
        <ImageContainer>
            <Image src={product.img} />
        </ImageContainer>
        <InfoContainer>
            <Title>{product.title} </Title>
            <Desc>
              {product.desc}
            </Desc>
            <Price>₹{product.price}</Price>
            <FilterContainer>
            <Filter>
              <FilterTitle>Color</FilterTitle>
              <FilterColor color= {product.color} />
            </Filter>
            <Filter>
              <FilterTitle  onChange={(e) => setSize(e.target.value)}>Size</FilterTitle>
              <FilterSize>
                {product.size?.map((s) => (
                  <FilterSizeOption key={s}>{s}</FilterSizeOption>
                ))}
              </FilterSize>
            </Filter>
          </FilterContainer>
          <AddContainer>
            <AmountContainer>
              <RemoveIcon onClick = {()=>{handleQuantity("dec")}} />
              <Amount>{quantity}</Amount>
              <AddIcon onClick = {()=>{handleQuantity("inc")}} />
            </AmountContainer>
            <Button onClick={handleClick}>ADD TO CART</Button>
          </AddContainer>
        </InfoContainer>
      </SingleProductWrapper>
      <NewLetter />
      <Footer />
    </Container>
  )
}

export default SingleProductPage
