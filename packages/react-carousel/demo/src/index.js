import React, {Component} from 'react'
import {render} from 'react-dom'

import theme, { GlobalStyle } from './theme'
import Example from '../../src'
import Carousel from './Carousel'
import ResponsiveCarousel from './ResponsiveCarousel'

class Demo extends Component {
  render() {
    return <div>
      <GlobalStyle />
      <Carousel />
      <ResponsiveCarousel />
    </div>
  }
}

render(<Demo/>, document.querySelector('#demo'))
