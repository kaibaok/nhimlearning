import React from "react";
import PropTypes from "prop-types";
import AnswerImageTextItem from "./AnswerImageTextItem";
import SimpleBar from "simplebar-react";
function AnswerImageText(props) {
  const { answers, setAnswers, maxHeight } = props;

  const editAnswer = (value, index, keyName) => {
    let answer = answers[index];
    if (answer) {
      switch (keyName) {
        case "name":
          answer.name = value;
          break;
        case "description":
          answer.description = value;
          break;
        case "questions":
          answer.questions = value;
          break;
        case "answers":
          answer.answers = value;
          break;
        case "image":
          answer.image = value;
          break;
        case "is_external_image":
          answer.is_external_image = value;
          break;
        default:
          break;
      }
      answers[index] = answer;
      setAnswers([...answers]);
    }
  };

  const removeAnswer = (index) => {
    let newAnswers = answers;
    if (index !== -1) {
      newAnswers.splice(index, 1);
    }
    setAnswers([...newAnswers]);
  };

  return (
    <>
      <div className="row">
        {/* <div className="col-xs-12 mb-3">
          <Button
            className="btn btn-primary"
            style={{ color: "#fff", marginRight: 10 }}
            onClick={() => {
              addMoreAnswers();
            }}
            label="Add Questions &amp; Answers"
          />
        </div> */}
        <SimpleBar style={{ maxHeight: maxHeight }}>
          {answers &&
            answers.map((answer, index) => (
              <AnswerImageTextItem
                key={index}
                answer={answer}
                index={index}
                editAnswer={editAnswer}
                removeAnswer={removeAnswer}
              />
            ))}
        </SimpleBar>
      </div>
    </>
  );
}

AnswerImageText.propTypes = {
  answers: PropTypes.array,
  addMoreAnswers: PropTypes.func,
  setAnswers: PropTypes.func,
  maxHeight: PropTypes.number,
};

export default AnswerImageText;
