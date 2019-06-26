import React, { useState, useEffect, forwardRef } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import SwipeableViews from 'react-swipeable-views'
import { autoPlay, virtualize } from 'react-swipeable-views-utils'
import { mod } from 'react-swipeable-views-core'

const SwipeableView = autoPlay(virtualize(SwipeableViews))

const Slider = forwardRef(({
  slides,
  interval,
  slideRenderer,
  dotComponent: Dot,
  buttonComponent: Button,
  className
}, ref) => {

  const [auto, setAuto] = useState(true)
  const [activeIndex, setActiveIndex] = useState(0)
  const [infiniteIndex, setInfiniteIndex] = useState(0)
  const [pageIsVisible, setPageIsVisible] = useState(true)

  useEffect(() => {
    if(typeof window === 'undefined') return
    function handlePageVisibilityChange() {
      setPageIsVisible(document.visibilityState === 'visible')
    }
    document.addEventListener('visibilitychange', handlePageVisibilityChange)
    return () => {
      document.removeEventListener('visibilitychange', handlePageVisibilityChange)
    }
  })

  function onChangeIndex(index, indexLatest, meta) {
    setActiveIndex(mod(index, indexLatest))
    setInfiniteIndex(index)
  }

  function onMouseEnter() {
    setAuto(false)
  }

  function onMouseLeave() {
    setAuto(true)
  }

  function moveLeft() {
    setActiveIndex(mod(infiniteIndex - 1, slides.length))
    setInfiniteIndex(infiniteIndex - 1)
  }

  function moveRight() {
    setActiveIndex(mod(infiniteIndex + 1, slides.length))
    setInfiniteIndex(infiniteIndex + 1)
  }

  function slideToIndex(index) {
    setActiveIndex(index)
    setInfiniteIndex(infiniteIndex + (index - activeIndex))
  }

  function renderSlides({ index, key }) {
    const slideData = slides[mod(index, slides.length)]
    return (
      <div key={key} className={className}>
        {slideRenderer(slideData)}
      </div>
    )
  }

  return (
    <CarouselContainer ref={ref}>
      <SlideContainer>
        <SwipeableView
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onChangeIndex={onChangeIndex}
          index={infiniteIndex}
          autoplay={auto && slides.length > 1 && pageIsVisible }
          interval={interval}
          springConfig={{
            duration: '.8s',
            easeFunction: 'cubic-bezier(0.15, 0.3, 0.25, 1)',
            delay: '0s'
          }}
          slideRenderer={renderSlides}
        />
      </SlideContainer>
      {Button &&
        slides.length !== 1 && (
          <ButtonContainer>
            <Button onClick={moveLeft} left />
            <Button onClick={moveRight} right />
          </ButtonContainer>
        )}
      {Dot &&
        slides.length > 1 && (
          <DotsContainer>
            {slides.map((slide, i) => {
              let isActive = i === activeIndex
              return (
                <Dot
                  key={i}
                  isActive={isActive}
                  onClick={() => slideToIndex(i)}
                />
              )
            })}
          </DotsContainer>
        )}
    </CarouselContainer>
  )
})

Slider.propTypes = {
  slides: PropTypes.array.isRequired,
  slideRenderer: PropTypes.func.isRequired,
  dotComponent: PropTypes.object,
  buttonComponent: PropTypes.object,
  interval: PropTypes.number,
  className: PropTypes.string,
  autoPlay: PropTypes.bool
}

Slider.defaultProps = {
  interval: 5000
}

export default Slider

const CarouselContainer = styled.div`
  margin: 0 auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`
const SlideContainer = styled.div`
  margin: 0 auto;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`
const DotsContainer = styled.ul`
  margin: 0 auto;
  padding: 25px 0 0;
  position: relative;
`
const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  top: 40%;
`
