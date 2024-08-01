import React from 'react'
import styled from 'styled-components'
import {categories} from '../Data'
import CatagorieItems from './CatagorieItems'
import { mobile } from '../responsive';
const Container= styled.div`
  display:flex;
  padding:20px;
  justify-content: space-between;
  ${mobile({ padding: "0px", flexDirection:"column" })}
`
const Catagories = () => {
  return (
    <Container>
     {categories.map((item)=>{
        return <CatagorieItems img={item.img} title={item.title} cat={item.cat} key={item.id}/>
      })}
    </Container>
  )
}

export default Catagories
