import React, { useState } from "react";
import './hangman.css'
import { randomWord } from "./words.js";

import def from "./images/default.PNG"
import img0 from "./images/0.jpg"
import img1 from "./images/1.jpg"
import img2 from "./images/2.PNG"
import img3 from "./images/3.PNG"
import img4 from "./images/4.PNG"
import img5 from "./images/5.PNG"

const Hangman = () => {
    const [mistake, setMistake] = useState(0);
    const [guessed, setGuessed] = useState(new Set([]));
    const [answer, setAnswer] = useState(randomWord());


    const handleGuess = (letter) => {
        setGuessed((prevGuessed) => new Set(prevGuessed.add(letter)));
        setMistake((prevMistake) => prevMistake + (answer.includes(letter) ? 0 : 1));
    }

    const guessedWord = () => {
        return answer.split("").map(letter => (guessed.has(letter) ? letter : " _ "))
    }

    const generateButtons = () => {
        return "abcdefghijklmnopqrstuvwxyz".split("").map(letter => (
            <button
                className="letterBtn"
                key={letter}
                value={letter}
                onClick={() => handleGuess(letter)}
                disabled={guessed.has(letter)}
            >
                {letter}
            </button>
        ))
    }

    const resetButton = () => {
        setMistake(0);
        setGuessed(new Set([]));
        setAnswer(randomWord());
    };


    const gameOver = mistake >= 6;
    const isWinner = guessedWord().join('') === answer;
    let gameStat = isWinner ? 'You Win!' : (gameOver ? 'You Lost' : generateButtons());

    return (
        <div className="Hangman container">
            <h1 className="hangmanText">Hangman Game</h1>
            <button className="resetBtn" onClick={resetButton}>Reset</button>
            {/* кол-во не правельных ответов в  Hangman */}
            <div className="worddStr">Wrong Answers: {mistake} of 6</div>
            {/* изображения Hangman */}
            <div>
                <img className="hangmanImg" src={[def, img0, img1, img2, img3, img4, img5][mistake]} alt="image" />
            </div>
            {/* Guess the word*/}
            <div>
                <p className="correctAns">
                    {!gameOver ? guessedWord() : answer}
                </p>
                <p>{gameStat}</p>
            </div>
        </div>
    )
}

export default Hangman;