import React, { Component, Children } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import SwipeableView from 'react-swipeable-views'

export default class Carousel extends Component {
  static propTypes = {
    dotComponent: PropTypes.func,
    buttonComponent: PropTypes.func,
    className: PropTypes.string,
  }

  state = { activeIndex: 0 }

  onChangeIndex = (index, indexLatest, meta) => {
    this.setState({
      activeIndex: index
    })
  }

  _moveLeft = () => {
    const { activeIndex } = this.state
    const nextIndex = activeIndex - 1
    this.setState({
      activeIndex: nextIndex < 0 ? activeIndex : nextIndex
    })
  }

  _moveRight = () => {
    const { activeIndex } = this.state
    const { children } = this.props
    const nextIndex = activeIndex + 1
    const length = Children.count(children)
    this.setState({
      activeIndex: nextIndex + 1 > length ? activeIndex : nextIndex
    })
  }

  _slideToIndex = index => {
    this.setState({
      activeIndex: index
    })
  }

  render() {
    const { activeIndex } = this.state
    const {
      dotComponent: Dot,
      buttonComponent: Button,
      innerRef,
      children
    } = this.props

    const slides = Children.toArray(children)

    return (
      <div ref={innerRef} style={{ position: 'relative' }}>
          <SwipeableView
            onChangeIndex={this.onChangeIndex}
            index={activeIndex}
            springConfig={{
              duration: '.8s',
              easeFunction: 'cubic-bezier(0.15, 0.3, 0.25, 1)',
              delay: '0s'
            }}
          >
            {children}
          </SwipeableView>
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
      </div>
    )
  }
}

const DotsContainer = styled.ul`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 5%;
  width: 100%;
`
const ButtonContainer = styled.div`
  position: absolute;
  display: flex;
  justify-content: space-between;
  align-items: center;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
`
