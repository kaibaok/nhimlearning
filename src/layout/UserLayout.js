import React, { Fragment, useEffect, useState } from "react";
import HeaderUser from "../components/UserComponents/header/HeaderUser";
import { useSpeechSynthesis } from "../components/AdminComponents/commons/Speech";

function UserLayout(props) {
  const { component: Component } = props;
  const { speak, voices, speaking } = useSpeechSynthesis();
  const [voicesChosen, setVoiceChosen] = useState();
  const langDefault = "en-US";
  const [displayNavMobile, setDisplayNavMobile] = useState(false);

  useEffect(() => {
    if (voices) {
      const arrVoices = voices.filter((voice) => voice?.lang === langDefault);
      setVoiceChosen(arrVoices);
    }
  }, [voices]);

  return (
    <div className="nk-body bg-lighter no-touch nk-nio-theme modal-open">
      <div className="nk-app-root">
        <div className="nk-wrap ">
          <HeaderUser
            setDisplayNavMobile={setDisplayNavMobile}
            displayNavMobile={displayNavMobile}
          />
          <div className="nk-content ">
            <div className="container-fluid">
              <div className="nk-content-inner">
                <div className="nk-content-body">
                  <Component
                    {...props}
                    speak={speak}
                    voices={voicesChosen}
                    speaking={speaking}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserLayout;
