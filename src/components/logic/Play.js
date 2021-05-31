import React, { Component, Fragment } from "react";
import { Helmet } from "react-helmet";
import { RiHeartAddLine } from "react-icons/ri";
import M from "materialize-css";
import classnames from "classnames";

import getQuestions from "../../services/questions-service";
import isEmpty from "../../utils/is-empty";
import isHidden from "../../utils/is-hidden";
import correctNotification from "../../assets/audio/correct-answer.mp3";
import wrongNotification from "../../assets/audio/wrong-answer.mp3";
import buttonSound from "../../assets/audio/button-sound.mp3";

//creating our components for logic
class Play extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      currentQuestion: {},
      nextQuestion: {},
      previousQuestion: {},
      answer: "",
      numberOfQuestions: 0,
      numberOfAnsweredQuestions: 0,
      currentQuestionIndex: 0,
      score: 0,
      correctAnswers: 0,
      wrongAnswers: 0,
      hints: 3,
      fiftyFifty: 1,
      usedFiftyFifty: false,
      plusTen: 1,
      usedPlusTen: false,
      activePlusTen: false,
      nextButtonDisabled: false,
      previousButtonDisabled: true,
      previousRandomNumbers: [],
      time: {},
    };
    //interval variable
    this.interval = null;
    //creating React refs to not be calling ids
    this.correctSound = React.createRef();
    this.wrongSound = React.createRef();
    this.buttonSound = React.createRef();
  }

  //Gets called when our component gets mount
  //We call our fetching function and update the state
  //Minizing errors when updating state
  //Displaying the questions
  componentDidMount() {
    getQuestions().then((res) => {
      this.setState({
        questions: res,
      });
      const { questions, currentQuestion, nextQuestion, previousQuestion } =
        this.state;
      this.displayQuestions(
        questions,
        currentQuestion,
        nextQuestion,
        previousQuestion
      );
    });
  }

  //Unmounting the interval
  //stopping count
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  //Method to display questions
  //Reads current status of questions and index
  //Updates status
  //Connected to 'previous' 'next' and 'quit' buttons
  //Enables and disables the buttons
  displayQuestions = (
    questions = this.state.questions,
    currentQuestion,
    nextQuestion,
    previousQuestion
  ) => {
    let { currentQuestionIndex } = this.state; //pulling CQI from our state
    if (!isEmpty(this.state.questions)) {
      //referring to the state
      questions = this.state.questions;
      currentQuestion = questions[currentQuestionIndex];
      nextQuestion = questions[currentQuestionIndex + 1];
      previousQuestion = questions[currentQuestionIndex - 1];
      const answer = currentQuestion.answer;
      this.setState(
        {
          //will update our state in the constructor after the function
          currentQuestion,
          nextQuestion,
          previousQuestion,
          numberOfQuestions: questions.length,
          answer,
          previousRandomNumbers: [],
        },
        () => {
          //callbackfunction to bring back options when questions changes
          this.showOptions();
          this.handleDisableButton();
        }
      );
    }
  };

  //Check if user selected the right option
  //If the innerHTML target === answer in our state, the option is correct
  handleOptionClick = (e) => {
    if (e.target.innerHTML.toLowerCase() === this.state.answer.toLowerCase()) {
      this.correctAnswer();
    } else {
      this.wrongAnswer();
    }
  };

  //Handler for the 'next' button
  //Checks if there is next question
  //Also updates the questions state
  handleNextButtonClick = () => {
    this.playButtonSound();
    if (this.state.nextQuestion !== undefined) {
      this.setState(
        (prevState) => ({
          currentQuestionIndex: prevState.currentQuestionIndex + 1,
        }),
        () => {
          this.displayQuestions(
            this.state,
            this.state.currentQuestion,
            this.state.nextQuestion,
            this.state.previousQuestion
          );
        }
      );
    }
  };

  //Checks if there is next question
  //Checks if there is a previous question
  //Avoids going to -1 question
  //Also updates the questions state
  handlePreviousButtonClick = () => {
    this.playButtonSound();
    if (this.state.previousQuestion !== undefined) {
      this.setState(
        (prevState) => ({
          currentQuestionIndex: prevState.currentQuestionIndex - 1,
        }),
        () => {
          this.displayQuestions(
            this.state,
            this.state.currentQuestion,
            this.state.nextQuestion,
            this.state.previousQuestion
          );
        }
      );
    }
  };

  //Handler for the Quit button
  //Launches alert for quiting game
  //Returns to Home
  //Also updates the questions state
  handleQuitButtonClick = () => {
    this.playButtonSound();
    if (window.confirm("Are you sure you want to quit?")) {
      this.props.history.push("/"); //takes back to home page
    }
  };

  //General handler switch for the buttons
  //'previous' 'next 'quit'
  //for maintenance and no continuous calling
  handleButtonClick = (e) => {
    switch (e.target.id) {
      case "next-button":
        this.handleNextButtonClick();
        break;

      case "previous-button":
        this.handlePreviousButtonClick();
        break;

      case "quit-button":
        this.handleQuitButtonClick();
        break;

      default:
        break;
    }
  };

  //General sound button handler
  playButtonSound = () => {
    this.buttonSound.current.play();
  };

  //Logic to handle the correct question
  //Updates it state
  //Takes an array of classes to style our toast
  //Awaits 1500ms
  //Shows toast to user for UX/UI experience
  correctAnswer = () => {
    this.correctSound.current.play();
    M.toast({
      html: "Correct Answer!",
      classes: "toast-valid",
      displayLength: 1500,
    });
    this.setState(
      (prevState) => ({
        score: prevState.score + 1,
        correctAnswers: prevState.correctAnswers + 1,
        currentQuestionIndex: prevState.currentQuestionIndex + 1,
        numberOfAnsweredQuestions: prevState.numberOfAnsweredQuestions + 1,
      }), //after function to display the updated state
      () => {
        if (this.state.nextQuestion === undefined) {
          this.endGame();
        } else {
          this.displayQuestions(
            this.state.questions,
            this.state.currentQuestion,
            this.state.nextQuestion,
            this.state.previousQuestion
          );
        }
      }
    );
  };

  //Logic to handle the wrong question
  //Updates it state
  //Takes an array of classes to style our toast
  //Awaits 1500ms
  //Shows toast to user for UX/UI experience
  //Mobile device will vibrate for UX/UI experience
  wrongAnswer = () => {
    this.wrongSound.current.play();
    navigator.vibrate(1000);
    M.toast({
      html: "Wrong Answer!",
      classes: "toast-invalid",
      displayLength: 1500,
    });
    this.setState(
      (prevState) => ({
        wrongAnswers: prevState.wrongAnswers + 1,
        currentQuestionIndex: prevState.currentQuestionIndex + 1,
        numberOfAnsweredQuestions: prevState.numberOfAnsweredQuestions,
      }),
      () => {
        if (this.state.nextQuestion === undefined) {
          this.endGame();
        } else {
          this.displayQuestions(
            this.state.questions,
            this.state.currentQuestion,
            this.state.nextQuestion,
            this.state.previousQuestion
          );
        }
      }
    );
  };

  //Shows options after hiding them
  //Selects the options from the document and makes them visible again
  //After applying 50/50 or hints
  showOptions = () => {
    const options = Array.from(document.querySelectorAll(".option"));

    options.forEach((option) => {
      option.style.visibility = "visible";
    });

    this.startTimer();

    this.setState({
      usedFiftyFifty: false,
    });
  };

  //Hints handler
  //3 hints to hide wrong options
  //Retrieves visible options like an array
  //Reads from the correct answer index
  //Updates its state
  //Displays the remaining options after hiding
  handleHints = () => {
    if (this.state.hints > 0) {
      const allOptions = Array.from(document.querySelectorAll(".option"));
      let visibleOptions = allOptions.filter((f) => !isHidden(f));
      let indexOfAnswer;
      visibleOptions.forEach((option, index) => {
        if (
          option.innerHTML.toLowerCase() === this.state.answer.toLowerCase()
        ) {
          indexOfAnswer = index;
        }
      });

      //Making sure what is hidden is only wrong answers
      const maxRandom = visibleOptions.length - 1;

      //Generates random number for answers 0-3
      //Check random number is not the same as index of our answer
      //Making sure its the right answer
      while (true) {
        const randomNumber = Math.round(Math.random() * maxRandom);

        if (
          randomNumber !== indexOfAnswer &&
          !this.state.previousRandomNumbers.includes(randomNumber)
        ) {
          //looks through each option and if it matches index fo random number hidden
          visibleOptions.forEach((option, index) => {
            if (index === randomNumber) {
              option.style.visibility = "hidden";
              this.setState((prevState) => ({
                hints: prevState.hints - 1,
                //appends random number generated up to our previousRandomNumber state in our array
                previousRandomNumbers:
                  prevState.previousRandomNumbers.concat(randomNumber),
              }));
            }
          });
          break;
        }
        //Breaks for no further callings
        if (this.state.previousRandomNumbers.length >= maxRandom) break;
      }
    }
  };

  //50/50 handler
  //Reads index, feeds from state, updates state
  //Only can be used if never used
  handleFiftyFifty = () => {
    if (this.state.fiftyFifty > 0 && this.state.usedFiftyFifty === false) {
      const options = document.querySelectorAll(".option");
      const randomNumbers = [];
      let indexOfAnswer;

      options.forEach((option, index) => {
        if (
          option.innerHTML.toLowerCase() === this.state.answer.toLowerCase()
        ) {
          indexOfAnswer = index;
        }
      });
      //Generate randomNumber to only hide 3 out of 4 options
      //That do not match the correct answer
      let count = 0;
      do {
        const randomNumber = Math.round(Math.random() * 3);
        if (randomNumber !== indexOfAnswer) {
          if (
            randomNumbers.length < 2 &&
            !randomNumbers.includes(randomNumber) &&
            !randomNumbers.includes(indexOfAnswer)
          ) {
            randomNumbers.push(randomNumber);
            count++;
          } else {
            while (true) {
              const newRandomNumber = Math.round(Math.random() * 3);
              if (
                !randomNumbers.includes(newRandomNumber) &&
                !randomNumbers.includes(indexOfAnswer)
              ) {
                randomNumbers.push(newRandomNumber);
                count++;
                break;
              }
            }
          }
        }
      } while (count < 2);
      options.forEach((option, index) => {
        if (randomNumbers.includes(index)) {
          option.style.visibility = "hidden";
        }
      });
      //Updates it state after being used
      this.setState((prevState) => ({
        fiftyFifty: prevState.fiftyFifty - 1,
        usedFifty: true,
      }));
    }
  };

  //+10s handler
  //Adds ten seconds to total time
  //Can oly be used once
  //Checks its state
  handlePlusTen = () => {
    if (
      !this.state.activePlusTen &&
      this.state.plusTen > 0 &&
      this.state.usedPlusTen === false
    ) {
      this.setState((prevState) => ({
        activePlusTen: true,
        plusTen: prevState.plusTen - 1,
        usedPlusTen: true,
      }));
    }
  };

  //StartTimer 15 secons
  //Updates its state after being used
  //Also checks distance
  startTimer = () => {
    clearInterval(this.interval);
    let countDownTime = Date.now() + 16000;
    this.interval = setInterval(() => {
      const now = new Date();

      if (this.state.activePlusTen) {
        countDownTime += 10000;
        this.setState(() => ({
          activePlusTen: false,
        }));
      }

      const distance = countDownTime - now;

      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (distance < 0) {
        this.setState(
          {
            time: {
              minutes: 0,
              seconds: 0,
            },
          },
          () => {
            clearInterval(this.interval);
            this.wrongAnswer();
          }
        );
      } else {
        this.setState({
          time: {
            minutes,
            seconds,
            distance,
          },
        });
      }
    }, 0);
  };

  //Button disabler to not go back to -1 question
  //Continous update and check
  handleDisableButton = () => {
    if (
      this.state.previousQuestion === undefined ||
      this.state.currentQuestionIndex === 0
    ) {
      this.setState({
        previousButtonDisabled: true,
      });
    } else {
      this.setState({
        previousButtonDisabled: false,
      });
    }

    if (
      this.state.nextQuestion === undefined ||
      this.state.currentQuestionIndex + 1 === this.state.numberOfQuestions
    ) {
      this.setState({
        nextButtonDisabled: true,
      });
    } else {
      this.setState({
        nextButtonDisabled: false,
      });
    }
  };

  //Ends the game with an alert
  //Furthers to quizSummary to review playerStats
  endGame = () => {
    alert("Quiz has ended!");
    const { state } = this;
    const playerStats = {
      score: state.score,
      numberOfQuestions: state.numberOfQuestions,
      numberOfAnsweredQuestions: state.correctAnswers + state.wrongAnswers,
      correctAnswers: state.correctAnswers,
      wrongAnswers: state.wrongAnswers,
      fiftyFiftyUsed: 1 - state.fiftyFifty,
      hintsUsed: 3 - state.hints,
    };
    this.props.history.push("/play/quizSummary", playerStats);
  };

  //rendered components to display
  render() {
    const {
      currentQuestion,
      currentQuestionIndex,
      fiftyFifty,
      hints,
      numberOfQuestions,
      time,
      plusTen,
    } = this.state;
    return (
      <Fragment>
        <Helmet>
          <title>Jayway Quiz Page</title>
        </Helmet>
        <Fragment>
          <audio ref={this.correctSound} src={correctNotification}></audio>
          <audio ref={this.wrongSound} src={wrongNotification}></audio>
          <audio ref={this.buttonSound} src={buttonSound}></audio>
        </Fragment>
        <div id="quiz-container">
          <div className="questions">
            <h2>Jayway Quiz</h2>
            <div className="lifeline-container">
              <p>
                <span
                  onClick={this.handleFiftyFifty}
                  className="mdi mdi-set-center mdi-24px lifeline-icon"
                >
                  <span className="lifeline">{fiftyFifty}</span>
                </span>
              </p>
              <p>
                <span>
                  <RiHeartAddLine
                    data-testid="plusTenButton"
                    onClick={this.handlePlusTen}
                    className="ten-seconds lifeline-icon"
                    size="24px"
                  />
                  <span className="lifeline">{plusTen}</span>
                </span>
              </p>
              <p>
                <span
                  onClick={this.handleHints}
                  className="mdi mdi-lightbulb-on-outline mdi-24px lifeline lifeline-icon"
                ></span>
                <span className="lifeline">{hints}</span>
              </p>
            </div>
            <div>
              <p>
                <span className="left">
                  {currentQuestionIndex + 1} of {numberOfQuestions}
                </span>
                <span className="right">
                  {time.minutes}:{time.seconds}
                  <span className="mdi mdi-clock-outline mdi-24px"></span>
                </span>
              </p>
            </div>
            <h5>{currentQuestion.question}</h5>
            <div className="options-container">
              <p
                onClick={this.handleOptionClick}
                className="option"
                data-testid="firstOptionButton"
              >
                {currentQuestion.optionA}
              </p>
              <p onClick={this.handleOptionClick} className="option">
                {currentQuestion.optionB}
              </p>
            </div>
            <div className="options-container">
              <p onClick={this.handleOptionClick} className="option">
                {currentQuestion.optionC}
              </p>
              <p onClick={this.handleOptionClick} className="option">
                {currentQuestion.optionD}
              </p>
            </div>

            <div className="button-container">
              <button
                //disable class will be called if previousButtonDisabled is true
                className={classnames("", {
                  disable: this.state.previousButtonDisabled,
                })}
                id="previous-button"
                onClick={this.handleButtonClick}
              >
                Previous
              </button>
              <button
                className={classnames("", {
                  disable: this.state.nextButtonDisabled,
                })}
                id="next-button"
                onClick={this.handleButtonClick}
              >
                Next
              </button>
              <button id="quit-button" onClick={this.handleButtonClick}>
                Quit
              </button>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Play;
