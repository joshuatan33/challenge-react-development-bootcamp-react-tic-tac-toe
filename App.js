import React, { Component } from 'react';
import './divStyle.css'


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      turn: 0,
      box: Array(9).fill(""),
      message: "",
      winner: false,
      winnerMes: "",
      switching: "off",
      winningCombo: [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
        [1, 5, 9],
        [3, 5, 7]
      ]
    }
  }

  reset = () => {
    this.setState({
      turn: 0,
      box: Array(9).fill(""),
      message: "",
      winner: false,
      winnerMes: "",
      switching: "off"
    })
  }

  handleClick = (e) => {
    const { turn, box } = this.state
    let clone = [...box]
    console.log(clone)
    let space = e.target
    this.setState({
      message: ''
    })
    if (this.spaceCheck(space.id)) {
      clone[space.id] = turn % 2 ? 'O' : 'X'
      console.log(turn)
      this.setState({
        box: clone,
        turn: turn + 1,
        switching: "on"
      })
    } else {
      this.setState({
        message: 'Space already occupied!'
      })
    }
  }

  spaceCheck = (space) => this.state.box[space] === ""

  winnerCheck = () => {
    const { winningCombo, box } = this.state
    winningCombo.forEach(element => {
      let combo = element.map(index => {
        return box[index - 1]
      }).join("")
      if (combo === 'OOO') {
        this.setState({
          winnerMes: 'Player O has won!',
          winner: true
        })
      } else if (combo === 'XXX') {
        this.setState({
          winnerMes: 'Player X has won!',
          winner: true
        })
      }
    })
    return null
  }

  //this switchingCheck can easily be merged as a parameter into the winnerCheck function
  //but to remind myself how the switching works, this is to be kept as a separate function
  //tl;dr: switch function is the key concept used to "trigger"
  switchingCheck = () => {
    const { switching } = this.state
    if (switching === "on") {
      this.tieCheck()
      this.winnerCheck()
      this.setState({
        switching: 'off'
      })
    }
  }

  tieCheck = () => {
    const { turn, winner } = this.state
    if (turn === 9 && winner === false) {
      this.setState({
        winnerMes: 'Good Game, It is a Draw'
      })
    }
  }



  render() {
    const { box, message, winner, winnerMes, turn } = this.state

    this.switchingCheck()

    return (
      <div >
        <header className="header">
          <h1>{message}</h1>
        </header>
        <section className="page">
          <div className={winner !== false || turn === 9 ? ("disabledDiv") : ("")}>
            {
              box.map((boxValue, index) => (
                <div id={index} key={index} className="divStyle" onClick={e => this.handleClick(e)}>
                  {boxValue}
                </div>
              )
              )
            }
          </div>
          <h1>{
            winnerMes
          }
          </h1>
          <footer>
            <button onClick={() => this.reset()} className="buttonStyle">Reset</button>
          </footer>
        </section>
      </div>
    ) // end of return
  } // end of render

}

export default App;