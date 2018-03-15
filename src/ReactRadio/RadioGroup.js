import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class RadioGroup extends Component {
  static propTypes = {
    name: PropTypes.string,
    selectedValue: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.bool
    ]),
    onChange: PropTypes.func,
    children: PropTypes.node.isRequired,
    Component: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
      PropTypes.object
    ])
  }

  static defaultProps = {
    Component: 'div'
  }

  static childContextTypes = {
    radioGroup: PropTypes.object
  }

  getChildContext() {
    const { name, selectedValue, onChange } = this.props
    return {
      radioGroup: {
        name,
        selectedValue,
        onChange
      }
    }
  }

  render() {
    const {
      Component,
      name,
      selectedValue,
      onChange,
      children,
      ...rest
    } = this.props
    return <Component {...rest}>{children}</Component>
  }
}
