import React, { Component } from "react";
import './hangman.css'
import { randomWord } from "./words.js";

import def from "./images/default.PNG"
import img0 from "./images/0.jpg"
import img1 from "./images/1.jpg"
import img2 from "./images/2.PNG"
import img3 from "./images/3.PNG"
import img4 from "./images/4.PNG"
import img5 from "./images/5.PNG"

class Hangman extends Component {
    static defaultProps = {
        maxWrong: 6,
        images: [def, img0, img1, img2, img3, img4, img5],
    }

    constructor(props) {
        super(props);
        this.state = {
            mistake: 0,
            guessed: new Set([]),
            answer: randomWord(),
        }
    }

    handleGuess = e => {
        let letter = e.target.value;
        this.setState(st => ({
            guessed: st.guessed.add(letter),
            mistake: st.mistake + (st.answer.includes(letter) ? 0 : 1)
        }));
    }

    guessedWord() {
        return this.state.answer.split("").map(letter => (this.state.guessed.has(letter) ? letter : " _ "))
    }

    generateButtons() {
        return "abcdefghijklmnopqrstuvwxyz".split("").map(letter => (
            <button
                className="letterBtn"
                key={letter}
                value={letter}
                onClick={this.handleGuess}
                disabled={this.state.guessed.has(letter)}
            >
                {letter}
            </button>
        ))
    }

    resetButton = () => {
        this.setState({
            mistake: 6,
            guessed: new Set([]),
            answer: randomWord()
        });
    }


    render() {
        const gameOver = this.state.mistake >= this.props.maxWrong;
        const isWinner = this.guessedWord().join('') === this.state.answer;
        let gameStat = this.generateButtons();
        if (isWinner) {
            gameStat = 'You Win!'
        }

        if (gameOver) {
            gameStat = 'You Lost '
        }

        return (
            <div className="Hangman container">
                <h1 className="hangmanText">Hangman Game</h1>
                <button className="resetBtn" onClick={this.resetButton}>Reset</button>
                {/* кол-во не правельных ответов в  Hangman */}
                <div className="worddStr">Wrong Answers: {this.state.mistake} of {this.props.maxWrong}</div>
                {/* изображения Hangman */}
                <div>
                    <img className="hangmanImg" src={this.props.images[this.state.mistake]} alt="image" />
                </div>
                {/* Guess the word*/}
                <div>
                    <p className="correctAns">
                        {!gameOver ? this.guessedWord() : this.state.answer}
                    </p>
                    <p>{gameStat}</p>

                </div>


            </div>
        )
    }
}

export default Hangman;