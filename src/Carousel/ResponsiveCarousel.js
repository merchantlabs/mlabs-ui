import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Carousel from './Carousel'

export default class ResponsiveCarousel extends Component {
  static propTypes = {
    slides: PropTypes.array.isRequired,
    breakpoints: PropTypes.array.isRequired,
    ...Carousel.propTypes
  }

  constructor(props) {
    super(props)

    this.state = {
      itemCount: 1,
      chunkedSlides: this._chunkArray(props.slides, 1)
    }
  }

  componentWillMount() {
    if (typeof window !== 'object') return

    window.addEventListener('resize', this.updateMatches)
    this.updateMatches()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateMatches)
  }

  _chunkArray(array, size) {
    return array.reduce((acc, item, index, arr) => {
      return index % size === 0
        ? acc.concat([arr.slice(index, index + size)])
        : acc
    }, [])
  }

  updateMatches = () => {
    const { itemCount } = this.state
    const { breakpoints, slides } = this.props

    const count = breakpoints.reduce((acc, item) => {
      return window.innerWidth > item.width ? item.items : acc
    }, 1)

    if (itemCount !== count) {
      this.setState({
        itemCount: count,
        chunkedSlides: this._chunkArray(slides, count)
      })
    }
  }

  render() {
    const { chunkedSlides } = this.state
    const { breakpoints, slides, ...restProps } = this.props
    return <Carousel slides={chunkedSlides} {...restProps} />
  }
}
