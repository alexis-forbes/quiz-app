import React, { Fragment } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { RiHeartAddLine } from "react-icons/ri";

import answer1 from "../../assets/img/answer1.png";

const QuizInstructions = () => (
  <Fragment>
    <Helmet>
      <title>Quiz Instructions - Jayway</title>
    </Helmet>
    <div className="instructions container">
      <h1>How to Play the Game</h1>
      <p>Read this guide from start to finish</p>
      <ul className="browser-default" id="main-list">
        <li>
          The game has a duration of 2.5 minutes and ends as soon as your time
          elapses.
        </li>
        <li>The game consists of 10 questions of 15 seconds each.</li>
        <li>
          Every question contains 4 options.
          <img src={answer1} alt="Quiz App answers example" />
        </li>
        <li>
          Select the option which best answers the question by clicking (or
          selecting) it.
          <img src={answer1} alt="Quiz App answers example" />
        </li>
        <li>
          Each game has 3 lifelines namely:
          <ul id="sublist">
            <li> 1 50/50 chance</li>
            <li> +10s</li>
            <li> 3 hints</li>
          </ul>
        </li>
        <li>
          Selecting a 50/50 lifeline by clicking the icon.
          <span className="mdi mdi-set-center mdi-24px lifeline-icon"></span>
          will remove 2 wrong answers, leaving the correct answer and one wrong
          answer.
        </li>
        <img src={answer1} alt="Quiz App answers example" />
        <li>
          Using the clock icon
          <span>
            <RiHeartAddLine className="ten-seconds lifeline-icon" size="24px" />
          </span>
          to increase 10 seconds.
        </li>
        <li>
          Using a hint by clicking the icon
          <span className="mdi mdi-lightbulb-on mdi-24px lifeline-icon"></span>
          will remove one wrong answer leaving two wrong answers and one correct
          answer. You can use as many hints as possible on a single question.
          <img src={answer1} alt="Quiz App answers example" />
        </li>
        <li>
          Feel free to quit the game at any time. Your score will be revealed
          afterwards.
        </li>
        <li>The timer starts as soon as the game loads.</li>
      </ul>
      <div id="instructions-buttons">
        <span className="left take-me-back">
          <Link to="/">NO, TAKE ME BACK!</Link>
        </span>
        <span className="right lets-do-this">
          <Link to="/play/quiz">LET'S DO THIS!</Link>
        </span>
      </div>
    </div>
  </Fragment>
);

export default QuizInstructions;
