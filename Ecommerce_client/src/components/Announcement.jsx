import React from 'react'
import styled from 'styled-components'

const Container=styled.div`
    height:30px;
    background-color:teal;
    color:white;
    display: flex;
    align-items:center;
    justify-content:center;
`
const Announcement = () => {
  return (
    <Container>
      Free dilvery for orders above ₹400
    </Container>
  )
}

export default Announcement
