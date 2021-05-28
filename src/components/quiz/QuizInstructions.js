import React, { Fragment } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { RiHeartAddLine } from "react-icons/ri";

import answer from "../../assets/img/answer.png";

const QuizInstructions = () => (
  <Fragment>
    <Helmet>
      <title>Quiz Instructions - Quiz App</title>
    </Helmet>
    <div className="instructions container">
      <h1>How to Play the Game</h1>
      <p>Ensure you read this guide from start to finish</p>
      <ul className="browser-default" id="main-list">
        <li>
          The game has a duration of 2.5 minutes and ends as soon as your time
          elapses.
        </li>
        <li>The game consists of 10 questions of 15 seconds each.</li>
        <li>
          Every question contains 4 options.
          <img src={answer} alt="Quiz App answers example" />
        </li>
        <li>
          Select the option which best answers the question by clicking (or
          selecting) it.
          <img src={answer} alt="Quiz App answers example" />
        </li>
        <li>
          Each game has 3 lifelines namely:
          <ul id="sublist">
            <li> 1 50/50 chance</li>
            <li> +10s</li>
            <li> 5 hints</li>
          </ul>
        </li>
        <li>
          Selecting a 50/50 lifeline by clicking the icon.
          <span className="mdi mdi-set-center mdi-24px lifeline-icon"></span>
          will remove 2 wrong answers, leaving the correct answer and one wrong
          answer.
        </li>
        <img src={answer} alt="Quiz App answers example" />
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
          <img src={answer} alt="Quiz App answers example" />
        </li>
        <li>
          Feel free to quit (or retire from) the game at any time. In that case
          your score will be revealed afterwards.
        </li>
        <li>The timer starts as soon as the game loads.</li>
        <li>Let's do this if you think you've got what it takes?</li>
      </ul>
      <div>
        <span className="left">
          <Link to="/">NO, TAKE ME BACK!</Link>
        </span>
        <span className="right">
          <Link to="/play/quiz">LET'S DO THIS!</Link>
        </span>
      </div>
    </div>
  </Fragment>
);

export default QuizInstructions;