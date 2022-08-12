import PropTypes from "prop-types";
import SimpleBar from "simplebar-react";

function GroupLesson(props) {
  const {
    maxHeight,
    listLessons,
    listLessonsChosen,
    addLesson,
    removeLesson,
    lessonName,
    setLessonName,
  } = props;

  return (
    <div className="row">
      <div className="col-lg-6 col-xs-12">
        <label className="form-label">List Lessons</label>
        <input
          placeholder="Search lessons"
          type="text"
          className="form-control mb-2"
          value={lessonName}
          onChange={(event) => setLessonName(event.target.value)}
        />
      </div>
      <div className="col-lg-6 col-xs-12 d-lg-block d-sm-none">
        <label className="form-label">Chosen Lessons</label>
      </div>
      <div className="col-lg-6 col-xs-12 mb-2">
        <SimpleBar style={{ padding: 20, maxHeight: maxHeight }}>
          <div className=" card card-bordered p-4 h-100">
            {listLessons &&
              listLessons.map((item, index) => (
                <div
                  role="button"
                  key={index}
                  className="p-3 mb-2 bg-white border border-light round-lg round-lg form-floating"
                  onClick={() => {
                    if (addLesson) addLesson(item);
                  }}
                >
                  {item.name.length > 60 && item.name.substring(0, 60) + "..."}

                  {item.name.length <= 60 && item.name}
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
                      if (addLesson) addLesson(item);
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
            {listLessonsChosen &&
              listLessonsChosen.map((item, index) => (
                <div
                  role="button"
                  key={index}
                  className="p-3 bg-white border border-light round-lg round-lg mb-2 form-floating"
                  onClick={() => {
                    if (removeLesson) removeLesson(index);
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
                      if (removeLesson) removeLesson(index);
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

GroupLesson.propTypes = {
  maxHeight: PropTypes.number,
  listLessons: PropTypes.array,
  listLessonsChosen: PropTypes.array,
  addLesson: PropTypes.func,
  removeLesson: PropTypes.func,
  lessonName: PropTypes.string,
  setLessonName: PropTypes.func,
};

export default GroupLesson;
