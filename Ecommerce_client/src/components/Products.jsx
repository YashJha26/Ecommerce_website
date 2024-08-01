import styled from "styled-components";
import {popularProducts} from "../Data";
import SingleProduct from "./SingleProduct";
import React from 'react'
import axios from 'axios'
const Container=styled.div`
  padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`
const base_URL="https://ecommerce-website-backend-5fvc.onrender.com/api"
const Products = (props) => {
  const [products,setProducts]=React.useState([]);
  const [filteredProducts,setFilteredProducts]=React.useState([]);
  //console.log(props.cat,props.filters,props.sortCriteria)

  React.useEffect(()=>{
    const getProducts = async () =>{
      try {
        const res = await axios.get(props.cat?`${base_URL}/product?category=${props.cat}`:`${base_URL}/product`);
        setProducts(res.data);
      } catch (error) {
        
      }
    }
    getProducts();
  },[props.cat])

  React.useEffect(() => {
    props.cat &&
      setFilteredProducts(
        products.filter((item) =>
          Object.entries(props.filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
   
  }, [products, props.cat, props.filters]);

  React.useEffect(()=>{
    //console.log(props.sortCriteria);
    if(props.sortCriteria==="Newest"){
      setFilteredProducts(
        (prev) => {
          return [...prev].sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
          });
        }
      )
    }else if(props.sortCriteria==="Asc"){
      setFilteredProducts(
        (prev) => {
          return [...prev].sort((a, b) => {
            return (a.price - b.price);
          });
        }
      )
    }else{
      setFilteredProducts(
        (prev) => {
          return [...prev].sort((a, b) => {
            return (b.price - a.price);
          });
        }
      )
    }
  },[props.sortCriteria])

  return (
    <Container>
      {
        props.cat
        ?filteredProducts.map((item)=>{return <SingleProduct img={item.img} key={item.id} id={item._id} color={item.color} size={item.size} />})
        :products.slice(0,8).map((item)=>{return <SingleProduct img={item.img} key={item.id} id={item._id}  color={item.color} size={item.size} />})
      }
    </Container>
  )
}

export default Products
