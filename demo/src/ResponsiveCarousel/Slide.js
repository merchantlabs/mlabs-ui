import React from 'react'
import styled from 'styled-components'

export default ({ title, text }) => (
  <Container>
    <Heading>{title}</Heading>
    <Divider />
    <Paragraph>{text}</Paragraph>
  </Container>
)

const Container = styled.div`
  margin: 15px;
  padding: 0 30px 20px;
  width: 310px;
  height: 350px;
  border-radius: 7px 7px 5px 5px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  transition: 0.5s;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
  background-color: white;
`
const Divider = styled.div`
  min-width: 60px;
  min-height: 6px;
  margin: 20px 0;
  fill: #ccc;
`
const Heading = styled.h2`
  font-size: 22pt;
  letter-spacing: -1px;
  text-align: center;
`
const Paragraph = styled.p`
  margin-bottom: 15px;
  text-align: center;
  font-size: 14pt;
  line-height: 18pt;
`
