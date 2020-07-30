import React, { Component } from 'react';
import styled from 'styled-components';
import luigi from '../../assets/img/luigi.png'

const StyledImg = styled.img`
  width: 100px;
  height: 100px;
  position: ${(props) => (props.running || props.gameOver) ? 'absolute' : 'relative' };
  left: 0;
  transition: top 0.2s;
  z-index: 2;
  animation: ${2};

`
export class Player extends Component {
  render () {
    return (
      <StyledImg 
        {...this.props}
src={luigi} alt="luigi" />
    )
  }
}
export default Player