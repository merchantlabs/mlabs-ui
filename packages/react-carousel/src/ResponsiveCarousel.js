import React, { useRef} from 'react'
import PropTypes from 'prop-types'

import Carousel from './Carousel'
import useContentRect from './useContentRect'

const ResponsiveCarousel = ({ breakpoints, slides, ...restProps }) => {
  const ref = useRef(null)
  const { width } = useContentRect(ref)

  const count = breakpoints.reduce((acc, breakpoint) => {
    return width > breakpoint.width ? breakpoint.items : acc
  }, 1)

  const chunkedSlides = slides.reduce((acc, slide, index, arr) => {
    return index % count === 0
      ? acc.concat([arr.slice(index, index + count)])
      : acc
  }, [])


  return (
    <Carousel
      ref={ref}
      slides={chunkedSlides}
      {...restProps}
    />
  )
}

ResponsiveCarousel.propTypes = {
  slides: PropTypes.array.isRequired,
  breakpoints: PropTypes.arrayOf(PropTypes.shape({
    width: PropTypes.number,
    items: PropTypes.number
  })).isRequired,
  ...Carousel.propTypes
}

export default ResponsiveCarousel
