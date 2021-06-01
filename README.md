# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### Running Requirements

Make sure to set up your environment before running the app. In order to create a successful React development make sure to have the following:

- React
- NodeJs
- NPM

Also, make sure to install all dependencies in the project to run correctly.

Enter: `npm i`

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### Flow Chart Diagram

In 'src' there is a Flow Chart Diagram available to further understand the logic behind the quiz game.

### Mobile version

Feel free to access to this Netlify link where the quiz is deployed with some cool stuff on all Android and Iphone X mobile version like vibration when clicking the wrong answer.

https://jayway-quiz.netlify.app/

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

Tests have been created in './src/App.test.js' for organization and functional purposes. Due to the logic of the app being in 'components/logic/Play.js' for scalable and test purposes, you can review the unit tests at one sight.

TESTS:

- Verifying if questions are retrieved on load from the server layer 'services/questions-service'.
- Verifying if title is being retrieved correctly.
- Verifying plusTen lifeline.
- Making plusTen lifeline fail.
- Verifying plusTen onClick with 25seconds.
- Verifying if firstQuestion is not answered, the secondQuestions displays on load.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
