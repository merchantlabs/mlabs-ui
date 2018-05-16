import styled from 'styled-components'



export const Button = styled.div`
  width: 52px;
  height: 52px;
  color: white;
  border-radius: ${props =>
    props.left ? '0px 5px 5px 0px' : '5px 0px 0px 5px'};
  background-color: rgba(18, 12, 68, 0.5);
  cursor: pointer;
  font-size: 40px;
  text-align: center;
  transition: 0.3s ease;
  left: ${props => (props.left ? 0 : 'initial')};
  right: ${props => (props.right ? 0 : 'initial')};

  &::after {
    vertical-align: middle;
    content: ${props => (props.left ? `'\\02039'` : `'\\0203A'`)};
  }

  &:hover {
    cursor: pointer;
    background-color: #40DDDF;
  }
`
