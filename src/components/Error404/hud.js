import React, { Component } from 'react';
import styled from 'styled-components'

const Container = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  padding: 3rem;
  font-size: 2rem;
  z-index: 4;
`
export class Hud extends Component {
  render () {
    return (
      <Container>
        Score: {this.props.score}
        <p onClick={() => this.props.onMuteToogle(!this.props.mute)}>{this.props.mute ? 'Unmute': 'Mute'}</p>
      </Container>
    )
  }
}
export default Hud