import React, {Component} from 'react'
import {render} from 'react-dom'

import theme from './theme'
import Example from '../../src'
import Carousel from './Carousel'

class Demo extends Component {
  render() {
    return <div>
      <Carousel />
    </div>
  }
}

render(<Demo/>, document.querySelector('#demo'))
