//Server to fecth questions from github repo server

//The bellow line is to get hard coded questions
//Commented intentionally to display server option
// import questions_json from "../../questions.json";

let getQuestions = async () => {
  // return this.shuffle(questions_json);
  const response = await fetch(
    "https://raw.githubusercontent.com/alexis-forbes/questions-quiz-app/main/questions.json"
  );
  const q = await response.json();
  return shuffle(q);
};

let shuffle = (array) => {
  var currentIndex = array.length,
    randomIndex;
  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array.slice(0, 10);
};

export default getQuestions;
