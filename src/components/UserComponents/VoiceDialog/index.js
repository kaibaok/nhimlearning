import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import AppStore from "src/fetch/AppFetch";
import { Button, CustomModal } from "src/components/AdminComponents/commons";

export function VoiceDialog(props) {
  const { voices, speak, title, visible, onClose, onRefresh } = props;
  const [voiceQuestion, setVoiceQuestion] = useState(0);
  const [voiceAnswer, setVoiceAnswer] = useState(0);
  const [content, setContent] = useState(
    "Hello, excited,  bread, communication"
  );

  const handleVoice = (voice) => {
    if (voices) {
      if (voice) {
        speak({ text: content, voice: voices[voice] });
      } else {
        speak({ text: content });
      }
    }
  };

  const updateDefautVoices = ({ voiceQuestion, voiceAnswer }) => {
    AppStore.storeVoices({
      voiceQuestion: voiceQuestion,
      voiceAnswer: voiceAnswer,
    });
  };

  useEffect(() => {
    const defaultVoices = AppStore.fetchVoices();
    setVoiceQuestion(defaultVoices?.voiceQuestion);
    setVoiceAnswer(defaultVoices?.voiceAnswer);
  }, []);

  const onSave = (voiceQuestion, voiceAnswer) => {
    const defaultVoices = {
      voiceQuestion: voiceQuestion,
      voiceAnswer: voiceAnswer,
    };
    updateDefautVoices(defaultVoices);
    if (onRefresh) onRefresh();
    if (onClose) onClose();
  };

  const loadBodyDialog = () => {
    return (
      <div>
        <div className="row mb-3">
          <div className="col-xs-12">
            <div className="form-group">
              <label className="form-label">Voice (Question)</label>
              <div className="form-control-select">
                <select
                  className="form-control"
                  value={voiceQuestion}
                  onChange={(event) => {
                    setVoiceQuestion(event?.target?.value);
                  }}
                >
                  <option>Selection...</option>
                  {voices &&
                    voices.map((voice, index) => (
                      <option key={index} value={index}>
                        {voice.name} - {voice?.lang}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-xs-12">
            <div className="form-group">
              <label className="form-label">Voice (Answer)</label>
              <div className="form-control-select">
                <select
                  className="form-control"
                  value={voiceAnswer}
                  onChange={(event) => {
                    setVoiceAnswer(event?.target?.value);
                  }}
                >
                  <option>Selection...</option>
                  {voices &&
                    voices.map((voice, index) => (
                      <option key={index} value={index}>
                        {voice.name} - {voice?.lang}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-xs-12">
            <label className="form-label">Test Voice</label>
            <input
              type="text"
              className="form-control"
              placeholder="Content demo Voice"
              value={content}
              onChange={(event) => setContent(event?.target?.value)}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <div className="form-group">
              <Button
                className="me-2 btn btn-success"
                onClick={() => {
                  handleVoice(voiceQuestion);
                }}
                label="Voice (Question)"
              />

              <Button
                className="btn btn-warning"
                onClick={() => {
                  handleVoice(voiceAnswer);
                }}
                label="Voice (Answer)"
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  const loadFooterDialog = () => {
    return (
      <>
        <Button
          label="Save changes"
          onClick={() => {
            onSave(voiceQuestion, voiceAnswer);
          }}
        />

        <Button
          className="btn btn-secondary"
          onClick={() => {
            if (onClose) {
              onClose(false);
            }
          }}
          label="Close"
        />
      </>
    );
  };

  return (
    <CustomModal
      visible={visible}
      title={title}
      onClose={onClose}
      body={loadBodyDialog()}
      footerModal={loadFooterDialog()}
    />
  );
}

VoiceDialog.propTypes = {
  onSave: PropTypes.func,
  onClose: PropTypes.func,
  visible: PropTypes.bool,
};
