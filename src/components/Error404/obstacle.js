import React, { Component } from 'react';
import styled from 'styled-components'
const Pipe = styled.div`
  background-color: green;
  height: 50%;
  position: absolute;
  transition: left 0.2s;
`
export class Obstacle extends Component {
  render () {
    const style = {
      left: `${this.props.left}px`,
      width: `${this.props.width}px`
    }
    if (this.props.onTop) {
      style.top = '0'
    } else {
      style.bottom = '0'
    }
    return <Pipe {...this.props} style={style} />
  }
}
export default Obstacle
