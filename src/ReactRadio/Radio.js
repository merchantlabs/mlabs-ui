import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

export class Radio extends Component {
  static contextTypes = {
    radioGroup: PropTypes.object
  }

  render() {
    const labelText = unCamelProperCase(this.props.value)
    const { name, selectedValue, onChange } = this.context.radioGroup
    const optional = {}
    if (selectedValue !== undefined) {
      optional.checked = this.props.value === selectedValue
    }
    if (typeof onChange === 'function') {
      optional.onChange = onChange.bind(null, this.props.value)
    }

    return (
      <Label>
        <input {...this.props} type="radio" name={name} {...optional} />
        {labelText}
      </Label>
    )
  }
}

const Label = styled.label`
  display: flex;
  align-items: center;
  font-family: ${props => props.theme.bodyFont};
  font-size: 14pt;
  color: ${props => props.theme.secondaryColor};
`

function unCamelProperCase(str) {
  str = str.replace(/([a-z\xE0-\xFF])([A-Z\xC0\xDF])/g, '$1 $2')
  str = str.toLowerCase() //add space between camelCase text
  return str.replace(/^\w|\s\w/g, str => str.toUpperCase())
}
