import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import SwipeableViews from 'react-swipeable-views'
import { autoPlay, virtualize } from 'react-swipeable-views-utils'
import { mod } from 'react-swipeable-views-core'

const SwipeableView = autoPlay(virtualize(SwipeableViews))

export default class Slider extends Component {
  static propTypes = {
    slides: PropTypes.array.isRequired,
    slideRenderer: PropTypes.func.isRequired,
    dotComponent: PropTypes.func,
    buttonComponent: PropTypes.func,
    interval: PropTypes.number,
    className: PropTypes.string,
    autoPlay: PropTypes.string,
  }

  static defaultProps = {
    interval: 5000
  }

  state = {
    auto: true,
    activeIndex: 0,
    infiniteIndex: 0,
    pageVisibility: 'visible'
  }

  componentDidMount() {
    if(typeof window !== 'undefined') {
      document.addEventListener('visibilitychange', this._onPageVisibilityChange)
    }
  }

  componentWillUnmount() {
    if(typeof window !== 'undefined') {
      document.removeEventListener('visibilitychange', this._onPageVisibilityChange)
    }
  }

  onChangeIndex = (index, indexLatest, meta) => {
    const { slides } = this.props
    this.setState({
      activeIndex: mod(index, slides.length),
      infiniteIndex: index
    })
  }

  onMouseEnter = () => this.setState({ auto: false })
  onMouseLeave = () => this.setState({ auto: true })

  _moveLeft = () => {
    const { infiniteIndex } = this.state
    const { slides } = this.props
    this.setState({
      infiniteIndex: infiniteIndex - 1,
      activeIndex: mod(infiniteIndex - 1, slides.length)
    })
  }

  _moveRight = () => {
    const { infiniteIndex } = this.state
    const { slides } = this.props
    this.setState({
      infiniteIndex: infiniteIndex + 1,
      activeIndex: mod(infiniteIndex + 1, slides.length)
    })
  }

  _slideToIndex = index => {
    const { activeIndex, infiniteIndex } = this.state
    this.setState({
      infiniteIndex: infiniteIndex + (index - activeIndex),
      activeIndex: index
    })
  }

  _onPageVisibilityChange = () => {
    this.setState({
      pageVisibility: document.visibilityState
    })
  }

  _renderSlides = ({ index, key }) => {
    const { slideRenderer, slides, className } = this.props
    const slideData = slides[mod(index, slides.length)]
    return (
      <div key={key} className={className}>
        {slideRenderer(slideData)}
      </div>
    )
  }

  render() {
    const { auto, activeIndex, infiniteIndex, pageVisibility } = this.state
    const {
      slides,
      interval,
      dotComponent: Dot,
      buttonComponent: Button,
      innerRef
    } = this.props

    return (
      <CarouselContainer innerRef={innerRef}>
        <SlideContainer>
          <SwipeableView
            onMouseEnter={this.onMouseEnter}
            onMouseLeave={this.onMouseLeave}
            onChangeIndex={this.onChangeIndex}
            index={infiniteIndex}
            autoplay={auto && slides.length > 1 && pageVisibility === 'visible' }
            interval={interval}
            springConfig={{
              duration: '.8s',
              easeFunction: 'cubic-bezier(0.15, 0.3, 0.25, 1)',
              delay: '0s'
            }}
            slideRenderer={this._renderSlides}
          />
        </SlideContainer>
        {Button &&
          slides.length !== 1 && (
            <ButtonContainer>
              <Button onClick={this._moveLeft} left />
              <Button onClick={this._moveRight} right />
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
                    onClick={() => this._slideToIndex(i)}
                  />
                )
              })}
            </DotsContainer>
          )}
      </CarouselContainer>
    )
  }
}

const CarouselContainer = styled.div`
  margin: 0 auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
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
const SlideContainer = styled.div`
  margin: 0 auto;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`
