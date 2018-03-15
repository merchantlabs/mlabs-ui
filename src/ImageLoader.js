import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

class ImageLoader extends Component {
  state = {
    src: null
  }

  _onImageLoad = () => {
    let src = this.img.currentSrc || this.img.src
    this.setState({ src })
  }

  componentDidMount() {
    this.img.addEventListener('load', this._onImageLoad)
  }

  componentWillUnmount() {
    this.img.removeEventListener('load', this._onImageLoad)
  }

  render() {
    const { srcSet, sizes, children } = this.props
    return (
      <Fragment>
        <img
          srcSet={srcSet}
          sizes={sizes}
          alt=" "
          ref={x => (this.img = x)}
          style={{ display: 'none' }}
        />
        {children(this.state.src)}
      </Fragment>
    )
  }
}

ImageLoader.propTypes = {
  children: PropTypes.func
}

export default ImageLoader
