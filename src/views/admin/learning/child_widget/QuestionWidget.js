import React from "react";
import PropTypes from "prop-types";
// CONSTANTS
import { typeImageText } from "../../../../constants/AppConstants";
// COMPONENTS
import AnswerImageText from "./AnswerImageText";

function QuestionWidget(props) {
  const switchWidget = (questionType) => {
    const { answers, addMoreAnswers, setAnswers, maxHeight } = props;
    switch (questionType) {
      case typeImageText:
        return (
          <AnswerImageText
            answers={answers}
            addMoreAnswers={addMoreAnswers}
            setAnswers={setAnswers}
            maxHeight={maxHeight}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className="row">
        <div className="col-lg-12">{switchWidget(props?.questionType)}</div>
      </div>
    </>
  );
}

QuestionWidget.propTypes = {
  questionType: PropTypes.number,
  answers: PropTypes.array,
  addMoreAnswers: PropTypes.func,
  setAnswers: PropTypes.func,
};

export default QuestionWidget;
