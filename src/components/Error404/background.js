import React, { Component } from 'react';
import styled from 'styled-components'
import teclado from '../../assets/img/teclado.png'

const BackGround = styled.div`
  background-color: blue;
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: absolute;
  text-align: center;
`
const GameOverText = styled.div`
  color: white;
  text-align: center;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
`
const GameOverBackground = styled(BackGround)`
  background-color: red;
`
const StartBackground = styled(BackGround)`
  background-color: green;
`
const TopGrass = styled.div`
  position: absolute;
background-image: 
        url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='30' height='10'><polygon points='0,10 5,0 10,10 15,0 20,10 25,0 30,10' fill='DarkOliveGreen ' /></svg>"),  
        url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='30' height='10'><polygon points='0,10 5,0 10,10 15,0 20,10 25,0 30,10' fill='DarkOliveGreen' transform='rotate(180, 15, 5)' /></svg>");
  background-position: left bottom, left top;
  background-size: 15vh auto;
  background-repeat: repeat-x;
  width: 100%;
  height:100%;
  z-index: 3;

`
export class Background extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showGameOver: false
    }
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.gameOver && !this.props.gameOver) {
      this._intervalId = setTimeout(() => {
        console.log('setting timeout')
        this.setState({showGameOver: true})
      }, 2000)
    }
    if (nextProps.running && !this.props.running) {
      clearInterval(this._intervalId)
      this.setState({showGameOver: false})
    }
  }
  render () {
    if (this.props.gameOver && this.state.showGameOver) {
      return (
        <GameOverBackground {...this.props}>
          <GameOverText>
            <p style={{fontSize: 30}}>Game Over!</p>
            <p>Para jogar novamente tecle (Enter)</p>
            <p>OU</p>
            <p>digite a URL correta para acessar sua página...</p>
            <p><span style={{fontSize: 100}}>&#128526;</span></p>
          </GameOverText>
        </GameOverBackground>
      )
    }
    if (!this.props.running && !this.props.gameOver) {
      return (
        <StartBackground>
          <p key={'title'} style={{fontSize: 30}}>Página nao encontrada!!!</p>
          <p style={{fontSize: 18}}>Que tal jogar um pouquinho abestado</p>
          <h4 key={'Instructions'} style={{marginTop: `10em`}}>Para iniciar tecle "ENTER"</h4>
          <div style={{display: "flex", alignItems:"flex-end", justifyContent: "center"}}>
            <h4 key={'Instructions'} style={{ marginRight: 10}}>Mova o patinho com as setas direcionas do teclado</h4>
            <img src={teclado} alt="teclado" width="100"/>
          </div>
          {this.props.children}
        </StartBackground>
      )
    }
    return (
      <BackGround {...this.props}>
        {<TopGrass />}
        {this.props.children}
      </BackGround>
    )
  }
}
export default Background
