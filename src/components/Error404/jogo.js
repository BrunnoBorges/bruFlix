
import React, { Component } from 'react';
import { render } from 'react-dom';
import Brackground from './background'
import Player from './player'
import Obstacle from './obstacle'
import BgMusic from './bgMusic'
import Hud from './hud'

const SPACE_KEY_CODE = 32
const FALL_STEP = 20
const JUMP_STEP = FALL_STEP * 5
const DROP_STEP = FALL_STEP * 6
const INITIAL_TOP = 100
const INITIAL_LEFT = 10
const INITIAL_OBSTACLE_STEP = 30
const PLAYER_HEIGHT = 100
const PLAYER_WIDTH = 100
const OBSTACLE_MIN_DISTANCE = 300
const OBSTACLE_MAX_DISTANCE = 900
const NEW_OBSTACLES_TIME = 1500
const OBSTACLE_WIDTH = 100
const INTERVAL_TIME = 150
const POINTS_PER_OBSTACLE = 15
const OBSTACLES_PER_INDEX = 5

class Jogo404 extends Component {
  constructor(props) {
    super(props)
    this.listenToKey = this._listenToKey.bind(this)
    this.onMuteToogle = this._onMuteToogle.bind(this)
    this.onInterval = this._onInterval.bind(this)

    this.state = {
      top: 0,
      level: 0,
      running: false,
      gameOver: false,
      obstacles: [],
      score: 0,
      mute: false
    }
  }
  componentDidMount() {
    document.addEventListener('keydown', this.listenToKey)
  }
  _onMuteToogle(mute) {
    this.setState({ mute })
  }
  _createObstacle(lastLeft, index) {
    const leftDiff = Math.floor(Math.random() * OBSTACLE_MAX_DISTANCE) + OBSTACLE_MIN_DISTANCE
    return {
      onTop: Math.random() >= 0.5,
      left: lastLeft + OBSTACLE_MIN_DISTANCE,
      index
    }
  }
  _resetControls () {
    this._controls = {
      right: 0,
      up: 0,
      down: 0
    }
  }
  _onInterval () {
    const now = Date.now()
    this.setState((oldState) => {
      let { score, level, lastLeft, obstacleIndex } = oldState
      const { right, up, down } = this._controls
      this._resetControls()
      let obstacleSpeed = INITIAL_OBSTACLE_STEP + INITIAL_OBSTACLE_STEP * (0.2) * level
      if (right) {
        obstacleSpeed *= 1 * 6 * Math.min(right, 2)
      }
      let top = oldState.top + FALL_STEP
      if (up) {
        top -= JUMP_STEP * up
      }
      if (down) {
        top += DROP_STEP * down
      }
      
      if (now - this._lastNewObstacles >= NEW_OBSTACLES_TIME) {
        this._lastNewObstacles = now
        const numOfObstacles = oldState.obstacles.length
        if (numOfObstacles) {
          lastLeft = oldState.obstacles[numOfObstacles - 1].left - INITIAL_OBSTACLE_STEP
          if (lastLeft <= INITIAL_LEFT + PLAYER_WIDTH + OBSTACLE_MIN_DISTANCE) {
            lastLeft = INITIAL_LEFT + PLAYER_WIDTH * 3
          }

        } else {
          lastLeft = INITIAL_OBSTACLE_STEP
        }

        for (let i = 0; i < 2; i++) {
          const newObstacle = this._createObstacle(lastLeft, obstacleIndex++, level)
          if (obstacleIndex % OBSTACLES_PER_INDEX === 0) {
            // level++
          }
          lastLeft = newObstacle.left
          oldState.obstacles.push(newObstacle)
        }
      }
      
      if (this._checkIfHit(top)) {
        if (top >= (this._wrapper.offsetHeight - PLAYER_HEIGHT)) {
          top = this._wrapper.offsetHeight - PLAYER_HEIGHT
        } else if (top <= 0) {
          top = 0
        }
        return { ...this._gameOver(), top }
      }
      const obstacles = []
      let hasCollidedWithObstacle = false
      oldState.obstacles.forEach((o) => {
        if (o.left >= OBSTACLE_WIDTH * -1) {
          const newLeft = o.left - obstacleSpeed
          if (INITIAL_LEFT >= (newLeft + OBSTACLE_WIDTH)) {
            o.scored = true
            score += POINTS_PER_OBSTACLE
          }
          if (!hasCollidedWithObstacle) {
            hasCollidedWithObstacle = this._checkColision(INITIAL_LEFT, top, o, newLeft)
          }
          o.left = newLeft
          obstacles.push(o)
        } else if (!o.scored) {
          score += POINTS_PER_OBSTACLE
        }
      })
      if (hasCollidedWithObstacle) {
        return { ...this._gameOver(), top, obstacles, score, obstacleIndex: 0 }
      }
      return { top, obstacles, score, level, lastLeft, obstacleIndex }
    })
  }
  _startGame() {
    let lastLeft = INITIAL_LEFT + PLAYER_WIDTH * 3
    let obstacles = []
    let obstacleIndex = 0
    this._controls = {
      right: 0,
      up: 0,
      down: 0
    }
    for (let i = 0; i < 2; i++) {
      const newObstacle = this._createObstacle(lastLeft, obstacleIndex++)
      lastLeft = newObstacle.left
      obstacles.push(newObstacle)
    }
    this._lastNewObstacles = Date.now()
    this.setState({
      lastLeft,
      obstacleIndex,
      running: true,
      gameOver: false,
      top: ((this._wrapper.offsetHeight - PLAYER_HEIGHT) / 2),
      obstacles,
      level: 0,
      score: 0
    })
    this._intervalId = setInterval(this.onInterval, INTERVAL_TIME)
  }
  componentWillUnmount() {
    clearInterval(this._intervalId)
    document.removeEventListener('keydown', this.listenToKey)
  }
  _checkColision(playerLeft, playerTop, obstacleData, newLeft) {
    let isWithingHeight = false
    const wrapperHeight = this._wrapper.offsetHeight
    const obstacleHeight = wrapperHeight / 2
    if (obstacleData.onTop) {
      if (playerTop <= obstacleHeight) {
        isWithingHeight = true
      }
    } else {
      if ((playerTop + PLAYER_HEIGHT) >= wrapperHeight - obstacleHeight) {
        isWithingHeight = true
      }
    }
    if (!isWithingHeight) {
      return false
    }

    if (playerLeft >= newLeft &&
      (playerLeft + PLAYER_WIDTH) <= obstacleData.left + OBSTACLE_WIDTH
    ) {
      return true
    }
    return false
  }
  _gameOver() {
    clearInterval(this._intervalId)
    return { gameOver: true, running: false }
  }
  _checkIfHit(top) {
    if (top >= this._wrapper.offsetHeight || top <= 0) {
      return true
    }
    return false
  }
  _listenToKey(ev) {
    if (ev.code === 'Enter') {
      if (!this.state.running) {
        this._startGame()
      }
    }
    if (this.state.running) {
      if (ev.code === 'Space' || ev.code === 'ArrowUp') {
        this._controls.up++
      }
      if (ev.code === 'AltRight' || ev.code === 'ControlLeft' || ev.code === 'AltLeft' || ev.code === 'ControlRight' || ev.code === 'ArrowDown') {
        this._controls.down++
      }
      if (ev.code === 'ArrowRight') {
        this._controls.right++
      }
    }
  }
  render() {

    return (
      <div id="wrapper" ref={(c) => this._wrapper = c}>
        <BgMusic
          gameOver={this.state.gameOver}
          running={this.state.running}
          mute={this.state.mute}
        />
        <Brackground
          gameOver={this.state.gameOver}
          running={this.state.running}
        >
          <Hud
            score={this.state.score}
            mute={this.state.mute}
            onMuteToogle={this.onMuteToogle}
          />
          <Player
            running={this.state.running}
            gameOver={this.state.gameOver}
            style={{
              left: `${INITIAL_LEFT}px`,
              top: `${this.state.top}px`
            }}
            ref={(c) => { this._player = c }}
          />
          {this.state.obstacles.map((o) => (
            <Obstacle
              key={o.index}
              left={o.left}
              onTop={o.onTop}
              width={OBSTACLE_WIDTH}
            />
          ))}
        </Brackground>
      </div>
    )
  }
}

export default Jogo404;

// render(<App />, document.getElementById('root'));
