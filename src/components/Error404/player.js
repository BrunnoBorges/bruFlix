import React, { Component } from 'react';
import styled, {keyframes} from 'styled-components';
import luigi from '../../assets/img/luigi.png'

const gentlyRock = keyframes`
	0% {transform:rotate(4deg);}
	50% {transform:rotate(-4deg);}
	100% {transform:rotate(4deg);}
`
const dead = keyframes`
	0% {transform:rotate(0);}
	50% {transform:rotate(180deg);}
	100% {transform:rotate(360deg);}

`
const StyledImg = styled.img`
  width: 100px;
  height: 100px;
  position: ${(props) => (props.running || props.gameOver) ? 'absolute' : 'relative' };
  left: 0;
  transition: top 0.2s;
  z-index: 2;
  animation: ${/(props) => props.gameOver ? `${dead}  linear 0.5s infinite` : ` ${gentlyRock} linear 0.4s infinite;`/ };

`
export class Player extends Component {
  render () {
    const svg = ``
    return (
      <StyledImg 
        {...this.props}
src={luigi} alt="luigi" />
    )
  }
}
export default Player