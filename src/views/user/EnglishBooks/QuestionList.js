import React, { Fragment } from "react";
import QuestionListItem from "./QuestionListItem";
function QuestionList(props) {
  const {
    questions,
    speak,
    voices,
    voiceAnswer,
    voiceQuestion,
    timeDelay,
    speaking,
  } = props;
  return (
    <Fragment>
      {questions &&
        questions.map((item, i) => (
          <QuestionListItem
            key={i}
            question={item}
            speak={speak}
            voices={voices}
            voiceQuestion={voiceQuestion}
            voiceAnswer={voiceAnswer}
            timeDelay={timeDelay}
            speaking={speaking}
          />
        ))}
    </Fragment>
  );
}

export default QuestionList;
