/* eslint-disable react/prop-types */
import complete from "../../../assets/quiz-complete.png";
import QUESTIONS from "../../../data/questions";

export default function Summary({ userAnswers }) {
  const skippedAnswers = userAnswers.filter((answer) => answer === null);
  const correctAnswers = userAnswers.filter(
    (answer, index) => answer === QUESTIONS[index].answers[0]
  );

  const skippedAnswersPercentage =
    (skippedAnswers.length / userAnswers.length) * 100;
  const correctAnswersPercentage =
    (correctAnswers.length / userAnswers.length) * 100;
  const wrongAnswersPercentage =
    100 - skippedAnswersPercentage - correctAnswersPercentage;

  return (
    <div id="summary">
      <img src={complete} alt="Quiz Cup" />
      <h2>Quiz Completed!</h2>
      <div id="summary-stats">
        <p>
          <span className="number">{skippedAnswersPercentage.toFixed()}%</span>
          <span className="text">skipper</span>
        </p>
        <p>
          <span className="number">{correctAnswersPercentage.toFixed()}%</span>
          <span className="text">answered correctyly</span>
        </p>
        <p>
          <span className="number">{wrongAnswersPercentage.toFixed()}%</span>
          <span className="text">answered incorrectly</span>
        </p>
      </div>
      <ol>
        {userAnswers.map((answer, index) => {
          let cssClass = "user-answer";

          if (answer === null) {
            cssClass += " skipped";
          } else if (answer === QUESTIONS[index].answers[0]) {
            cssClass += " correct";
          } else {
            cssClass += " wrong";
          }

          return (
            <li key={index + "-" + answer}>
              <h3>{index + 1}</h3>
              <p className="question">{QUESTIONS[index].text}</p>
              <p className={cssClass}>{answer ?? "Skipped"}</p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
