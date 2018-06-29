import React from 'react'

import { Carousel } from '../../../src'
import Slide from './Slide'

const slides = [
  {
    title: 'Software Engineering',
    subTitle: 'for the modern web.',
    buttonText: 'LEARN MORE',
    path: '/'
  },
  {
    title: 'Technical Expertise',
    subTitle: 'Fueled by innovation.',
    buttonText: 'WORK WITH US',
    path: '/'
  },
  {
    title: 'Web App Development',
    subTitle: 'Built on modern frameworks.',
    buttonText: 'OUR DEV PROCESS',
    path: '/'
  }
]

export default () => (
  <Carousel
    buttonComponent={Carousel.Button}
    dotComponent={Carousel.Dot}
  >
    {slides.map((slide, i) => <Slide key={i} {...slide} />)}
  </Carousel>
)
