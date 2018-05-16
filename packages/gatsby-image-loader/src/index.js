import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

// Cache if we've seen an image before so we don't both with
// lazy-loading & fading in on subsequent mounts.
const imageCache = {}
const inImageCache = props => {
  // Find src
  const src = props.sizes ? props.sizes.src : props.resolutions.src

  if (imageCache[src]) {
    return true
  } else {
    imageCache[src] = true
    return false
  }
}

let io
const listeners = []

function getIO() {
  if (
    typeof io === `undefined` &&
    typeof window !== `undefined` &&
    window.IntersectionObserver
  ) {
    io = new window.IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          listeners.forEach(l => {
            if (l[0] === entry.target) {
              // Edge doesn't currently support isIntersecting, so also test for an intersectionRatio > 0
              if (entry.isIntersecting || entry.intersectionRatio > 0) {
                io.unobserve(l[0])
                l[1]()
              }
            }
          })
        })
      },
      { rootMargin: `200px` }
    )
  }

  return io
}

const listenToIntersections = (el, cb) => {
  getIO().observe(el)
  listeners.push([el, cb])
}

let isWebpSupportedCache = null
const isWebpSupported = () => {
  if (isWebpSupportedCache !== null) {
    return isWebpSupportedCache
  }

  const elem =
    typeof window !== `undefined` ? window.document.createElement(`canvas`) : {}
  if (elem.getContext && elem.getContext(`2d`)) {
    isWebpSupportedCache =
      elem.toDataURL(`image/webp`).indexOf(`data:image/webp`) === 0
  } else {
    isWebpSupportedCache = false
  }

  return isWebpSupportedCache
}

class ImageLoader extends Component {
  constructor(props) {
    super(props)

    // If this browser doesn't support the IntersectionObserver API
    // we default to start downloading the image right away.
    let isVisible = true
    let imgLoaded = true
    let IOSupported = false
    let src = null

    // If this image has already been loaded before then we can assume it's
    // already in the browser cache so it's cheap to just show directly.
    const seenBefore = inImageCache(props)

    if (
      !seenBefore &&
      typeof window !== `undefined` &&
      window.IntersectionObserver
    ) {
      isVisible = false
      imgLoaded = false
      IOSupported = true
    }

    // Always don't render image while server rendering
    if (typeof window === `undefined`) {
      isVisible = false
      imgLoaded = false
    }

    if (seenBefore) {
      src = props.sizes ? props.sizes.src : props.resolutions.src
    } else {
      src = props.sizes
        ? props.sizes.base64 || props.sizes.tracedSVG
        : props.resolutions.src || props.sizes.tracedSVG
    }

    this.state = {
      isVisible,
      imgLoaded,
      IOSupported,
      src
    }

    this.handleRef = this.handleRef.bind(this)
  }

  handleRef(ref) {
    if (this.state.IOSupported && ref) {
      listenToIntersections(ref, () => {
        this.setState({ isVisible: true, imgLoaded: false })
      })
    }
  }

  _onImageLoad = () => {
    this.setState({
      imgLoaded: true,
      src: this.img.currentSrc
    })
    this.props.onLoad && this.props.onLoad()
  }

  render() {
    const { title, alt, sizes, resolutions, children } = this.props

    if (sizes) {
      const image = sizes

      // Use webp by default if browser supports it
      if (image.srcWebp && image.srcSetWebp && isWebpSupported()) {
        image.src = image.srcWebp
        image.srcSet = image.srcSetWebp
      }

      const renderProps = {
        src: this.state.src,
        imgLoaded: this.state.imgLoaded
      }

      return (
        <Fragment>
          <div ref={this.handleRef}>
            {this.state.isVisible && (
              <img
                alt={alt}
                title={title}
                src={image.src}
                srcSet={image.srcSet}
                sizes={image.sizes}
                ref={x => (this.img = x)}
                style={{ display: 'none' }}
                onLoad={this._onImageLoad}
              />
            )}
          </div>
          {children(renderProps)}
        </Fragment>
      )
    }

    if (resolutions) {
      const image = resolutions

      // Use webp by default if browser supports it
      if (image.srcWebp && image.srcSetWebp && isWebpSupported()) {
        image.src = image.srcWebp
        image.srcSet = image.srcSetWebp
      }

      const renderProps = {
        src: this.state.src,
        imgLoaded: this.state.imgLoaded
      }

      return (
        <Fragment>
          <div ref={this.handleRef}>
            {this.state.isVisible && (
              <img
                alt={alt}
                title={title}
                src={image.src}
                srcSet={image.srcSet}
                ref={x => (this.img = x)}
                style={{ display: 'none' }}
                onLoad={this._onImageLoad}
              />
            )}
          </div>
          {children(renderProps)}
        </Fragment>
      )
    }

    return null
  }
}

ImageLoader.propTypes = {
  children: PropTypes.func.isRequired,
  sizes: PropTypes.object,
  resolutions: PropTypes.object,
  title: PropTypes.string,
  alt: PropTypes.string,
  onLoad: PropTypes.func
}

export default ImageLoader
