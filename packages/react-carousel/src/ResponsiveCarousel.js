import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ResizeObserver from 'resize-observer-polyfill'
import Carousel from './Carousel'

export default class ResponsiveCarousel extends Component {
  static propTypes = {
    slides: PropTypes.array.isRequired,
    breakpoints: PropTypes.array.isRequired,
    ...Carousel.propTypes
  }

  constructor(props) {
    super(props)

    this.state = { itemCount: 1 }
    this.carouselContainer = null
  }

  componentDidMount() {
    if(typeof window !== 'undefined') {
      this.updateMatches()
      this.observer = new ResizeObserver(() => this.updateMatches())
      this.observer.observe(this.carouselContainer)
      window.addEventListener('resize', this.updateMatches)
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateMatches)
    this.observer.disconnect()
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
    const { breakpoints } = this.props

    let carouselSize = 0

    if(this.carouselContainer) {
      carouselSize = this.carouselContainer.getBoundingClientRect().width
    }

    const count = breakpoints.reduce((acc, item) => {
      return carouselSize > item.width ? item.items : acc
    }, 1)

    if (itemCount !== count) {
      this.setState({ itemCount: count })
    }
  }

  render() {
    const { itemCount } = this.state
    const { breakpoints, slides, ...restProps } = this.props

    const chunkedSlides = this._chunkArray(slides, itemCount)

    return (
      <Carousel
        innerRef={x => this.carouselContainer = x}
        slides={chunkedSlides}
        {...restProps}
      />
    )
  }
}
