import React, { Component } from "react";

let gridBuilder = [];
for (let i = 1; i <= 9; i++) {
  gridBuilder.push(i);
}

let winnersMove = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];

class Main extends Component {
  constructor() {
    super();
    this.state = {
      nextPlayer: "X",
      history: { X: [], O: [] },
      movesLeft: 9,
      status: "Player 'X' Move",
      winner: false,
    };
  }

  calculateWinner = (player) => {
    const { history, winner, movesLeft } = this.state;

    return winnersMove.map((move) => {
      const [a, b, c] = move;

      if (
        history[player].includes(a) &&
        history[player].includes(b) &&
        history[player].includes(c)
      ) {
        return this.setState({
          movesLeft: 0,
          status: `Player ${player} Wins`,
          winner: true,
        });
      } else if (!winner && movesLeft == 0) {
        return this.setState({
          status: "Game Over",
        });
      }
    });
  };

  handleKeys = () => {
    const { history } = this.state;

    let allKeys = [...history.X, ...history.O];
    return allKeys;
  };

  handlePlayer = (key) => {
    const { history, nextPlayer, movesLeft } = this.state;

    // if square has not been clicked already
    if (!this.handleKeys().includes(key) && movesLeft > 0) {
      // on "O" turn
      if (nextPlayer === "O") {
        let tempHistory = history;
        tempHistory.O.push(key);

        this.setState({
          nextPlayer: "X",
          history: tempHistory,
          movesLeft: movesLeft - 1,
          status: "Player 'X' Move",
        });

        return this.calculateWinner("O");
      }

      // on "X" turn
      else if (nextPlayer === "X") {
        let tempHistory = history;
        tempHistory.X.push(key);

        this.setState({
          nextPlayer: "O",
          history: tempHistory,
          movesLeft: movesLeft - 1,
          status: "Player 'O' Move",
        });

        return this.calculateWinner("X");
      }
    }

    return;
  };

  render() {
    const { history, status } = this.state;

    return (
      <>
        <h2 className="status">{status}</h2>
        <main className="main grid">
          <section className="grid-container">
            <div className="boxes grid">
              {gridBuilder.map((grid) => {
                return (
                  <div
                    className="box"
                    key={grid}
                    onClick={() => this.handlePlayer(grid)}
                  >
                    {this.handleKeys().length > 0 &&
                      history.X.includes(grid) && <strong>X</strong>}

                    {this.handleKeys().length > 0 &&
                      history.O.includes(grid) && <strong>O</strong>}
                  </div>
                );
              })}
            </div>
          </section>
          <section className="moves"></section>
        </main>
      </>
    );
  }
}

export default Main;
