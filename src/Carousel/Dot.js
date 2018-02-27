import styled from 'styled-components'

export const Dot = styled.li`
  display: inline-block;
  width: 10px;
  height: 10px;
  cursor: pointer;
  border-radius: 50%;
  border: 1px solid white;
  background-color: ${props => (props.isActive ? 'white' : 'transparent')};

  &:not(:last-child) {
    margin-right: 10px;
  }
`
