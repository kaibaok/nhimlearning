import PropTypes from "prop-types";
import SimpleBar from "simplebar-react";

function GroupQuestion(props) {
  const {
    maxHeight,
    listQuestions,
    listQuestionsChosen,
    addQuestion,
    removeQuestion,
    questionName,
    setQuestionName,
  } = props;

  return (
    <div className="row">
      <div className="col-lg-6 col-xs-12">
        <label className="form-label">List Questions</label>
        <input
          placeholder="Search questions"
          type="text"
          className="form-control mb-2"
          value={questionName}
          onChange={(event) => {
            if (setQuestionName) setQuestionName(event?.target?.value);
          }}
        />
      </div>
      <div className="col-lg-6 col-xs-12 d-lg-block d-sm-none">
        <label className="form-label">Chosen Questions</label>
      </div>
      <div className="col-lg-6 col-xs-12 mb-2">
        <SimpleBar style={{ padding: 20, maxHeight: maxHeight }}>
          <div className="card card-bordered p-4 h-100">
            {listQuestions &&
              listQuestions.map((item, index) => (
                <div
                  role="button"
                  key={index}
                  className="p-3 bg-white border border-light round-lg round-lg mb-2 form-floating"
                  onClick={() => {
                    if (addQuestion) addQuestion(item);
                  }}
                >
                  <span className="p-1">
                    {item.name.length > 60 &&
                      item.name.substring(0, 60) + "..."}
                    {item.name.length <= 60 && item.name}
                  </span>
                  <em
                    role="button"
                    className="icon ni ni-arrow-right-circle"
                    style={{
                      position: "absolute",
                      right: 11,
                      top: "35%",
                      fontSize: 20,
                    }}
                    onClick={() => {
                      if (addQuestion) addQuestion(item);
                    }}
                  />
                </div>
              ))}
          </div>
        </SimpleBar>
      </div>
      <div className="col-lg-6 col-xs-12 d-lg-none d-sm-block">
        <label className="form-label">Chosen Lessons</label>
      </div>
      <div className="col-lg-6 col-xs-12">
        <SimpleBar style={{ padding: 20, maxHeight: maxHeight }}>
          <div className="card card-bordered p-4 h-100">
            {listQuestionsChosen &&
              listQuestionsChosen.map((item, index) => (
                <div
                  role="button"
                  key={index}
                  className="p-3 bg-white border border-light round-lg round-lg mb-2 form-floating"
                  onClick={() => {
                    if (removeQuestion) removeQuestion(index);
                  }}
                >
                  <span>
                    {item?.name?.length > 60 &&
                      item?.name.substring(0, 60) + "..."}

                    {item?.name?.length <= 60 && item.name}
                  </span>
                  <em
                    role="button"
                    className="icon ni ni-cross-circle"
                    style={{
                      position: "absolute",
                      right: 11,
                      top: "35%",
                      fontSize: 20,
                    }}
                    onClick={() => {
                      if (removeQuestion) removeQuestion(index);
                    }}
                  />
                </div>
              ))}
          </div>
        </SimpleBar>
      </div>
    </div>
  );
}

GroupQuestion.propTypes = {
  maxHeight: PropTypes.number,
  listQuestions: PropTypes.array,
  listQuestionsChosen: PropTypes.array,
  addQuestion: PropTypes.func,
  removeQuestion: PropTypes.func,
  questionName: PropTypes.string,
  setQuestionName: PropTypes.func,
};

export default GroupQuestion;
