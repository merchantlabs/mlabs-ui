import React from 'react'
import styled from 'styled-components'

export default ({ title, subTitle, buttonText, path }) => (
  <Container>
    <Title>{title}</Title>
    <SubTitle>{subTitle}</SubTitle>
    {buttonText ? <Button to={path}>{buttonText}</Button> : null}
  </Container>
)
const Container = styled.div`
  margin: 0 auto 50px;
  width: 65%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  @media (max-width: 950px) {
    width: 100%;
    margin: 0 auto 15px;
  }
`
const Title = styled.h1`
  margin: 0 auto 10px;
  width: 100%;
  color: white;
  font-size: 58pt;
  text-align: center;
  font-weight: 700;
  font-family: sans-serif;
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  letter-spacing: -3px;
  line-height: 50pt;

  @media (max-width: 950px) {
    font-size: 35pt;
    line-height: 30pt;
    width: 80%;
  }
`
const SubTitle = styled.h1`
  margin: 10px auto 15px;
  font-size: 30pt;
  width: 100%;
  color: #40DDDF;
  font-family: sans-serif;
  font-weight: 600;
  text-align: center;
  font-style: italic;
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.3);

  @media (max-width: 950px) {
    font-size: 22pt;
    width: 80%;
  }
`
const Button = styled.a`
  margin: 20px auto;
  padding: 25px 35px;
  color: white;
  font-size: 14pt;
  font-family: sans-serif;
  font-weight: 600;
  line-height: 0;
  border-radius: 5px;
  background-color: #40DDDF;
  transition: 0.5s;

  &:hover {
    color: #40DDDF;
    background: white;
    box-shadow: 0 0 10px 5px rgba(28, 27, 71, 0.3);
  }
`
