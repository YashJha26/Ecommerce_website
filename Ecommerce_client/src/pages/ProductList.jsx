import React from 'react'
import styled from 'styled-components'
import Navbar from '../components/navbar'
import Announcement from '../components/Announcement'
import Products from '../components/Products'
import NewLetter from '../components/NewLetter'
import Footer from '../components/Footer'
import { mobile } from '../responsive';
import { useLocation } from 'react-router-dom'
const Container=styled.div`

`
const Title=styled.h1`
  margin:20;
`
const FilterContainer=styled.div`
  display:flex;
  justify-content:space-between;
`
const Filter=styled.div`
  margin:20;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`
const FilterText=styled.span`
  font-size:20px;
  font-weight:600;
  margin-right:10px
  ${mobile({ marginRight: "0px" })}
`
const Select=styled.select`
  padding:10px;
  ${mobile({ margin: "10px 0px" })}
`
const Option=styled.option`

`
const ProductList = () => {
  const location = useLocation();
  //console.log(location.pathname);
  const cat=location.pathname.split("/")[2];
  const [filters,setFilter]=React.useState({});
  const [sortCriteria,setSortCriteria]=React.useState("Newest")

  const handleChangeFilters = (event) =>{
      //console.log(event.target.value);
      setFilter({
        ...filters,
        [event.target.name]:event.target.value
      })
  }
  return (
    <Container>
      <Navbar />
      <Announcement />
      <Title>props.cat</Title> 
      <FilterContainer>
        <Filter><FilterText>Filter Products:</FilterText>
          <Select name="color" onChange={handleChangeFilters}>
            <Option disabled >Color</Option>
            <Option>White</Option>
            <Option>Red</Option>
            <Option>Green</Option>
            <Option>Yellow</Option>
            <Option>Blue</Option>
            <Option>Black</Option>
          </Select>
          <Select name="size" onChange={handleChangeFilters}>
            <Option disabled >Size</Option>
            <Option>S</Option>
            <Option>M</Option>
            <Option>L</Option>
            <Option>XL</Option>
            <Option>XXl</Option>
          </Select>
        </Filter>
        <Filter><FilterText>Sort Products:</FilterText>
          <Select onChange={(event)=>{setSortCriteria(event.target.value)}}>
            <Option >Newest</Option>
            <Option value="Asc">Price (Asc)</Option>
            <Option value="Dsc">Price (Desc)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products cat={cat} filters={filters} sortCriteria={sortCriteria}/>
      <NewLetter />
      <Footer />
    </Container>
  )
}

export default ProductList
