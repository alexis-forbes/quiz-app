import React, { Fragment } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { GiCubes } from "react-icons/gi";

const Home = () => (
  <Fragment>
    <Helmet>
      <title>Jayway Quiz - Home</title>
    </Helmet>
    <div id="home">
      <section>
        <div style={{ textAlign: "center" }}>
          <span>
            <GiCubes className="note-icon" />
          </span>
        </div>
        <h1>Jayway Quiz</h1>
        <h5>
          How much do you know about
          <br /> Jayway?
        </h5>
        <div className="play-button-container">
          <ul>
            <li>
              <Link className="play-button" to="/play/instructions">
                Play
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="coded-by">Coded by Alexis R. Forbes</p>
        </div>
      </section>
    </div>
  </Fragment>
);

export default Home;
