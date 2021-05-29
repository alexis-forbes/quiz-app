import React, { Component, Fragment } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

class QuizSummary extends Component {
  constructor(props) {
    super(props);
    //casting the state object
    this.state = {
      score: 0,
      numberOfQuestions: 0,
      numberOfAnsweredQuestions: 0,
      correctAnswers: 0,
      wrongAnswers: 0,
      hintsUsed: 0,
      fiftyFiftyUsed: 0,
    };
  }

  componentDidMount() {
    const { state } = this.props.location;
    this.setState({
      score: (state.score / state.numberOfQuestions) * 100,
      numberOfQuestions: state.numberOfQuestions,
      numberOfAnsweredQuestions: state.numberOfAnsweredQuestions,
      correctAnswers: state.correctAnswers,
      wrongAnswers: state.wrongAnswers,
      fiftyFiftyUsed: state.fiftyFiftyUsed,
      hintsUsed: state.hintsUsed,
    });
  }
  render() {
    const { state, score } = this.props.location;
    let stats, remark;

    if (score <= 30) {
      remark = "You need more practice!";
    } else if (score > 30 && score <= 50) {
      remark = "Better luck next time";
    } else if (score <= 70 && score > 50) {
      remark = "You can do better!";
    } else if (score >= 71 && score <= 84) {
      remark = "You did great!";
    } else {
      remark = "You are an absolute genius!";
    }

    if (state !== undefined) {
      stats = (
        <Fragment>
          <div>
            <span className="mdi mdi-check-circle-outline success-icon"></span>
          </div>
          <h1>Quiz ended</h1>
          <div className="container">
            <h4>{remark}</h4>
            <h2>Your Score: {this.state.score.toFixed(0)}&#37;</h2>
            <span className="stat left">Total number of questions: </span>
            <span className="right">{this.state.numberOfQuestions}</span>
            <br />

            <span className="stat left">
              Total number of Answered Questions:
            </span>
            <span className="right">
              {this.state.numberOfAnsweredQuestions}
            </span>
            <br />

            <span className="stat left">Total number of Correct Answers: </span>
            <span className="right">{this.state.correctAnswers}</span>
            <br />

            <span className="stat left">Total number of Wrong Answers: </span>
            <span className="right">{this.state.wrongAnswers}</span>
            <br />

            <span className="stat left">Total number of Hints Used: </span>
            <span className="right">{this.state.hintsUsed}</span>
            <br />

            <span className="stat left">Total number of 50-50 Used: </span>
            <span className="right">{this.state.fiftyFiftyUsed}</span>
          </div>
          <section>
            <ul>
              <li>
                <Link to="/">HOME</Link>
                <Link to="/play/quiz">PLAY AGAIN!</Link>
              </li>
            </ul>
          </section>
        </Fragment>
      );
    } else {
      stats = (
        <Fragment>
          <h1 className="no-stats">
            No statistics available, please PLAY THE GAME!{" "}
          </h1>
          <ul>
            <li>
              <Link to="/">HOME</Link>
              <Link to="/play/quiz">PLAY AGAIN!</Link>
            </li>
          </ul>
        </Fragment>
      );
    }
    return (
      <Fragment>
        <Helmet>
          <title>Quiz App - Summary</title>
        </Helmet>
        {stats}
      </Fragment>
    );
  }
}

export default QuizSummary;
