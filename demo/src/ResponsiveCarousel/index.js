import React from 'react'
import styled from 'styled-components'
import { ResponsiveCarousel } from '../../../src'
import Slide from './Slide'

const config = [
  { width: 0, items: 1 },
  { width: 700, items: 2 },
  { width: 1200, items: 4 }
]

const slides = [
  {
    title: 'Scalable',
    text: 'Ship 1 order or 1000. Our experienced team will meet your fulfillment demands.',
  },
  {
    title: 'Personalized',
    text: 'Dynamic services personalized to exactly what you need. Nothing more, nothing less.',
  },
  {
    title: 'Flexible',
    text: 'Pay for your space when you need it. No long term lease necessary.',
  },
  {
    title: 'Transparent',
    text: 'No hidden fees. Pay for only those services outlined within our agreement.',
  }
]

export default () => (
  <Container>
    <Carousel
      breakpoints={config}
      slides={slides}
      interval={8000}
      buttonComponent={ButtonComponent}
      dotComponent={Dot}
      slideRenderer={cards =>
        cards.map((slideProps, i) => <Slide key={i} {...slideProps} />)
      }
    />
  </Container>
)

const Container = styled.div`
  padding: 0 0 90px;
  background-color: #f5f5f5;
  margin: 200px 0;
`
const Carousel = styled(ResponsiveCarousel)`
  margin: 0;
  padding: 30px 0 0;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background-color: #f5f5f5;
`
const ButtonComponent = styled(ResponsiveCarousel.Button)`
  height: 60px;
  width: 60px;
  padding: 0 10px;
  cursor: pointer;
  display: flex;
  padding-top: 10px;
  justify-content: center;
  align-items: center;
  font-size: 60px;
  color: ${props => props.theme.primaryColor};
  background: blue;

  &:hover {
    background: ${props => props.theme.primaryColor};
    color: white;
  }
`
const Dot = styled(ResponsiveCarousel.Dot)`
  border: 1px solid ${props => props.theme.primaryColor};
  background-color: ${props =>
    props.isActive ? 'blue' : 'transparent'};
  height: 12px;
  width: 12px;
`
