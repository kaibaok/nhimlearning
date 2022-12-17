import { useEffect, useState } from "react";
import { Button } from "../../../components/AdminComponents/commons";

function Conversation(props) {
  const { questions, answers, readText, speaking, timeDelay } = props;
  const [conversation, setConversation] = useState();
  const [rowIndex, setRowIndex] = useState(-1);
  const [disable, setDisable] = useState(false);
  const [rowSelected, setRowSelected] = useState(-1);

  function readConversation(index = 0) {
    setRowSelected(-1);
    setTimeout(
      () => {
        setDisable(true);
        if (rowIndex === conversation.length) {
          setRowIndex(-1);
          setDisable(false);
        } else {
          setRowIndex(index);
          readText({
            text: conversation[index],
            isQuestion: index % 2 === 0,
          });
        }
      },
      rowSelected === -1 ? 0 : 1000
    );
  }

  useEffect(() => {
    let text = [];
    for (var index = 0; index < questions.length; index++) {
      if (questions[index]) text.push(questions[index]);
      if (answers[index]) text.push(answers[index]);
    }
    setConversation(text);
  }, [answers, questions]);

  useEffect(() => {
    const readData = (index = 0) => {
      setRowSelected(-1);
      setTimeout(
        () => {
          setDisable(true);
          if (rowIndex === conversation.length) {
            setRowIndex(-1);
            setDisable(false);
          } else {
            setRowIndex(index);
            readText({
              text: conversation[index],
              isQuestion: index % 2 === 0,
            });
          }
        },
        rowSelected === -1 ? 0 : 1000
      );
    };

    if (rowIndex > -1) {
      if (!speaking) {
        setTimeout(() => {
          readData(rowIndex + 1);
        }, timeDelay);
      }
    }
  }, [rowIndex, speaking, timeDelay, readText, conversation, rowSelected]);

  const handleReadRow = (index) => {
    if (!speaking && !disable) {
      readText({
        text: conversation[index],
        isQuestion: index % 2 === 0,
      });
      setRowSelected(index);
    }
  };

  return (
    <div>
      {conversation && conversation.length > 0 && (
        <>
          <div className="dragula-container card h-100">
            {conversation.map((item, rowKey) => {
              const active = rowIndex === rowKey || rowSelected === rowKey;
              const rowStyle = rowKey % 2 !== 0 ? "bg-teal" : "bg-azure";
              return (
                <div
                  key={rowKey}
                  className={`p-3 text-white ${
                    active ? "bg-danger" : rowStyle
                  } border  round-lg`}
                  onClick={() => handleReadRow(rowKey)}
                >
                  {item}
                </div>
              );
            })}
          </div>
          <div className="space-10"></div>
          <div className="center">
            <Button
              className="btn  bg-indigo text-lighter"
              onClick={() => readConversation()}
              disabled={disable}
              label="Conversation"
            />
          </div>
        </>
      )}
    </div>
  );
}

export default Conversation;
