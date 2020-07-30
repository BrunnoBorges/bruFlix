import React, { Component } from 'react';

export class BgMusic extends Component {
  render() {
    if (this.props.mute) {
      return null
    }
    if (this.props.gameOver) {
      return (
        <audio
          key={'gameOver'}
          autoPlay
          loop
        >
          <source type={'audio/mp3'}
            src={'https://pergunteaodev.nyc3.digitaloceanspaces.com/Nevermore.mp3'} />
        </audio>
      )
    }
    if (this.props.running) {
      return (
        <audio
          key={'running'}
          autoPlay
          loop
        >
          <source type={'audio/mp3'}
            src={'https://pergunteaodev.nyc3.digitaloceanspaces.com/Surreptitious.mp3'} />
        </audio>
      )

    }
    return (
      <audio
        key={'title'}
        autoPlay
        loop
      >
        <source type={'audio/mp3'}
          src={'https://pergunteaodev.nyc3.digitaloceanspaces.com/Destiny.mp3'} />
      </audio>
    )
  }
}
export default BgMusic